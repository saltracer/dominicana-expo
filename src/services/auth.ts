import * as SecureStore from 'expo-secure-store';
import { User, UserRole, Subscription, SubscriptionType, SubscriptionStatus, UserPreferences } from '../types';
import databaseService from './database';

class AuthService {
  private readonly USER_KEY = 'dominicana_user';
  private readonly TOKEN_KEY = 'dominicana_token';
  private currentUser: User | null = null;

  // Initialize anonymous user
  async initializeAnonymousUser(): Promise<User> {
    const anonymousUser: User = {
      id: 'anonymous',
      email: '',
      name: 'Anonymous User',
      role: 'ANONYMOUS',
      subscription: {
        type: 'FREE',
        status: 'ACTIVE',
        startDate: new Date().toISOString(),
        features: ['prayer', 'liturgy_hours', 'rosary', 'calendar'],
      },
      preferences: {
        language: 'en',
        theme: 'LIGHT',
        notifications: {
          prayerReminders: false,
          feastDayAlerts: false,
          newContent: false,
          audioContent: false,
        },
        prayerReminders: [],
        favoriteSaints: [],
        favoriteBooks: [],
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    this.currentUser = anonymousUser;
    await this.saveUserToStorage(anonymousUser);
    return anonymousUser;
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const userData = await SecureStore.getItemAsync(this.USER_KEY);
      if (userData) {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }

    return null;
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<User> {
    try {
      // In a real app, this would validate against a backend
      // For now, we'll simulate authentication
      const user = await databaseService.getFirst<User>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (!user) {
        throw new Error('User not found');
      }

      // Update last login
      await databaseService.execute(
        'UPDATE users SET last_login = ? WHERE id = ?',
        [new Date().toISOString(), user.id]
      );

      user.lastLogin = new Date().toISOString();
      this.currentUser = user;
      await this.saveUserToStorage(user);

      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign up new user
  async signUp(email: string, password: string, name: string): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await databaseService.getFirst<User>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role: 'USER',
        subscription: {
          type: 'FREE',
          status: 'ACTIVE',
          startDate: new Date().toISOString(),
          features: ['prayer', 'liturgy_hours', 'rosary', 'calendar', 'books'],
        },
        preferences: {
          language: 'en',
          theme: 'LIGHT',
          notifications: {
            prayerReminders: true,
            feastDayAlerts: true,
            newContent: true,
            audioContent: false,
          },
          prayerReminders: [],
          favoriteSaints: [],
          favoriteBooks: [],
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Save to database
      await databaseService.execute(
        `INSERT INTO users (id, email, name, role, subscription, preferences, created_at, last_login)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newUser.id,
          newUser.email,
          newUser.name,
          newUser.role,
          JSON.stringify(newUser.subscription),
          JSON.stringify(newUser.preferences),
          newUser.createdAt,
          newUser.lastLogin,
        ]
      );

      this.currentUser = newUser;
      await this.saveUserToStorage(newUser);

      return newUser;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      this.currentUser = null;
      await SecureStore.deleteItemAsync(this.USER_KEY);
      await SecureStore.deleteItemAsync(this.TOKEN_KEY);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null && user.role !== 'ANONYMOUS';
  }

  // Check if user has subscription
  async hasSubscription(type: SubscriptionType = 'BASIC'): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    const subscriptionTypes: SubscriptionType[] = ['FREE', 'BASIC', 'PREMIUM'];
    const userTypeIndex = subscriptionTypes.indexOf(user.subscription.type);
    const requiredTypeIndex = subscriptionTypes.indexOf(type);

    return user.subscription.status === 'ACTIVE' && userTypeIndex >= requiredTypeIndex;
  }

  // Check if feature requires authentication
  requiresAuthentication(feature: string): boolean {
    const featuresRequiringAuth = ['books', 'audio', 'premium_content'];
    return featuresRequiringAuth.includes(feature);
  }

  // Check if feature requires subscription
  requiresSubscription(feature: string): boolean {
    const featuresRequiringSubscription = ['audio', 'premium_content', 'advanced_features'];
    return featuresRequiringSubscription.includes(feature);
  }

  // Check if user can access feature
  async canAccessFeature(feature: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    // Anonymous users can only access basic prayer features
    if (user.role === 'ANONYMOUS') {
      const anonymousFeatures = ['prayer', 'liturgy_hours', 'rosary', 'calendar'];
      return anonymousFeatures.includes(feature);
    }

    // Check subscription requirements
    if (this.requiresSubscription(feature)) {
      return await this.hasSubscription('PREMIUM');
    }

    // Check authentication requirements
    if (this.requiresAuthentication(feature)) {
      return await this.isAuthenticated();
    }

    return true;
  }

  // Update user preferences
  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    const updatedPreferences = { ...user.preferences, ...preferences };
    user.preferences = updatedPreferences;

    if (user.role !== 'ANONYMOUS') {
      await databaseService.execute(
        'UPDATE users SET preferences = ? WHERE id = ?',
        [JSON.stringify(updatedPreferences), user.id]
      );
    }

    await this.saveUserToStorage(user);
  }

  // Add favorite saint
  async addFavoriteSaint(saintId: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    if (!user.preferences.favoriteSaints.includes(saintId)) {
      user.preferences.favoriteSaints.push(saintId);

      if (user.role !== 'ANONYMOUS') {
        await databaseService.execute(
          'UPDATE users SET preferences = ? WHERE id = ?',
          [JSON.stringify(user.preferences), user.id]
        );
      }

      await this.saveUserToStorage(user);
    }
  }

  // Remove favorite saint
  async removeFavoriteSaint(saintId: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    user.preferences.favoriteSaints = user.preferences.favoriteSaints.filter(
      id => id !== saintId
    );

    if (user.role !== 'ANONYMOUS') {
      await databaseService.execute(
        'UPDATE users SET preferences = ? WHERE id = ?',
        [JSON.stringify(user.preferences), user.id]
      );
    }

    await this.saveUserToStorage(user);
  }

  // Add favorite book
  async addFavoriteBook(bookId: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    if (!user.preferences.favoriteBooks.includes(bookId)) {
      user.preferences.favoriteBooks.push(bookId);

      if (user.role !== 'ANONYMOUS') {
        await databaseService.execute(
          'UPDATE users SET preferences = ? WHERE id = ?',
          [JSON.stringify(user.preferences), user.id]
        );
      }

      await this.saveUserToStorage(user);
    }
  }

  // Remove favorite book
  async removeFavoriteBook(bookId: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    user.preferences.favoriteBooks = user.preferences.favoriteBooks.filter(
      id => id !== bookId
    );

    if (user.role !== 'ANONYMOUS') {
      await databaseService.execute(
        'UPDATE users SET preferences = ? WHERE id = ?',
        [JSON.stringify(user.preferences), user.id]
      );
    }

    await this.saveUserToStorage(user);
  }

  // Add prayer reminder
  async addPrayerReminder(reminder: {
    type: string;
    time: string;
    days: string[];
  }): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    const newReminder = {
      id: `reminder_${Date.now()}`,
      ...reminder,
      enabled: true,
    };

    user.preferences.prayerReminders.push(newReminder);

    if (user.role !== 'ANONYMOUS') {
      await databaseService.execute(
        'UPDATE users SET preferences = ? WHERE id = ?',
        [JSON.stringify(user.preferences), user.id]
      );
    }

    await this.saveUserToStorage(user);
  }

  // Remove prayer reminder
  async removePrayerReminder(reminderId: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user found');

    user.preferences.prayerReminders = user.preferences.prayerReminders.filter(
      reminder => reminder.id !== reminderId
    );

    if (user.role !== 'ANONYMOUS') {
      await databaseService.execute(
        'UPDATE users SET preferences = ? WHERE id = ?',
        [JSON.stringify(user.preferences), user.id]
      );
    }

    await this.saveUserToStorage(user);
  }

  // Save user to secure storage
  private async saveUserToStorage(user: User): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
      throw error;
    }
  }

  // Get user role
  async getUserRole(): Promise<UserRole> {
    const user = await this.getCurrentUser();
    return user?.role || 'ANONYMOUS';
  }

  // Check if user is admin
  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.role === 'ADMIN';
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
