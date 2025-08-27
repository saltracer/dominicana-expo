import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import services
import databaseService from './src/services/database';
import authService from './src/services/auth';

// Import navigation
import TabNavigator from './src/navigation/TabNavigator';
import ProfileScreen from './src/screens/ProfileScreen';

// Import constants
import { COLORS } from './src/constants/colors';
import { TEXT_STYLES } from './src/constants/typography';
import { SPACING } from './src/constants/spacing';

// Import types
import { RootStackParamList } from './src/types';

// Import theme context
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize database only on native platforms
      if (Platform.OS !== 'web') {
        await databaseService.initialize();
      }
      
      // Initialize anonymous user
      await authService.initializeAnonymousUser();
      
      setIsInitialized(true);
    } catch (error) {
      console.error('App initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View style={[styles.loadingContainer, { backgroundColor: colors.BACKGROUND }]}>
          <View style={styles.loadingContent}>
            <Ionicons name="flower" size={80} color={colors.PRIMARY} />
            <Text style={[styles.loadingTitle, { color: colors.PRIMARY }]}>Dominicana</Text>
            <Text style={[styles.loadingSubtitle, { color: colors.TEXT_LIGHT }]}>
              Liturgical Companion for the Order of Preachers
            </Text>
            <View style={styles.loadingSpinner}>
              <Text style={[styles.loadingText, { color: colors.TEXT_LIGHT }]}>Initializing...</Text>
            </View>
          </View>
        </View>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              headerShown: true,
              headerTitle: 'Profile',
              headerStyle: {
                backgroundColor: colors.PRIMARY,
              },
              headerTintColor: colors.TEXT_WHITE,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: SPACING.XXL,
  },
  loadingTitle: {
    ...TEXT_STYLES.H1,
    marginTop: SPACING.LG,
    marginBottom: SPACING.SM,
    textAlign: 'center',
  },
  loadingSubtitle: {
    ...TEXT_STYLES.BODY_LARGE,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  loadingSpinner: {
    marginTop: SPACING.LG,
  },
  loadingText: {
    ...TEXT_STYLES.BODY,
    textAlign: 'center',
  },
});
