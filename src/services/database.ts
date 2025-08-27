import * as SQLite from 'expo-sqlite';
import { DatabaseConfig, TableSchema, ColumnSchema, IndexSchema } from '../types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private readonly DB_NAME = 'dominicana.db';
  private readonly DB_VERSION = 1;

  async initialize(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync(this.DB_NAME);
      await this.createTables();
      await this.seedInitialData();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const tables: TableSchema[] = [
      // Liturgical Calendar Tables
      {
        name: 'liturgical_seasons',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'color', type: 'TEXT', notNull: true },
          { name: 'start_date', type: 'TEXT', notNull: true },
          { name: 'end_date', type: 'TEXT', notNull: true },
          { name: 'description', type: 'TEXT', notNull: true },
        ],
      },
      {
        name: 'feast_days',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'type', type: 'TEXT', notNull: true },
          { name: 'rank', type: 'TEXT', notNull: true },
          { name: 'date', type: 'TEXT', notNull: true },
          { name: 'description', type: 'TEXT', notNull: true },
          { name: 'is_dominican', type: 'INTEGER', notNull: true, defaultValue: 0 },
          { name: 'liturgical_color', type: 'TEXT', notNull: true },
          { name: 'saint_id', type: 'TEXT' },
        ],
      },
      {
        name: 'saints',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'feast_day', type: 'TEXT', notNull: true },
          { name: 'birth_year', type: 'INTEGER' },
          { name: 'death_year', type: 'INTEGER' },
          { name: 'canonization_year', type: 'INTEGER' },
          { name: 'description', type: 'TEXT', notNull: true },
          { name: 'biography', type: 'TEXT', notNull: true },
          { name: 'patronage', type: 'TEXT', notNull: true },
          { name: 'is_dominican', type: 'INTEGER', notNull: true, defaultValue: 0 },
          { name: 'religious_order', type: 'TEXT' },
          { name: 'province', type: 'TEXT' },
          { name: 'image_url', type: 'TEXT' },
        ],
      },
      // Prayer Tables
      {
        name: 'prayers',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'title', type: 'TEXT', notNull: true },
          { name: 'type', type: 'TEXT', notNull: true },
          { name: 'content', type: 'TEXT', notNull: true },
          { name: 'language', type: 'TEXT', notNull: true },
          { name: 'source', type: 'TEXT', notNull: true },
          { name: 'is_dominican', type: 'INTEGER', notNull: true, defaultValue: 0 },
        ],
      },
      {
        name: 'liturgy_hours',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'time', type: 'TEXT', notNull: true },
          { name: 'antiphons', type: 'TEXT', notNull: true },
          { name: 'intercessions', type: 'TEXT', notNull: true },
        ],
      },
      {
        name: 'psalms',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'number', type: 'INTEGER', notNull: true },
          { name: 'title', type: 'TEXT', notNull: true },
          { name: 'content', type: 'TEXT', notNull: true },
          { name: 'antiphon', type: 'TEXT', notNull: true },
          { name: 'refrain', type: 'TEXT', notNull: true },
        ],
      },
      {
        name: 'readings',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'title', type: 'TEXT', notNull: true },
          { name: 'content', type: 'TEXT', notNull: true },
          { name: 'source', type: 'TEXT', notNull: true },
          { name: 'author', type: 'TEXT', notNull: true },
        ],
      },
      {
        name: 'rosary_mysteries',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'type', type: 'TEXT', notNull: true },
          { name: 'day', type: 'TEXT', notNull: true },
          { name: 'description', type: 'TEXT', notNull: true },
          { name: 'meditation', type: 'TEXT', notNull: true },
          { name: 'fruit', type: 'TEXT', notNull: true },
        ],
      },
      // Study Tables
      {
        name: 'books',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'title', type: 'TEXT', notNull: true },
          { name: 'author', type: 'TEXT', notNull: true },
          { name: 'description', type: 'TEXT', notNull: true },
          { name: 'category', type: 'TEXT', notNull: true },
          { name: 'language', type: 'TEXT', notNull: true },
          { name: 'file_path', type: 'TEXT', notNull: true },
          { name: 'file_size', type: 'INTEGER', notNull: true },
          { name: 'cover_image', type: 'TEXT' },
          { name: 'is_dominican', type: 'INTEGER', notNull: true, defaultValue: 0 },
          { name: 'requires_login', type: 'INTEGER', notNull: true, defaultValue: 1 },
          { name: 'tags', type: 'TEXT', notNull: true },
        ],
      },
      // Community Tables
      {
        name: 'provinces',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'country', type: 'TEXT', notNull: true },
          { name: 'region', type: 'TEXT', notNull: true },
          { name: 'latitude', type: 'REAL', notNull: true },
          { name: 'longitude', type: 'REAL', notNull: true },
          { name: 'description', type: 'TEXT', notNull: true },
          { name: 'website', type: 'TEXT' },
          { name: 'contact_info', type: 'TEXT', notNull: true },
          { name: 'statistics', type: 'TEXT', notNull: true },
        ],
      },
      // Preaching Tables
      {
        name: 'reflections',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'title', type: 'TEXT', notNull: true },
          { name: 'author', type: 'TEXT', notNull: true },
          { name: 'content', type: 'TEXT', notNull: true },
          { name: 'date', type: 'TEXT', notNull: true },
          { name: 'liturgical_date', type: 'TEXT' },
          { name: 'tags', type: 'TEXT', notNull: true },
          { name: 'is_dominican', type: 'INTEGER', notNull: true, defaultValue: 0 },
          { name: 'audio_url', type: 'TEXT' },
          { name: 'requires_subscription', type: 'INTEGER', notNull: true, defaultValue: 0 },
        ],
      },
      {
        name: 'blog_posts',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'title', type: 'TEXT', notNull: true },
          { name: 'author', type: 'TEXT', notNull: true },
          { name: 'content', type: 'TEXT', notNull: true },
          { name: 'excerpt', type: 'TEXT', notNull: true },
          { name: 'publish_date', type: 'TEXT', notNull: true },
          { name: 'tags', type: 'TEXT', notNull: true },
          { name: 'category', type: 'TEXT', notNull: true },
          { name: 'image_url', type: 'TEXT' },
          { name: 'is_dominican', type: 'INTEGER', notNull: true, defaultValue: 0 },
        ],
      },
      // User Tables
      {
        name: 'users',
        columns: [
          { name: 'id', type: 'TEXT', primaryKey: true },
          { name: 'email', type: 'TEXT', notNull: true, unique: true },
          { name: 'name', type: 'TEXT', notNull: true },
          { name: 'role', type: 'TEXT', notNull: true },
          { name: 'subscription', type: 'TEXT', notNull: true },
          { name: 'preferences', type: 'TEXT', notNull: true },
          { name: 'created_at', type: 'TEXT', notNull: true },
          { name: 'last_login', type: 'TEXT', notNull: true },
        ],
      },
      {
        name: 'user_preferences',
        columns: [
          { name: 'user_id', type: 'TEXT', primaryKey: true },
          { name: 'language', type: 'TEXT', notNull: true, defaultValue: 'en' },
          { name: 'theme', type: 'TEXT', notNull: true, defaultValue: 'LIGHT' },
          { name: 'notifications', type: 'TEXT', notNull: true },
          { name: 'prayer_reminders', type: 'TEXT', notNull: true },
          { name: 'favorite_saints', type: 'TEXT', notNull: true },
          { name: 'favorite_books', type: 'TEXT', notNull: true },
        ],
      },
    ];

    for (const table of tables) {
      await this.createTable(table);
    }
  }

  private async createTable(tableSchema: TableSchema): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const columns = tableSchema.columns
      .map(col => {
        let definition = `${col.name} ${col.type}`;
        if (col.primaryKey) definition += ' PRIMARY KEY';
        if (col.autoIncrement) definition += ' AUTOINCREMENT';
        if (col.notNull) definition += ' NOT NULL';
        if (col.unique) definition += ' UNIQUE';
        if (col.defaultValue !== undefined) {
          if (typeof col.defaultValue === 'string') {
            definition += ` DEFAULT '${col.defaultValue}'`;
          } else {
            definition += ` DEFAULT ${col.defaultValue}`;
          }
        }
        return definition;
      })
      .join(', ');

    const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableSchema.name} (${columns})`;
    
    try {
      await this.db.execAsync(createTableSQL);
      
      // Create indexes if specified
      if (tableSchema.indexes) {
        for (const index of tableSchema.indexes) {
          const indexSQL = `CREATE INDEX IF NOT EXISTS ${index.name} ON ${tableSchema.name} (${index.columns.join(', ')})`;
          await this.db.execAsync(indexSQL);
        }
      }
    } catch (error) {
      console.error(`Error creating table ${tableSchema.name}:`, error);
      throw error;
    }
  }

  private async seedInitialData(): Promise<void> {
    // This would be populated with initial liturgical data, saints, etc.
    // For now, we'll create a placeholder
    console.log('Initial data seeding completed');
  }

  // Generic query methods
  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    try {
      const result = await this.db.getAllAsync(sql, params);
      return result as T[];
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async execute(sql: string, params: any[] = []): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    try {
      await this.db.execAsync(sql, params);
    } catch (error) {
      console.error('Execute error:', error);
      throw error;
    }
  }

  async getFirst<T>(sql: string, params: any[] = []): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
  }

  // Close database connection
  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
