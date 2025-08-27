import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import FeastBanner from '../components/FeastBanner';
import ProfileButton from '../components/ProfileButton';
import { useTheme } from '../context/ThemeContext';

// Import screens
import PrayerScreen from '../screens/PrayerScreen';
import StudyScreen from '../screens/StudyScreen';
import CommunityScreen from '../screens/CommunityScreen';
import PreachingScreen from '../screens/PreachingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { colors } = useTheme();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Prayer':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'Study':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Community':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Preaching':
                iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.PRIMARY,
          tabBarInactiveTintColor: colors.TEXT_LIGHT,
          tabBarStyle: {
            height: SPACING.BOTTOM_TAB_HEIGHT + insets.bottom,
            paddingBottom: Math.max(insets.bottom, SPACING.SM),
            paddingTop: SPACING.SM,
            backgroundColor: colors.BACKGROUND,
            borderTopWidth: 1,
            borderTopColor: colors.BORDER,
            ...SPACING.SHADOW_SM,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: colors.PRIMARY,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.TEXT_WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <ProfileButton 
              onPress={() => {
                // Navigate to Profile screen
                navigation.navigate('Profile');
              }} 
            />
          ),
        })}
      >
        <Tab.Screen
          name="Prayer"
          component={PrayerScreen}
          options={{
            title: 'Prayer',
            headerTitle: 'Prayer',
          }}
        />
        <Tab.Screen
          name="Study"
          component={StudyScreen}
          options={{
            title: 'Study',
            headerTitle: 'Study',
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            title: 'Community',
            headerTitle: 'Community',
          }}
        />
        <Tab.Screen
          name="Preaching"
          component={PreachingScreen}
          options={{
            title: 'Preaching',
            headerTitle: 'Preaching',
          }}
        />
      </Tab.Navigator>
      
      {/* Feast Banner positioned just above tab bar */}
      <View style={[styles.feastBannerContainer, { bottom: SPACING.BOTTOM_TAB_HEIGHT + insets.bottom }]}>
        <FeastBanner
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          showDatePicker={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feastBannerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default TabNavigator;
