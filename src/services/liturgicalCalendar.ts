import { LiturgicalDate, LiturgicalSeason, FeastDay, Saint } from '../types';
import { COLORS } from '../constants/colors';
import databaseService from './database';

class LiturgicalCalendarService {
  private readonly SEASONS: LiturgicalSeason[] = [
    {
      id: 'advent',
      name: 'Advent',
      color: COLORS.ADVENT,
      startDate: '2024-12-01',
      endDate: '2024-12-24',
      description: 'A time of preparation for the coming of Christ',
    },
    {
      id: 'christmas',
      name: 'Christmas',
      color: COLORS.CHRISTMAS,
      startDate: '2024-12-25',
      endDate: '2025-01-05',
      description: 'Celebration of the birth of Jesus Christ',
    },
    {
      id: 'ordinary_time_1',
      name: 'Ordinary Time',
      color: COLORS.ORDINARY_TIME,
      startDate: '2025-01-06',
      endDate: '2025-03-04',
      description: 'The first period of Ordinary Time',
    },
    {
      id: 'lent',
      name: 'Lent',
      color: COLORS.LENT,
      startDate: '2025-03-05',
      endDate: '2025-04-19',
      description: 'A time of penance and preparation for Easter',
    },
    {
      id: 'easter',
      name: 'Easter',
      color: COLORS.EASTER,
      startDate: '2025-04-20',
      endDate: '2025-06-07',
      description: 'Celebration of the Resurrection of Christ',
    },
    {
      id: 'ordinary_time_2',
      name: 'Ordinary Time',
      color: COLORS.ORDINARY_TIME,
      startDate: '2025-06-08',
      endDate: '2024-11-30',
      description: 'The second period of Ordinary Time',
    },
  ];

