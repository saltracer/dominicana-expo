import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  useColorScheme,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TEXT_STYLES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { useTheme } from '../context/ThemeContext';
import authService from '../services/auth';

const ProfileScreen: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { colors, theme, setTheme, getEffectiveTheme, isDark } = useTheme();
  const systemColorScheme = useColorScheme();

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

  const handleSignIn = () => {
    console.log('Navigate to sign in');
  };

  const handleSignOut = () => {
    console.log('Sign out');
  };

  const themeOptions = [
    { id: 'system', label: 'System', icon: 'phone-portrait' },
    { id: 'light', label: 'Light', icon: 'sunny' },
    { id: 'dark', label: 'Dark', icon: 'moon' },
  ];

  const profileSections = [
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          id: 'profile_info',
          title: 'Profile Information',
          subtitle: 'Edit your personal details',
          icon: 'person',
          action: () => console.log('Edit profile'),
        },
        {
          id: 'preferences',
          title: 'Preferences',
          subtitle: 'Customize your experience',
          icon: 'settings',
          action: () => console.log('Open preferences'),
        },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance',
      items: [
        {
          id: 'font_size',
          title: 'Font Size',
          subtitle: 'Adjust text size',
          icon: 'text',
          action: () => console.log('Font size settings'),
        },
      ],
    },
    {
      id: 'content',
      title: 'Content',
      items: [
        {
          id: 'downloads',
          title: 'Downloads',
          subtitle: 'Manage offline content',
          icon: 'download',
          action: () => console.log('Downloads'),
        },
        {
          id: 'favorites',
          title: 'Favorites',
          subtitle: 'Your saved items',
          icon: 'heart',
          action: () => console.log('Favorites'),
        },
        {
          id: 'reading_history',
          title: 'Reading History',
          subtitle: 'Your recent activity',
          icon: 'time',
          action: () => console.log('Reading history'),
        },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & FAQ',
          subtitle: 'Get help and find answers',
          icon: 'help-circle',
          action: () => console.log('Help'),
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Share your thoughts with us',
          icon: 'chatbubble',
          action: () => console.log('Feedback'),
        },
        {
          id: 'about',
          title: 'About',
          subtitle: 'App version and information',
          icon: 'information-circle',
          action: () => console.log('About'),
        },
      ],
    },
  ];

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
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="person" size={40} color={colors.PRIMARY} />
          </View>
          <View style={styles.profileInfo}>
            {isAuthenticated ? (
              <>
                <Text style={[styles.profileName, { color: colors.TEXT }]}>John Doe</Text>
                <Text style={[styles.profileEmail, { color: colors.TEXT_LIGHT }]}>john.doe@example.com</Text>
                <Text style={[styles.profileRole, { color: colors.ACCENT }]}>Dominican Friar</Text>
              </>
            ) : (
              <>
                <Text style={[styles.profileName, { color: colors.TEXT }]}>Guest User</Text>
                <Text style={[styles.profileEmail, { color: colors.TEXT_LIGHT }]}>Sign in to access all features</Text>
                <TouchableOpacity style={[styles.signInButton, { backgroundColor: colors.PRIMARY }]} onPress={handleSignIn}>
                  <Text style={[styles.signInButtonText, { color: colors.TEXT_WHITE }]}>Sign In</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Theme Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Theme</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Choose your preferred appearance
          </Text>
        </View>

        <View style={styles.themeSelectorContainer}>
          <View style={styles.radioGroup}>
            {themeOptions.map((option) => {
              const isSelected = theme === option.id;
              
              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.radioOption}
                  onPress={() => setTheme(option.id as 'system' | 'light' | 'dark')}
                  activeOpacity={0.7}
                >
                  <View style={styles.radioButtonContainer}>
                    <View style={[
                      styles.radioButton,
                      { borderColor: isSelected ? colors.PRIMARY : colors.BORDER }
                    ]}>
                      {isSelected && (
                        <View style={[
                          styles.radioButtonInner,
                          { backgroundColor: colors.PRIMARY }
                        ]} />
                      )}
                    </View>
                    <View style={styles.radioContent}>
                      <Ionicons 
                        name={option.icon as any} 
                        size={20} 
                        color={isSelected ? colors.PRIMARY : colors.TEXT_LIGHT} 
                      />
                      <Text style={[
                        styles.radioLabel, 
                        { color: isSelected ? colors.PRIMARY : colors.TEXT }
                      ]}>
                        {option.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Debug Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Debug Info</Text>
          <View style={[styles.debugContainer, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.debugText, { color: colors.TEXT }]}>
              Selected Theme: {theme}
            </Text>
            <Text style={[styles.debugText, { color: colors.TEXT }]}>
              Effective Theme: {getEffectiveTheme()}
            </Text>
            <Text style={[styles.debugText, { color: colors.TEXT }]}>
              Platform: {Platform.OS}
            </Text>
            <Text style={[styles.debugText, { color: colors.TEXT }]}>
              Using: React Native useColorScheme + fallbacks
            </Text>
            <Text style={[styles.debugText, { color: colors.TEXT }]}>
              Is Dark: {isDark ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, { backgroundColor: colors.CARD_BACKGROUND }]}
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuItemIcon, { backgroundColor: colors.PRIMARY_TRANSPARENT }]}>
                      <Ionicons name={item.icon as any} size={20} color={colors.PRIMARY} />
                    </View>
                    <View style={styles.menuItemInfo}>
                      <Text style={[styles.menuItemTitle, { color: colors.TEXT }]}>{item.title}</Text>
                      <Text style={[styles.menuItemSubtitle, { color: colors.TEXT_LIGHT }]}>{item.subtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.menuItemRight}>
                    <Ionicons name="chevron-forward" size={20} color={colors.TEXT_LIGHT} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Section */}
        {isAuthenticated && (
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.signOutButton, { backgroundColor: colors.WARNING }]}
              onPress={handleSignOut}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out" size={20} color={colors.TEXT_WHITE} />
              <Text style={[styles.signOutButtonText, { color: colors.TEXT_WHITE }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.TEXT_LIGHT }]}>Dominicana v1.0.0</Text>
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
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.SCREEN_PADDING,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
    ...SPACING.SHADOW_SM,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...TEXT_STYLES.H3,
    marginBottom: SPACING.XS,
  },
  profileEmail: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
  profileRole: {
    ...TEXT_STYLES.BODY_SMALL,
    fontWeight: 'bold',
  },
  signInButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_SM,
    marginTop: SPACING.SM,
  },
  signInButtonText: {
    ...TEXT_STYLES.BODY_SMALL,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    ...TEXT_STYLES.H4,
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.SM,
  },
  sectionSubtitle: {
    ...TEXT_STYLES.BODY_SMALL,
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.MD,
  },
  themeSelectorContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.MD,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: SPACING.BORDER_RADIUS_MD,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.MD,
  },
  segmentText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginLeft: SPACING.XS,
  },
  sectionContent: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.MD,
    marginBottom: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    ...SPACING.SHADOW_SM,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemTitle: {
    ...TEXT_STYLES.BODY,
    fontWeight: '500',
    marginBottom: SPACING.XS,
  },
  menuItemSubtitle: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  menuItemRight: {
    marginLeft: SPACING.SM,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.MD,
    marginHorizontal: SPACING.SCREEN_PADDING,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    ...SPACING.SHADOW_SM,
  },
  signOutButtonText: {
    ...TEXT_STYLES.BODY,
    fontWeight: 'bold',
    marginLeft: SPACING.SM,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.XL,
  },
  versionText: {
    ...TEXT_STYLES.CAPTION,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.SM,
  },
  radioButtonContainer: {
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioContent: {
    alignItems: 'center',
  },
  radioLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  debugContainer: {
    padding: SPACING.MD,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    ...SPACING.SHADOW_SM,
  },
  debugText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
});

export default ProfileScreen;
