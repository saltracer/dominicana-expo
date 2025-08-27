import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { TEXT_STYLES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { useTheme } from '../context/ThemeContext';

const CommunityScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { colors } = useTheme();

  const communityFeatures = [
    {
      id: 'calendar',
      title: 'Liturgical Calendar',
      subtitle: 'Complete Church Calendar',
      description: 'Browse the full liturgical year with feast days and seasons',
      icon: 'calendar',
      color: colors.PRIMARY,
      features: [
        'Daily liturgical information',
        'Feast day details',
        'Seasonal celebrations',
        'Dominican feasts',
        'Movable feasts',
      ],
    },
    {
      id: 'saints',
      title: 'Saints Directory',
      subtitle: 'Catholic & Dominican Saints',
      description: 'Comprehensive database of saints and holy men and women',
      icon: 'people',
      color: colors.SECONDARY,
      features: [
        'Searchable saints database',
        'Dominican saints',
        'Feast day information',
        'Biographies and patronage',
        'Prayers to saints',
      ],
    },
    {
      id: 'provinces',
      title: 'Provinces Map',
      subtitle: 'Dominican Order Worldwide',
      description: 'Interactive map of Dominican provinces and communities',
      icon: 'map',
      color: colors.ACCENT,
      features: [
        'Interactive world map',
        'Province information',
        'Contact details',
        'Community statistics',
        'Dominican presence',
      ],
    },
    {
      id: 'events',
      title: 'Community Events',
      subtitle: 'Dominican Gatherings',
      description: 'Stay connected with Dominican events and gatherings',
      icon: 'calendar-outline',
      color: COLORS.ADVENT,
      features: [
        'Upcoming events',
        'Province gatherings',
        'Academic conferences',
        'Retreats and workshops',
        'Event registration',
      ],
    },
  ];

  const upcomingFeasts = [
    {
      id: '1',
      name: 'St. Dominic',
      date: 'August 8',
      type: 'Dominican Feast',
      color: colors.PRIMARY,
    },
    {
      id: '2',
      name: 'Assumption of Mary',
      date: 'August 15',
      type: 'Solemnity',
      color: COLORS.CHRISTMAS,
    },
    {
      id: '3',
      name: 'St. Rose of Lima',
      date: 'August 23',
      type: 'Dominican Feast',
      color: colors.PRIMARY,
    },
  ];

  const recentSaints = [
    {
      id: '1',
      name: 'St. Thomas Aquinas',
      feastDay: 'January 28',
      isDominican: true,
    },
    {
      id: '2',
      name: 'St. Catherine of Siena',
      feastDay: 'April 29',
      isDominican: true,
    },
    {
      id: '3',
      name: 'St. Martin de Porres',
      feastDay: 'November 3',
      isDominican: true,
    },
  ];

  const handleFeaturePress = (featureId: string) => {
    console.log('Navigate to feature:', featureId);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Community Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Community Features</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Connect with the Dominican family worldwide
          </Text>
        </View>

        {communityFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.featureCard, { backgroundColor: colors.CARD_BACKGROUND, borderLeftColor: feature.color }]}
            onPress={() => handleFeaturePress(feature.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={24} color={colors.TEXT_WHITE} />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={[styles.cardTitle, { color: colors.TEXT }]}>{feature.title}</Text>
                <Text style={[styles.cardSubtitle, { color: colors.TEXT_LIGHT }]}>{feature.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.TEXT_LIGHT} />
            </View>

            <Text style={[styles.cardDescription, { color: colors.TEXT }]}>{feature.description}</Text>

            <View style={styles.featuresContainer}>
              {feature.features.map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.SUCCESS} />
                  <Text style={[styles.featureText, { color: colors.TEXT }]}>{item}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Upcoming Feasts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Upcoming Feasts</Text>
        </View>

        <View style={styles.upcomingFeastsContainer}>
          {upcomingFeasts.map((feast) => (
            <View key={feast.id} style={[styles.feastCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
              <View style={[styles.feastColorBar, { backgroundColor: feast.color }]} />
              <View style={styles.feastInfo}>
                <Text style={[styles.feastName, { color: colors.TEXT }]}>{feast.name}</Text>
                <Text style={[styles.feastDate, { color: colors.TEXT_LIGHT }]}>{feast.date}</Text>
                <View style={styles.feastTypeContainer}>
                  <Text style={[styles.feastType, { color: colors.PRIMARY, backgroundColor: colors.PRIMARY_TRANSPARENT }]}>
                    {feast.type}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Saints */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Dominican Saints</Text>
        </View>

        <View style={styles.saintsContainer}>
          {recentSaints.map((saint) => (
            <TouchableOpacity key={saint.id} style={[styles.saintCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
              <View style={styles.saintHeader}>
                <Ionicons name="person" size={20} color={colors.PRIMARY} />
                <View style={styles.saintInfo}>
                  <Text style={[styles.saintName, { color: colors.TEXT }]}>{saint.name}</Text>
                  <Text style={[styles.saintFeastDay, { color: colors.TEXT_LIGHT }]}>Feast: {saint.feastDay}</Text>
                </View>
                {saint.isDominican && (
                  <View style={[styles.dominicanBadge, { backgroundColor: colors.ACCENT_TRANSPARENT }]}>
                    <Ionicons name="star" size={12} color={colors.ACCENT} />
                    <Text style={[styles.dominicanText, { color: colors.ACCENT }]}>OP</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Dominican Order</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.statNumber, { color: colors.PRIMARY }]}>100+</Text>
            <Text style={[styles.statLabel, { color: colors.TEXT }]}>Provinces</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.statNumber, { color: colors.SECONDARY }]}>6,000+</Text>
            <Text style={[styles.statLabel, { color: colors.TEXT }]}>Friars</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.statNumber, { color: colors.ACCENT }]}>800+</Text>
            <Text style={[styles.statLabel, { color: colors.TEXT }]}>Years</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Quick Actions</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="search" size={24} color={colors.PRIMARY} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Find Saints</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="location" size={24} color={colors.SECONDARY} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Find Province</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="calendar" size={24} color={colors.ACCENT} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>View Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="people" size={24} color={COLORS.ADVENT} />
            <Text style={[styles.quickActionText, { color: colors.TEXT }]}>Events</Text>
          </TouchableOpacity>
        </View>

        {/* Community News */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Community News</Text>
        </View>

        <View style={styles.newsContainer}>
          <View style={[styles.newsItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <View style={styles.newsHeader}>
              <Text style={[styles.newsTitle, { color: colors.TEXT }]}>General Chapter 2025</Text>
              <Text style={[styles.newsDate, { color: colors.TEXT_LIGHT }]}>July 2025</Text>
            </View>
            <Text style={[styles.newsExcerpt, { color: colors.TEXT_LIGHT }]}>
              The next General Chapter of the Order of Preachers will be held in...
            </Text>
          </View>
          <View style={[styles.newsItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <View style={styles.newsHeader}>
              <Text style={[styles.newsTitle, { color: colors.TEXT }]}>New Dominican Province</Text>
              <Text style={[styles.newsDate, { color: colors.TEXT_LIGHT }]}>June 2024</Text>
            </View>
            <Text style={[styles.newsExcerpt, { color: colors.TEXT_LIGHT }]}>
              The Holy See has approved the establishment of a new Dominican province...
            </Text>
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
  featureCard: {
    marginHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.MD,
    borderRadius: SPACING.BORDER_RADIUS_LG,
    padding: SPACING.CARD_PADDING,
    borderLeftWidth: 4,
    ...SPACING.SHADOW_MD,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: SPACING.BORDER_RADIUS_ROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    ...TEXT_STYLES.H3,
    marginBottom: SPACING.XS,
  },
  cardSubtitle: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  cardDescription: {
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
  upcomingFeastsContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  feastCard: {
    flexDirection: 'row',
    marginBottom: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    overflow: 'hidden',
    ...SPACING.SHADOW_SM,
  },
  feastColorBar: {
    width: 8,
  },
  feastInfo: {
    flex: 1,
    padding: SPACING.MD,
  },
  feastName: {
    ...TEXT_STYLES.BODY,
    fontWeight: 'bold',
    marginBottom: SPACING.XS,
  },
  feastDate: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
  feastTypeContainer: {
    alignSelf: 'flex-start',
  },
  feastType: {
    ...TEXT_STYLES.CAPTION,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
  },
  saintsContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  saintCard: {
    marginBottom: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    padding: SPACING.MD,
    ...SPACING.SHADOW_SM,
  },
  saintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saintInfo: {
    flex: 1,
    marginLeft: SPACING.MD,
  },
  saintName: {
    ...TEXT_STYLES.BODY,
    fontWeight: 'bold',
    marginBottom: SPACING.XS,
  },
  saintFeastDay: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  dominicanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
  },
  dominicanText: {
    ...TEXT_STYLES.CAPTION,
    marginLeft: SPACING.XS,
    fontWeight: 'bold',
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
  newsContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.XXL,
  },
  newsItem: {
    marginBottom: SPACING.MD,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    padding: SPACING.MD,
    ...SPACING.SHADOW_SM,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  newsTitle: {
    ...TEXT_STYLES.BODY,
    fontWeight: 'bold',
    flex: 1,
  },
  newsDate: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  newsExcerpt: {
    ...TEXT_STYLES.BODY_SMALL,
    lineHeight: 20,
  },
});

export default CommunityScreen;
