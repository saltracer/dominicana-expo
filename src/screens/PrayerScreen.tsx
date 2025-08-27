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

const PrayerScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { colors } = useTheme();

  const prayerOptions = [
    {
      id: 'liturgy_hours',
      title: 'Liturgy of the Hours',
      subtitle: 'Divine Office',
      description: 'Pray the official prayer of the Church',
      icon: 'time',
      color: colors.PRIMARY,
      features: [
        'Morning Prayer (Lauds)',
        'Evening Prayer (Vespers)',
        'Night Prayer (Compline)',
        'Office of Readings',
        'Daytime Prayer',
      ],
    },
    {
      id: 'rosary',
      title: 'Holy Rosary',
      subtitle: 'Dominican Rosary',
      description: 'Pray the traditional Dominican Rosary',
      icon: 'flower',
      color: colors.SECONDARY,
      features: [
        'Joyful Mysteries',
        'Sorrowful Mysteries',
        'Glorious Mysteries',
        'Luminous Mysteries',
        'Meditations & Reflections',
      ],
    },
    {
      id: 'devotionals',
      title: 'Devotionals',
      subtitle: 'Traditional Prayers',
      description: 'Classic Catholic prayers and devotions',
      icon: 'heart',
      color: colors.ACCENT,
      features: [
        'Angelus',
        'Regina Caeli',
        'Divine Mercy Chaplet',
        'Stations of the Cross',
        'Litany of the Saints',
      ],
    },
    {
      id: 'novenas',
      title: 'Novenas',
      subtitle: 'Nine-Day Prayers',
      description: 'Traditional nine-day prayer sequences',
      icon: 'calendar',
      color: COLORS.ADVENT,
      features: [
        'Novenas to Saints',
        'Seasonal Novenas',
        'Dominican Novenas',
        'Custom Prayer Intentions',
        'Prayer Tracking',
      ],
    },
  ];

  const handlePrayerOptionPress = (optionId: string) => {
    console.log('Navigate to:', optionId);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Prayer Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Prayer Options</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Choose your prayer practice for today
          </Text>
        </View>

        {prayerOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.prayerCard, { backgroundColor: colors.CARD_BACKGROUND, borderLeftColor: option.color }]}
            onPress={() => handlePrayerOptionPress(option.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                <Ionicons name={option.icon as any} size={24} color={colors.TEXT_WHITE} />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={[styles.cardTitle, { color: colors.TEXT }]}>{option.title}</Text>
                <Text style={[styles.cardSubtitle, { color: colors.TEXT_LIGHT }]}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.TEXT_LIGHT} />
            </View>

            <Text style={[styles.cardDescription, { color: colors.TEXT }]}>{option.description}</Text>

            <View style={styles.featuresContainer}>
              {option.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.SUCCESS} />
                  <Text style={[styles.featureText, { color: colors.TEXT }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Quick Access</Text>
        </View>

        <View style={styles.quickAccessContainer}>
          <TouchableOpacity style={[styles.quickAccessCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="sunny" size={24} color={colors.ACCENT} />
            <Text style={[styles.quickAccessText, { color: colors.TEXT }]}>Morning Prayer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickAccessCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="moon" size={24} color={colors.SECONDARY} />
            <Text style={[styles.quickAccessText, { color: colors.TEXT }]}>Evening Prayer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickAccessCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="flower" size={24} color={colors.PRIMARY} />
            <Text style={[styles.quickAccessText, { color: colors.TEXT }]}>Today's Rosary</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickAccessCard, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="book" size={24} color={COLORS.ADVENT} />
            <Text style={[styles.quickAccessText, { color: colors.TEXT }]}>Readings</Text>
          </TouchableOpacity>
        </View>

        {/* Prayer Intentions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Prayer Intentions</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TEXT_LIGHT }]}>
            Add your personal prayer intentions
          </Text>
        </View>

        <TouchableOpacity style={[styles.intentionCard, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}>
          <View style={styles.intentionHeader}>
            <Ionicons name="add-circle" size={24} color={colors.PRIMARY} />
            <Text style={[styles.intentionText, { color: colors.PRIMARY }]}>Add Prayer Intention</Text>
          </View>
        </TouchableOpacity>

        {/* Recent Prayers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TEXT }]}>Recent Prayers</Text>
        </View>

        <View style={styles.recentPrayersContainer}>
          <View style={[styles.recentPrayerItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="time" size={16} color={colors.TEXT_LIGHT} />
            <Text style={[styles.recentPrayerText, { color: colors.TEXT }]}>Morning Prayer - Today</Text>
          </View>
          <View style={[styles.recentPrayerItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="flower" size={16} color={colors.TEXT_LIGHT} />
            <Text style={[styles.recentPrayerText, { color: colors.TEXT }]}>Joyful Mysteries - Yesterday</Text>
          </View>
          <View style={[styles.recentPrayerItem, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Ionicons name="moon" size={16} color={colors.TEXT_LIGHT} />
            <Text style={[styles.recentPrayerText, { color: colors.TEXT }]}>Evening Prayer - Yesterday</Text>
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
  prayerCard: {
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
  quickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
  quickAccessCard: {
    width: '48%',
    borderRadius: SPACING.BORDER_RADIUS_MD,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    marginHorizontal: '1%',
    alignItems: 'center',
    ...SPACING.SHADOW_SM,
  },
  quickAccessText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  intentionCard: {
    marginHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.LG,
    borderRadius: SPACING.BORDER_RADIUS_LG,
    padding: SPACING.CARD_PADDING,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  intentionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intentionText: {
    ...TEXT_STYLES.BODY,
    marginLeft: SPACING.SM,
  },
  recentPrayersContainer: {
    paddingHorizontal: SPACING.SCREEN_PADDING,
    marginBottom: SPACING.XXL,
  },
  recentPrayerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    borderRadius: SPACING.BORDER_RADIUS_MD,
    ...SPACING.SHADOW_SM,
  },
  recentPrayerText: {
    ...TEXT_STYLES.BODY_SMALL,
    marginLeft: SPACING.SM,
  },
});

export default PrayerScreen;
