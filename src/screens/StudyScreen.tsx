import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { TEXT_STYLES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import authService from '../services/auth';
import { useTheme } from '../context/ThemeContext';

const StudyScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setLoading(true);
      const user = await authService.getCurrentUser();
      setIsAuthenticated(Boolean(user && user.role !== 'ANONYMOUS'));
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const bookCategories = [
    {
      id: 'theology',
      title: 'Theology',
      icon: 'library',
      color: colors.PRIMARY,
      description: 'Systematic and dogmatic theology',
    },
    {
      id: 'philosophy',
      title: 'Philosophy',
      icon: 'school',
      color: colors.SECONDARY,
      description: 'Classical and medieval philosophy',
    },
    {
      id: 'spirituality',
      title: 'Spirituality',
      icon: 'heart',
      color: colors.ACCENT,
      description: 'Spiritual writings and devotionals',
    },
    {
      id: 'dominican',
      title: 'Dominican',
      icon: 'star',
      color: COLORS.ADVENT,
      description: 'Dominican theology and spirituality',
    },
    {
      id: 'liturgy',
      title: 'Liturgy',
      icon: 'book',
      color: COLORS.ORDINARY_TIME,
      description: 'Liturgical texts and commentaries',
    },
    {
      id: 'history',
      title: 'History',
      icon: 'time',
      color: COLORS.LENT,
      description: 'Church history and biographies',
    },
  ];

  const featuredBooks = [
    {
      id: '1',
      title: 'Summa Theologica',
      author: 'St. Thomas Aquinas',
      category: 'Theology',
      description: 'The masterwork of Catholic theology',
      coverImage: 'https://example.com/summa.jpg',
      isDominican: true,
    },
    {
      id: '2',
      title: 'The Divine Comedy',
      author: 'Dante Alighieri',
      category: 'Literature',
      description: 'Medieval epic poem of the afterlife',
      coverImage: 'https://example.com/dante.jpg',
      isDominican: false,
    },
    {
      id: '3',
      title: 'Introduction to the Devout Life',
      author: 'St. Francis de Sales',
      category: 'Spirituality',
      description: 'Classic guide to spiritual growth',
      coverImage: 'https://example.com/devout.jpg',
      isDominican: false,
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    console.log('Navigate to category:', categoryId);
  };

  const handleBookPress = (bookId: string) => {
    if (!isAuthenticated) {
      console.log('Please log in to access books');
      return;
    }
    console.log('Open book:', bookId);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSignIn = () => {
    console.log('Navigate to sign in');
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.TEXT_LIGHT }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Authentication Notice */}
        {!isAuthenticated && (
          <View style={[styles.authNotice, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="lock-closed" size={24} color={colors.WARNING} />
            <Text style={[styles.authNoticeText, { color: colors.TEXT }]}>
              Sign in to access the complete library
            </Text>
            <TouchableOpacity style={[styles.signInButton, { backgroundColor: colors.PRIMARY }]} onPress={handleSignIn}>
              <Text style={[styles.signInButtonText, { color: colors.TEXT_WHITE }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="search" size={20} color={colors.TEXT_LIGHT} />
            <TextInput
              style={[styles.searchInput, { color: colors.TEXT }]}
              placeholder="Search books, authors, topics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.TEXT_LIGHT}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Categories</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Browse by subject area
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {bookCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: colors.CARD_BACKGROUND, borderLeftColor: category.color }]}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon as any} size={24} color={colors.TEXT_WHITE} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryTitle, { color: colors.TEXT }]}>{category.title}</Text>
                  <Text style={[styles.categoryDescription, { color: colors.TEXT_LIGHT }]}>{category.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.TEXT_LIGHT} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Books */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Featured Books</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Recommended reading for today
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredBooksContainer}
          contentContainerStyle={styles.featuredBooksContent}
        >
          {featuredBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={[styles.bookCard, { backgroundColor: colors.CARD_BACKGROUND }]}
              onPress={() => handleBookPress(book.id)}
              activeOpacity={0.8}
            >
              <View style={styles.bookCover}>
                <Ionicons name="book" size={40} color={colors.PRIMARY} />
                {book.isDominican && (
                  <View style={[styles.dominicanBadge, { backgroundColor: colors.ACCENT }]}>
                    <Ionicons name="star" size={12} color={colors.TEXT_WHITE} />
                  </View>
                )}
              </View>
              <View style={styles.bookInfo}>
                <Text style={[styles.bookTitle, { color: colors.TEXT }]} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={[styles.bookAuthor, { color: colors.TEXT_LIGHT }]}>{book.author}</Text>
                <Text style={[styles.bookCategory, { color: colors.TEXT_LIGHT }]}>{book.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Reads */}
        {isAuthenticated && (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Recent Reads</Text>
            </View>

            <View style={styles.recentReadsContainer}>
              <View style={[styles.recentReadItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
                <Ionicons name="bookmark" size={16} color={colors.PRIMARY} />
                <View style={styles.recentReadInfo}>
                  <Text style={[styles.recentReadTitle, { color: colors.TEXT }]}>Summa Theologica</Text>
                  <Text style={[styles.recentReadProgress, { color: colors.TEXT_LIGHT }]}>Page 245 of 1,200</Text>
                </View>
              </View>
              <View style={[styles.recentReadItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
                <Ionicons name="bookmark" size={16} color={colors.SECONDARY} />
                <View style={styles.recentReadInfo}>
                  <Text style={[styles.recentReadTitle, { color: colors.TEXT }]}>The Divine Comedy</Text>
                  <Text style={[styles.recentReadProgress, { color: colors.TEXT_LIGHT }]}>Canto 12 of 100</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Reading Stats */}
        {isAuthenticated && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Reading Statistics</Text>
          </View>
        )}

        {isAuthenticated && (
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
              <Text style={[styles.statNumber, { color: colors.PRIMARY }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.TEXT }]}>Books Read</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
              <Text style={[styles.statNumber, { color: colors.SECONDARY }]}>1,247</Text>
              <Text style={[styles.statLabel, { color: colors.TEXT }]}>Pages Read</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
              <Text style={[styles.statNumber, { color: colors.ACCENT }]}>45</Text>
              <Text style={[styles.statLabel, { color: colors.TEXT }]}>Reading Days</Text>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Quick Actions</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="bookmark" size={24} color={colors.PRIMARY} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>My Library</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="download" size={24} color={colors.SECONDARY} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Downloaded</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="heart" size={24} color={colors.ACCENT} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="settings" size={24} color={colors.TEXT_LIGHT} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...TEXT_STYLES.BODY,
  },
  authNotice: {
    marginHorizontal: SPACING.SCREEN_PADDING,
    marginVertical: SPACING.MD,
    padding: SPACING.MD,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    alignItems: 'center',
  },
  authNoticeText: {
    ...TEXT_STYLES.BODY_SMALL,
    textAlign: 'center',
    marginVertical: SPACING.SM,
  },
  signInButton: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_SM,
  },
  signInButtonText: {
    ...TEXT_STYLES.BODY_SMALL,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.MD,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SPACING.BORDER_RADIUS_MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    ...SPACING.SHADOW_SM,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.SM,
    ...TEXT_STYLES.BODY,
  },
  section: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.MD,
  },
  sectionTitle: {
    ...TEXT_STYLES.H2,
    marginBottom: SPACING.XS,
  },
  sectionSubtitle: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  categoryCard: {
    marginBottom: SPACING.MD,
    borderRadius: SPACING.BORDER_RADIUS_LG,
    padding: SPACING.CARD_PADDING,
    borderLeftWidth: 4,
    ...SPACING.SHADOW_MD,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    ...TEXT_STYLES.H3,
    marginBottom: SPACING.XS,
  },
  categoryDescription: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  featuredBooksContainer: {
    marginBottom: SPACING.LG,
  },
  featuredBooksContent: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
  },
  bookCard: {
    width: 160,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    padding: SPACING.MD,
    marginRight: SPACING.MD,
    ...SPACING.SHADOW_SM,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: SPACING.BORDER_RADIUS_SM,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.SM,
    alignSelf: 'center',
    position: 'relative',
  },
  dominicanBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: SPACING.BORDER_RADIUS_ROUND,
    padding: 2,
  },
  bookInfo: {
    alignItems: 'center',
  },
  bookTitle: {
    ...TEXT_STYLES.BODY_SMALL,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: SPACING.XS,
  },
  bookAuthor: {
    ...TEXT_STYLES.CAPTION,
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  bookCategory: {
    ...TEXT_STYLES.CAPTION,
    textAlign: 'center',
  },
  recentReadsContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  recentReadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    ...SPACING.SHADOW_SM,
  },
  recentReadInfo: {
    marginLeft: SPACING.MD,
    flex: 1,
  },
  recentReadTitle: {
    ...TEXT_STYLES.BODY,
    marginBottom: SPACING.XS,
  },
  recentReadProgress: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  statCard: {
    flex: 1,
    padding: SPACING.MD,
    marginHorizontal: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    alignItems: 'center',
    ...SPACING.SHADOW_SM,
  },
  statNumber: {
    ...TEXT_STYLES.H2,
    marginBottom: SPACING.XS,
  },
  statLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.XL,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: SPACING.BORDER_RADIUS_MD,
    padding: SPACING.MD,
    marginBottom: SPACING.MD,
    marginHorizontal: '1%',
    alignItems: 'center',
    ...SPACING.SHADOW_SM,
  },
  quickActionText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
});

export default StudyScreen;