  // Calculate Easter Sunday using Meeus/Jones/Butcher algorithm
  private calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    
    return new Date(year, month - 1, day);
  }

  // Get liturgical date for a specific date
  async getLiturgicalDate(date: Date): Promise<LiturgicalDate> {
    const dateString = date.toISOString().split('T')[0];
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Get liturgical season
    const season = this.getLiturgicalSeason(date);
    
    // Get feast day if any
    const feastDay = await this.getFeastDay(date);
    
    // Determine liturgical color
    const liturgicalColor = this.getLiturgicalColor(date, season, feastDay);
    
    return {
      date: dateString,
      dayOfWeek,
      liturgicalSeason: season,
      liturgicalColor,
      feastDay,
      isDominicanFeast: feastDay?.isDominican || false,
      isMovableFeast: this.isMovableFeast(date),
    };
  }

  // Get liturgical season for a date
  private getLiturgicalSeason(date: Date): LiturgicalSeason {
    const dateString = date.toISOString().split('T')[0];
    const year = date.getFullYear();
    
    // Calculate movable feasts for the year
    const easter = this.calculateEaster(year);
    const ashWednesday = new Date(easter.getTime() - (46 * 24 * 60 * 60 * 1000));
    const pentecost = new Date(easter.getTime() + (49 * 24 * 60 * 60 * 1000));
    
    // Define seasons with movable dates
    const seasons: LiturgicalSeason[] = [
      {
        id: 'advent',
        name: 'Advent',
        color: COLORS.ADVENT,
        startDate: `${year}-12-01`,
        endDate: `${year}-12-24`,
        description: 'A time of preparation for the coming of Christ',
      },
      {
        id: 'christmas',
        name: 'Christmas',
        color: COLORS.CHRISTMAS,
        startDate: `${year}-12-25`,
        endDate: `${year + 1}-01-05`,
        description: 'Celebration of the birth of Jesus Christ',
      },
      {
        id: 'ordinary_time_1',
        name: 'Ordinary Time',
        color: COLORS.ORDINARY_TIME,
        startDate: `${year + 1}-01-06`,
        endDate: ashWednesday.toISOString().split('T')[0],
        description: 'The first period of Ordinary Time',
      },
      {
        id: 'lent',
        name: 'Lent',
        color: COLORS.LENT,
        startDate: ashWednesday.toISOString().split('T')[0],
        endDate: new Date(easter.getTime() - (24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        description: 'A time of penance and preparation for Easter',
      },
      {
        id: 'easter',
        name: 'Easter',
        color: COLORS.EASTER,
        startDate: easter.toISOString().split('T')[0],
        endDate: new Date(pentecost.getTime() - (24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        description: 'Celebration of the Resurrection of Christ',
      },
      {
        id: 'ordinary_time_2',
        name: 'Ordinary Time',
        color: COLORS.ORDINARY_TIME,
        startDate: pentecost.toISOString().split('T')[0],
        endDate: `${year}-11-30`,
        description: 'The second period of Ordinary Time',
      },
    ];
    
    // Find the season for the given date
    for (const season of seasons) {
      if (dateString >= season.startDate && dateString <= season.endDate) {
        return season;
      }
    }
    
    // Default to Ordinary Time if no season found
    return seasons[2]; // Ordinary Time 1
  }

  // Get feast day for a date
  private async getFeastDay(date: Date): Promise<FeastDay | undefined> {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    try {
      const feastDay = await databaseService.getFirst<FeastDay>(
        'SELECT * FROM feast_days WHERE date = ?',
        [dateString]
      );
      
      if (feastDay) {
        // Get associated saint if any
        if (feastDay.saint_id) {
          const saint = await databaseService.getFirst<Saint>(
            'SELECT * FROM saints WHERE id = ?',
            [feastDay.saint_id]
          );
          if (saint) {
            feastDay.saint = saint;
          }
        }
      }
      
      return feastDay || undefined;
    } catch (error) {
      console.error('Error getting feast day:', error);
      return undefined;
    }
  }

  // Determine liturgical color for a date
  private getLiturgicalColor(date: Date, season: LiturgicalSeason, feastDay?: FeastDay): string {
    // If there's a feast day with a specific color, use it
    if (feastDay?.liturgicalColor) {
      return feastDay.liturgicalColor;
    }
    
    // Use season color as default
    return season.color;
  }

  // Check if date is a movable feast
  private isMovableFeast(date: Date): boolean {
    const year = date.getFullYear();
    const easter = this.calculateEaster(year);
    
    // Define movable feasts relative to Easter
    const movableFeasts = [
      easter, // Easter Sunday
      new Date(easter.getTime() - (7 * 24 * 60 * 60 * 1000)), // Palm Sunday
      new Date(easter.getTime() + (7 * 24 * 60 * 60 * 1000)), // Divine Mercy Sunday
      new Date(easter.getTime() + (40 * 24 * 60 * 60 * 1000)), // Ascension
      new Date(easter.getTime() + (49 * 24 * 60 * 60 * 1000)), // Pentecost
      new Date(easter.getTime() + (60 * 24 * 60 * 60 * 1000)), // Corpus Christi
    ];
    
    const dateString = date.toISOString().split('T')[0];
    return movableFeasts.some(feast => 
      feast.toISOString().split('T')[0] === dateString
    );
  }

  // Get liturgical dates for a range
  async getLiturgicalDates(startDate: Date, endDate: Date): Promise<LiturgicalDate[]> {
    const dates: LiturgicalDate[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const liturgicalDate = await this.getLiturgicalDate(new Date(currentDate));
      dates.push(liturgicalDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }

  // Get today's liturgical date
  async getTodayLiturgicalDate(): Promise<LiturgicalDate> {
    return this.getLiturgicalDate(new Date());
  }

  // Get upcoming feast days
  async getUpcomingFeastDays(limit: number = 10): Promise<FeastDay[]> {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const currentDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      const feastDays = await databaseService.query<FeastDay>(
        `SELECT * FROM feast_days 
         WHERE date >= ? 
         ORDER BY date ASC 
         LIMIT ?`,
        [currentDate, limit]
      );
      
      return feastDays;
    } catch (error) {
      console.error('Error getting upcoming feast days:', error);
      return [];
    }
  }

  // Get Dominican feast days
  async getDominicanFeastDays(): Promise<FeastDay[]> {
    try {
      const feastDays = await databaseService.query<FeastDay>(
        'SELECT * FROM feast_days WHERE is_dominican = 1 ORDER BY date ASC'
      );
      
      return feastDays;
    } catch (error) {
      console.error('Error getting Dominican feast days:', error);
      return [];
    }
  }

  // Get saints for a specific date
  async getSaintsForDate(date: Date): Promise<Saint[]> {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    try {
      const saints = await databaseService.query<Saint>(
        'SELECT * FROM saints WHERE feast_day = ? ORDER BY name ASC',
        [dateString]
      );
      
      return saints;
    } catch (error) {
      console.error('Error getting saints for date:', error);
      return [];
    }
  }

  // Get all saints
  async getAllSaints(): Promise<Saint[]> {
    try {
      const saints = await databaseService.query<Saint>(
        'SELECT * FROM saints ORDER BY name ASC'
      );
      
      return saints;
    } catch (error) {
      console.error('Error getting all saints:', error);
      return [];
    }
  }

  // Get Dominican saints
  async getDominicanSaints(): Promise<Saint[]> {
    try {
      const saints = await databaseService.query<Saint>(
        'SELECT * FROM saints WHERE is_dominican = 1 ORDER BY name ASC'
      );
      
      return saints;
    } catch (error) {
      console.error('Error getting Dominican saints:', error);
      return [];
    }
  }

  // Search saints by name
  async searchSaints(query: string): Promise<Saint[]> {
    try {
      const saints = await databaseService.query<Saint>(
        'SELECT * FROM saints WHERE name LIKE ? ORDER BY name ASC',
        [`%${query}%`]
      );
      
      return saints;
    } catch (error) {
      console.error('Error searching saints:', error);
      return [];
    }
  }
}

// Export singleton instance
export const liturgicalCalendarService = new LiturgicalCalendarService();
export default liturgicalCalendarService;
