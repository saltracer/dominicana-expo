# Dominicana - Liturgical Companion for the Order of Preachers

A comprehensive mobile application built with Expo (React Native) that serves as a complete spiritual resource for Dominican friars and the faithful, integrating prayer, study, community, and preaching elements.

## 🎯 Overview

Dominicana is a liturgical companion app that embodies the four pillars of Dominican life:
- **Prayer**: Liturgy of the Hours and Rosary with anonymous access
- **Study**: Catholic classics library with epub reader (login required)
- **Community**: Liturgical calendar, saints directory, and provinces map
- **Preaching**: Daily reflections and spiritual writings

## ✨ Features

### 🕯️ Prayer Module
- **Liturgy of the Hours**: Complete Dominican breviary with all canonical hours
- **Holy Rosary**: Traditional Dominican Rosary with mysteries and meditations
- **Devotionals**: Classic Catholic prayers (Angelus, Regina Caeli, etc.)
- **Novenas**: Nine-day prayer sequences
- **Anonymous Access**: Prayer functions available without login

### 📚 Study Module
- **Catholic Classics Library**: Extensive collection of theological and spiritual works
- **EPUB Reader**: Integrated reader for offline book consumption
- **Search & Bookmark**: Advanced search and bookmarking functionality
- **Categories**: Theology, Philosophy, Spirituality, Dominican, Liturgy, History
- **Login Required**: Full library access requires authentication

### 👥 Community Module
- **Liturgical Calendar**: Dynamic Dominican liturgical calendar with movable feasts
- **Saints Directory**: Comprehensive database of Catholic and Dominican saints
- **Provinces Map**: Interactive world map of Dominican provinces
- **Community Events**: Dominican gatherings and events
- **Dominican Statistics**: Order-wide statistics and information

### 📢 Preaching Module
- **Daily Reflections**: Gospel meditations and seasonal reflections
- **Homilies**: Sunday and feast day homilies
- **Spiritual Writings**: Classic and contemporary Dominican writings
- **Blog Posts**: Contemporary insights from Dominican friars
- **Audio Content**: Premium audio versions (subscription required)

### 🎨 Design Features
- **Liturgical Color Scheme**: Dynamic colors based on liturgical seasons
- **Traditional Catholic Aesthetic**: Reverent design with liturgical symbols
- **Feast Banner**: Prominent display of current liturgical information
- **Responsive Layout**: Card-based design with ornamental borders
- **Seasonal Adaptations**: Colors and themes change with liturgical seasons

## 🛠️ Technical Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **Database**: SQLite (Expo SQLite)
- **Authentication**: Expo SecureStore
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: React Native StyleSheet

## 📱 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dominicana-expo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── FeastBanner.tsx # Liturgical date display component
├── constants/          # App constants and configuration
│   ├── colors.ts      # Liturgical color scheme
│   ├── spacing.ts     # Layout spacing constants
│   └── typography.ts  # Font styles and text constants
├── navigation/         # Navigation configuration
│   └── TabNavigator.tsx # Main tab navigation
├── screens/           # Main app screens
│   ├── PrayerScreen.tsx
│   ├── StudyScreen.tsx
│   ├── CommunityScreen.tsx
│   └── PreachingScreen.tsx
├── services/          # Business logic and data services
│   ├── auth.ts        # Authentication service
│   ├── database.ts    # SQLite database service
│   └── liturgicalCalendar.ts # Liturgical calculations
├── types/             # TypeScript type definitions
│   └── index.ts       # Main type definitions
└── utils/             # Utility functions
```

## 🔐 Authentication & Access Levels

### Anonymous Access
- Prayer functions (Liturgy of Hours, Rosary)
- Basic liturgical calendar information
- Feast day details
- Public reflections

### User Account (Free)
- All anonymous features
- Complete book library access
- Reading progress tracking
- Favorites and bookmarks
- Basic notifications

### Premium Subscription
- All free features
- Audio content access
- Premium reflections and homilies
- Advanced features
- Priority support

## 🎨 Design System

### Color Palette
- **Primary**: #8B0000 (Liturgical Red)
- **Secondary**: #4B0082 (Royal Purple)
- **Accent**: #DAA520 (Liturgical Gold)
- **Background**: #F5F5DC (Warm Cream)
- **Text**: #2F2F2F (Charcoal)

### Typography
- **Headers**: Georgia (serif)
- **Body**: System font
- **Liturgical Text**: Special serif styling with wider letter spacing

### Liturgical Seasons
- **Advent**: Purple (#4B0082)
- **Christmas**: White (#FFFFFF)
- **Lent**: Violet (#8B008B)
- **Easter**: White (#FFFFFF)
- **Ordinary Time**: Green (#228B22)
- **Pentecost**: Red (#FF0000)

## 📊 Database Schema

The app uses SQLite with the following main tables:
- `liturgical_seasons` - Liturgical season definitions
- `feast_days` - Feast day information
- `saints` - Saints database
- `prayers` - Prayer texts
- `books` - Library content
- `provinces` - Dominican provinces
- `reflections` - Spiritual writings
- `users` - User accounts and preferences

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   - Update app name, version, and bundle identifiers
   - Configure permissions and plugins

2. **Build the app**
   ```bash
   # For iOS
   eas build --platform ios
   
   # For Android
   eas build --platform android
   ```

3. **Submit to stores**
   ```bash
   # iOS App Store
   eas submit --platform ios
   
   # Google Play Store
   eas submit --platform android
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Order of Preachers (Dominicans) for spiritual guidance
- Catholic liturgical resources and traditions
- Expo team for the excellent development platform
- React Native community for tools and libraries

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - Four-pillar navigation structure
  - Liturgical calendar system
  - Prayer and study modules
  - Authentication system
  - Traditional Catholic design

---

*"Contemplare et contemplata aliis tradere"* - To contemplate and to share the fruits of contemplation
