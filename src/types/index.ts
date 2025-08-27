// Liturgical Calendar Types
export interface LiturgicalDate {
  date: string; // YYYY-MM-DD format
  dayOfWeek: string;
  liturgicalSeason: LiturgicalSeason;
  liturgicalColor: string;
  feastDay?: FeastDay;
  isDominicanFeast: boolean;
  isMovableFeast: boolean;
}

export interface LiturgicalSeason {
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface FeastDay {
  id: string;
  name: string;
  type: FeastType;
  rank: FeastRank;
  date: string; // MM-DD format for fixed feasts
  description: string;
  isDominican: boolean;
  saint?: Saint;
  liturgicalColor: string;
}

export type FeastType = 'SOLEMNITY' | 'FEAST' | 'MEMORIAL' | 'OPTIONAL_MEMORIAL' | 'COMMEMORATION';
export type FeastRank = 'HIGHER_RANK' | 'HIGH_RANK' | 'MEDIUM_RANK' | 'LOW_RANK';

// Saint Types
export interface Saint {
  id: string;
  name: string;
  feastDay: string; // MM-DD format
  birthYear?: number;
  deathYear?: number;
  canonizationYear?: number;
  description: string;
  biography: string;
  patronage: string[];
  isDominican: boolean;
  order?: string;
  province?: string;
  imageUrl?: string;
}

// Prayer Types
export interface Prayer {
  id: string;
  title: string;
  type: PrayerType;
  content: string;
  language: string;
  source: string;
  isDominican: boolean;
}

export type PrayerType = 'LITURGY_HOURS' | 'ROSARY' | 'DEVOTIONAL' | 'LITANY' | 'NOVENA';

export interface LiturgyHour {
  id: string;
  name: string;
  time: string;
  prayers: Prayer[];
  antiphons: string[];
  psalms: Psalm[];
  readings: Reading[];
  intercessions: string[];
}

export interface Psalm {
  id: string;
  number: number;
  title: string;
  content: string;
  antiphon: string;
  refrain: string;
}

export interface Reading {
  id: string;
  title: string;
  content: string;
  source: string;
  author: string;
}

export interface RosaryMystery {
  id: string;
  name: string;
  type: RosaryType;
  day: string;
  description: string;
  meditation: string;
  fruit: string;
}

export type RosaryType = 'JOYFUL' | 'SORROWFUL' | 'GLORIOUS' | 'LUMINOUS';

// Study Types
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  language: string;
  filePath: string;
  fileSize: number;
  coverImage?: string;
  isDominican: boolean;
  requiresLogin: boolean;
  tags: string[];
}

export type BookCategory = 'THEOLOGY' | 'PHILOSOPHY' | 'SPIRITUALITY' | 'HISTORY' | 'LITURGY' | 'DOMINICAN';

// Community Types
export interface Province {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  website?: string;
  contactInfo: ContactInfo;
  statistics: ProvinceStats;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ProvinceStats {
  totalFriars: number;
  priests: number;
  brothers: number;
  students: number;
  parishes: number;
  schools: number;
}

// Preaching Types
export interface Reflection {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
  liturgicalDate?: LiturgicalDate;
  tags: string[];
  isDominican: boolean;
  audioUrl?: string;
  requiresSubscription: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  publishDate: string;
  tags: string[];
  category: string;
  imageUrl?: string;
  isDominican: boolean;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: Subscription;
  preferences: UserPreferences;
  createdAt: string;
  lastLogin: string;
}

export type UserRole = 'ANONYMOUS' | 'USER' | 'SUBSCRIBER' | 'ADMIN';

export interface Subscription {
  type: SubscriptionType;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  features: string[];
}

export type SubscriptionType = 'FREE' | 'BASIC' | 'PREMIUM';
export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING';

export interface UserPreferences {
  language: string;
  theme: 'LIGHT' | 'DARK' | 'AUTO';
  notifications: NotificationSettings;
  prayerReminders: PrayerReminder[];
  favoriteSaints: string[];
  favoriteBooks: string[];
}

export interface NotificationSettings {
  prayerReminders: boolean;
  feastDayAlerts: boolean;
  newContent: boolean;
  audioContent: boolean;
}

export interface PrayerReminder {
  id: string;
  type: PrayerType;
  time: string;
  days: string[];
  enabled: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  Profile: undefined;
  Auth: undefined;
  Prayer: undefined;
  Study: undefined;
  Community: undefined;
  Preaching: undefined;
  LiturgyHours: undefined;
  Rosary: undefined;
  BookReader: { bookId: string };
  SaintDetail: { saintId: string };
  ProvinceDetail: { provinceId: string };
  ReflectionDetail: { reflectionId: string };
  Settings: undefined;
};

export type TabParamList = {
  Prayer: undefined;
  Study: undefined;
  Community: undefined;
  Preaching: undefined;
};

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Database Types
export interface DatabaseConfig {
  name: string;
  version: number;
  tables: TableSchema[];
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  indexes?: IndexSchema[];
}

export interface ColumnSchema {
  name: string;
  type: 'TEXT' | 'INTEGER' | 'REAL' | 'BLOB';
  primaryKey?: boolean;
  autoIncrement?: boolean;
  notNull?: boolean;
  unique?: boolean;
  defaultValue?: any;
}

export interface IndexSchema {
  name: string;
  columns: string[];
  unique?: boolean;
}
