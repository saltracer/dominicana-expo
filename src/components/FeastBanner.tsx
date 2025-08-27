import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { LiturgicalDate, Saint } from '../types';
import { COLORS } from '../constants/colors';
import { TEXT_STYLES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import liturgicalCalendarService from '../services/liturgicalCalendar';
import { useTheme } from '../context/ThemeContext';

interface FeastBannerProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  showDatePicker?: boolean;
}

const FeastBanner: React.FC<FeastBannerProps> = ({
  selectedDate,
  onDateChange,
  showDatePicker = true,
}) => {
  const [liturgicalDate, setLiturgicalDate] = useState<LiturgicalDate | null>(null);
  const [saints, setSaints] = useState<Saint[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    loadLiturgicalData();
  }, [selectedDate]);

  const loadLiturgicalData = async () => {
    try {
      setLoading(true);
      const date = selectedDate || new Date();
      const liturgical = await liturgicalCalendarService.getLiturgicalDate(date);
      const saintsForDate = await liturgicalCalendarService.getSaintsForDate(date);
      
      setLiturgicalDate(liturgical);
      setSaints(saintsForDate);
    } catch (error) {
      console.error('Error loading liturgical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDatePress = () => {
    if (showDatePicker) {
      setIsDatePickerVisible(true);
    }
  };

  const handleDateSelect = (day: any) => {
    setIsDatePickerVisible(false);
    const selectedDate = new Date(day.timestamp);
    onDateChange?.(selectedDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCalendarTheme = () => ({
    backgroundColor: colors.CARD_BACKGROUND,
    calendarBackground: colors.CARD_BACKGROUND,
    textSectionTitleColor: colors.TEXT,
    selectedDayBackgroundColor: colors.PRIMARY,
    selectedDayTextColor: colors.TEXT_WHITE,
    todayTextColor: colors.PRIMARY,
    dayTextColor: colors.TEXT,
    textDisabledColor: colors.TEXT_LIGHT,
    dotColor: colors.ACCENT,
    selectedDotColor: colors.TEXT_WHITE,
    arrowColor: colors.PRIMARY,
    monthTextColor: colors.TEXT,
    indicatorColor: colors.PRIMARY,
    textDayFontWeight: '400' as const,
    textMonthFontWeight: 'bold' as const,
    textDayHeaderFontWeight: '500' as const,
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
  });

  if (loading || !liturgicalDate) {
    return (
      <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.TEXT_LIGHT }]}>Loading liturgical information...</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { 
            backgroundColor: colors.BACKGROUND,
            borderTopColor: colors.BORDER,
          },
        ]}
        activeOpacity={1}
      >
        <View style={styles.content}>
          <View style={styles.dateSection}>
            <Text style={[styles.dateText, { color: colors.TEXT }]}>
              {formatDate(selectedDate || new Date())}
            </Text>
            <Text style={[styles.seasonText, { color: colors.TEXT_LIGHT }]}>
              {liturgicalDate.liturgicalSeason.name}
            </Text>
          </View>

          <View style={styles.feastSection}>
            {liturgicalDate.feastDay ? (
              <View style={styles.feastInfo}>
                <Text style={[styles.feastName, { color: colors.TEXT }]}>
                  {liturgicalDate.feastDay.name}
                </Text>
                {liturgicalDate.isDominicanFeast && (
                  <View style={[styles.dominicanBadge, { backgroundColor: colors.ACCENT_TRANSPARENT }]}>
                    <Ionicons name="star" size={12} color={colors.ACCENT} />
                    <Text style={[styles.dominicanText, { color: colors.ACCENT }]}>Dominican</Text>
                  </View>
                )}
              </View>
            ) : (
              <Text style={[styles.ordinaryDayText, { color: colors.TEXT_LIGHT }]}>
                {liturgicalDate.dayOfWeek} in {liturgicalDate.liturgicalSeason.name}
              </Text>
            )}
          </View>

          {saints.length > 0 && (
            <View style={styles.saintsSection}>
              <Text style={[styles.saintsLabel, { color: colors.TEXT_LIGHT }]}>Saints:</Text>
              <Text style={[styles.saintsText, { color: colors.TEXT }]}>
                {saints.map(saint => saint.name).join(', ')}
              </Text>
            </View>
          )}

          {showDatePicker && (
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setIsDatePickerVisible(true)}
            >
              <Ionicons name="calendar" size={20} color={colors.PRIMARY} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Liturgical Color Bar */}
        <View style={[styles.colorBar, { backgroundColor: liturgicalDate.liturgicalColor }]} />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <Modal
        visible={isDatePickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDatePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity
                onPress={() => setIsDatePickerVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={COLORS.TEXT} />
              </TouchableOpacity>
            </View>
            
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [selectedDate?.toISOString().split('T')[0] || '']: {
                  selected: true,
                  selectedColor: colors.PRIMARY,
                }
              }}
              theme={getCalendarTheme()}
              style={styles.calendar}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginTop: SPACING.XS,
    marginBottom: 0, // Flush against menu bar
    borderRadius: 0, // Edge to edge
    borderTopWidth: 1,
    ...SPACING.SHADOW_SM,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.CARD_PADDING,
    paddingVertical: SPACING.SM,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...TEXT_STYLES.BODY,
    color: COLORS.TEXT_LIGHT,
  },
  dateSection: {
    flex: 1,
    marginRight: SPACING.MD,
  },
  dateText: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_WHITE,
    marginBottom: SPACING.XS,
  },
  seasonText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_WHITE,
    opacity: 0.9,
  },
  feastSection: {
    flex: 2,
    marginRight: SPACING.MD,
  },
  feastInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  feastName: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_WHITE,
    marginRight: SPACING.SM,
  },
  dominicanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ACCENT_TRANSPARENT,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.BORDER_RADIUS_SM,
  },
  dominicanText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.ACCENT,
    marginLeft: SPACING.XS,
    fontWeight: 'bold',
  },
  ordinaryDayText: {
    ...TEXT_STYLES.BODY,
    color: COLORS.TEXT_WHITE,
    opacity: 0.9,
  },
  saintsSection: {
    flex: 1,
  },
  saintsLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_WHITE,
    opacity: 0.8,
    marginBottom: SPACING.XS,
  },
  saintsText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_WHITE,
    opacity: 0.9,
  },
  datePickerButton: {
    padding: SPACING.SM,
  },
  colorBar: {
    height: 4,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.OVERLAY,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderTopLeftRadius: SPACING.BORDER_RADIUS_XL,
    borderTopRightRadius: SPACING.BORDER_RADIUS_XL,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.CARD_PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  modalTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT,
  },
  closeButton: {
    padding: SPACING.XS,
  },
  calendar: {
    marginBottom: SPACING.MD,
  },
});

export default FeastBanner;
