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

const PreachingScreen: React.FC = () => {
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
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setLoading(false);
    }
  };

  const preachingCategories = [
    {
      id: 'daily_reflections',
      title: 'Daily Reflections',
      subtitle: 'Daily Gospel Meditations',
      description: 'Reflections on the daily Gospel readings',
      icon: 'sunny',
      color: colors.PRIMARY,
      features: [
        'Gospel reflections',
        'Seasonal meditations',
        'Dominican insights',
        'Prayer prompts',
        'Audio versions available',
      ],
    },
    {
      id: 'homilies',
      title: 'Homilies',
      subtitle: 'Sunday & Feast Day Homilies',
      description: 'Complete homilies for liturgical celebrations',
      icon: 'megaphone',
      color: colors.SECONDARY,
      features: [
        'Sunday homilies',
        'Feast day homilies',
        'Dominican preachers',
        'Scriptural insights',
        'Pastoral guidance',
      ],
    },
    {
      id: 'spiritual_writings',
      title: 'Spiritual Writings',
      subtitle: 'Classic & Contemporary',
      description: 'Spiritual writings from Dominican tradition',
      icon: 'book',
      color: colors.ACCENT,
      features: [
        'Dominican spirituality',
        'Classic texts',
        'Contemporary authors',
        'Theological insights',
        'Formation resources',
      ],
    },
    {
      id: 'blog_posts',
      title: 'Blog Posts',
      subtitle: 'Contemporary Insights',
      description: 'Blog posts and articles from Dominican friars',
      icon: 'document-text',
      color: COLORS.ADVENT,
      features: [
        'Current events',
        'Theological discussions',
        'Pastoral reflections',
        'Academic insights',
        'Community news',
      ],
    },
  ];

  const featuredReflections = [
    {
      id: '1',
      title: 'The Light of Christ in Darkness',
      author: 'Fr. Thomas Aquinas OP',
      date: 'Today',
      excerpt: 'In today\'s Gospel, we see how Christ brings light to the darkest places of our lives...',
      category: 'Daily Reflection',
      isDominican: true,
      requiresSubscription: false,
    },
    {
      id: '2',
      title: 'Mercy and Justice: A Dominican Perspective',
      author: 'Fr. Dominic OP',
      date: 'Yesterday',
      excerpt: 'The Dominican tradition has always emphasized the balance between mercy and justice...',
      category: 'Spiritual Writing',
      isDominican: true,
      requiresSubscription: true,
    },
    {
      id: '3',
      title: 'The Joy of the Gospel',
      author: 'Pope Francis',
      date: '2 days ago',
      excerpt: 'The Gospel is not a collection of rules and regulations, but a message of joy...',
      category: 'Homily',
      isDominican: false,
      requiresSubscription: false,
    },
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'Dominican Prayer: Contemplation and Action',
      author: 'Fr. Catherine OP',
      date: '3 days ago',
      category: 'Spirituality',
    },
    {
      id: '2',
      title: 'The Eucharist: Source and Summit',
      author: 'Fr. Thomas OP',
      date: '1 week ago',
      category: 'Theology',
    },
    {
      id: '3',
      title: 'Preaching with Love',
      author: 'Fr. Dominic OP',
      date: '2 weeks ago',
      category: 'Formation',
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    console.log('Navigate to category:', categoryId);
  };

  const handleReflectionPress = (reflectionId: string) => {
    console.log('Open reflection:', reflectionId);
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
        {/* Authentication Notice for Premium Content */}
        {!isAuthenticated && (
          <View style={[styles.authNotice, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="lock-closed" size={24} color={colors.WARNING} />
            <Text style={[styles.authNoticeText, { color: colors.TEXT }]}>
              Sign in to access premium reflections and audio content
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
              placeholder="Search reflections, homilies, authors..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.TEXT_LIGHT}
            />
          </View>
        </View>

        {/* Preaching Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Preaching Categories</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Explore different types of spiritual content
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {preachingCategories.map((category) => (
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
                  <Text style={[styles.categorySubtitle, { color: colors.TEXT_LIGHT }]}>{category.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.TEXT_LIGHT} />
              </View>

              <Text style={[styles.categoryDescription, { color: colors.TEXT }]}>{category.description}</Text>

              <View style={styles.featuresContainer}>
                {category.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.SUCCESS} />
                    <Text style={[styles.featureText, { color: colors.TEXT }]}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Reflections */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Featured Reflections</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Today's recommended spiritual reading
          </Text>
        </View>

        <View style={styles.reflectionsContainer}>
          {featuredReflections.map((reflection) => (
            <TouchableOpacity
              key={reflection.id}
              style={[styles.reflectionCard, { backgroundColor: colors.CARD_BACKGROUND }]}
              onPress={() => handleReflectionPress(reflection.id)}
              activeOpacity={0.8}
            >
              <View style={styles.reflectionHeader}>
                <View style={styles.reflectionMeta}>
                  <Text style={[styles.reflectionCategory, { color: colors.PRIMARY, backgroundColor: colors.PRIMARY_TRANSPARENT }]}>
                    {reflection.category}
                  </Text>
                  <Text style={[styles.reflectionDate, { color: colors.TEXT_LIGHT }]}>{reflection.date}</Text>
                </View>
                {reflection.isDominican && (
                  <View style={[styles.dominicanBadge, { backgroundColor: colors.ACCENT_TRANSPARENT }]}>
                    <Ionicons name="star" size={12} color={colors.ACCENT} />
                    <Text style={[styles.dominicanText, { color: colors.ACCENT }]}>OP</Text>
                  </View>
                )}
                {reflection.requiresSubscription && !isAuthenticated && (
                  <View style={[styles.premiumBadge, { backgroundColor: colors.WARNING }]}>
                    <Ionicons name="lock-closed" size={12} color={colors.TEXT} />
                    <Text style={[styles.premiumText, { color: colors.TEXT }]}>Premium</Text>
                  </View>
                )}
              </View>

              <Text style={[styles.reflectionTitle, { color: colors.TEXT }]}>{reflection.title}</Text>
              <Text style={[styles.reflectionAuthor, { color: colors.TEXT_LIGHT }]}>by {reflection.author}</Text>
              <Text style={[styles.reflectionExcerpt, { color: colors.TEXT }]} numberOfLines={3}>
                {reflection.excerpt}
              </Text>

              <View style={styles.reflectionFooter}>
                <TouchableOpacity style={styles.readMoreButton}>
                  <Text style={[styles.readMoreText, { color: colors.PRIMARY }]}>Read More</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.PRIMARY} />
                </TouchableOpacity>
                {reflection.requiresSubscription && (
                  <TouchableOpacity style={styles.audioButton}>
                    <Ionicons name="play-circle" size={20} color={colors.ACCENT} />
                    <Text style={[styles.audioText, { color: colors.ACCENT }]}>Audio</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Recent Posts</Text>
        </View>

        <View style={styles.recentPostsContainer}>
          {recentPosts.map((post) => (
            <TouchableOpacity key={post.id} style={[styles.recentPostItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
              <View style={styles.recentPostInfo}>
                <Text style={[styles.recentPostTitle, { color: colors.TEXT }]}>{post.title}</Text>
                <Text style={[styles.recentPostAuthor, { color: colors.TEXT_LIGHT }]}>by {post.author}</Text>
                <View style={styles.recentPostMeta}>
                  <Text style={[styles.recentPostDate, { color: colors.TEXT_LIGHT }]}>{post.date}</Text>
                  <Text style={[styles.recentPostCategory, { color: colors.PRIMARY, backgroundColor: colors.PRIMARY_TRANSPARENT }]}>
                    {post.category}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.TEXT_LIGHT} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Quick Actions</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="calendar" size={24} color={colors.PRIMARY} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Today's Reflection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="calendar" size={24} color={colors.SECONDARY} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>This Week</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="bookmark" size={24} color={colors.ACCENT} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="headset" size={24} color={COLORS.ADVENT} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Audio</Text>
          </TouchableOpacity>
        </View>

        {/* Author Spotlight */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Author Spotlight</Text>
        </View>

        <View style={styles.authorSpotlightContainer}>
          <View style={[styles.authorCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <View style={[styles.authorAvatar, { backgroundColor: colors.BACKGROUND }]}>
              <Ionicons name="person" size={40} color={colors.PRIMARY} />
            </View>
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { color: colors.TEXT }]}>Fr. Thomas Aquinas OP</Text>
              <Text style={[styles.authorDescription, { color: colors.TEXT_LIGHT }]}>
                Dominican theologian and spiritual writer
              </Text>
              <Text style={[styles.authorStats, { color: colors.PRIMARY }]}>15 reflections • 3 homilies</Text>
            </View>
          </View>
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
    paddingVertical: SPACING.MD,
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
    marginBottom: SPACING.SM,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: SPACING.BORDER_RADIUS_ROUND,
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
  categorySubtitle: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  categoryDescription: {
    ...TEXT_STYLES.BODY,
    marginBottom: SPACING.MD,
  },
  featuresContainer: {
    marginTop: SPACING.SM,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  featureText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginLeft: SPACING.SM,
  },
  reflectionsContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  reflectionCard: {
    marginBottom: SPACING.MD,
    borderRadius: SPACING.BORDER_RADIUS_LG,
    padding: SPACING.CARD_PADDING,
    ...SPACING.SHADOW_MD,
  },
  reflectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.SM,
  },
  reflectionMeta: {
    flex: 1,
  },
  reflectionCategory: {
    ...TEXT_STYLES.CAPTION,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
    alignSelf: 'flex-start',
    marginBottom: SPACING.XS,
  },
  reflectionDate: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  dominicanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
    marginLeft: SPACING.SM,
  },
  dominicanText: {
    ...TEXT_STYLES.CAPTION,
    marginLeft: SPACING.XS,
    fontWeight: 'bold',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
    marginLeft: SPACING.SM,
  },
  premiumText: {
    ...TEXT_STYLES.CAPTION,
    marginLeft: SPACING.XS,
    fontWeight: 'bold',
  },
  reflectionTitle: {
    ...TEXT_STYLES.H3,
    marginBottom: SPACING.XS,
  },
  reflectionAuthor: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.SM,
  },
  reflectionExcerpt: {
    ...TEXT_STYLES.BODY,
    lineHeight: 22,
    marginBottom: SPACING.MD,
  },
  reflectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    ...TEXT_STYLES.BODY_SMALL,
    fontWeight: 'bold',
    marginRight: SPACING.XS,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginLeft: SPACING.XS,
  },
  recentPostsContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  recentPostItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    ...SPACING.SHADOW_SM,
  },
  recentPostInfo: {
    flex: 1,
  },
  recentPostTitle: {
    ...TEXT_STYLES.BODY,
    fontWeight: 'bold',
    marginBottom: SPACING.XS,
  },
  recentPostAuthor: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
  recentPostMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentPostDate: {
    ...TEXT_STYLES.CAPTION,
    marginRight: SPACING.MD,
  },
  recentPostCategory: {
    ...TEXT_STYLES.CAPTION,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: SPACING.BORDER_RADIUS_MD,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    marginHorizontal: '1%',
    alignItems: 'center',
    ...SPACING.SHADOW_SM,
  },
  quickActionText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  authorSpotlightContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.XXL,
  },
  authorCard: {
    flexDirection: 'row',
    borderRadius: SPACING.BORDER_RADIUS_LG,
    padding: SPACING.CARD_PADDING,
    ...SPACING.SHADOW_MD,
  },
  authorAvatar: {
    width: 60,
    height: 60,
    borderRadius: SPACING.BORDER_RADIUS_ROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    ...TEXT_STYLES.H4,
    marginBottom: SPACING.XS,
  },
  authorDescription: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
  authorStats: {
    ...TEXT_STYLES.CAPTION,
  },
});

export default PreachingScreen;
