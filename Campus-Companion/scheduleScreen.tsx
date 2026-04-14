import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ClassSlot = {
  id: string;
  time: string;
  subject: string;
  code: string;
  room: string;
  lecturer: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
};

type DaySchedule = {
  day: string;
  slots: ClassSlot[];
};

const SCHEDULE: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      {
        id: 'mon-1',
        time: '09:00 - 10:30',
        subject: 'Software Engineering',
        code: 'SWE201',
        room: 'LT-4',
        lecturer: 'Pema Dorji',
        type: 'Lecture',
      },
      {
        id: 'mon-2',
        time: '11:00 - 12:30',
        subject: 'Database Systems',
        code: 'CS204',
        room: 'CL-2',
        lecturer: 'Sonam Choden',
        type: 'Lab',
      },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      {
        id: 'tue-1',
        time: '10:00 - 11:30',
        subject: 'Computer Networks',
        code: 'CS206',
        room: 'LT-2',
        lecturer: 'Kinzang Dema',
        type: 'Lecture',
      },
      {
        id: 'tue-2',
        time: '14:00 - 15:30',
        subject: 'Human Computer Interaction',
        code: 'SWE205',
        room: 'LT-5',
        lecturer: 'Tandin Wangchuk',
        type: 'Tutorial',
      },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      {
        id: 'wed-1',
        time: '09:00 - 10:30',
        subject: 'Mobile App Development',
        code: 'SWE209',
        room: 'CL-1',
        lecturer: 'Ugyen Tshering',
        type: 'Lab',
      },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      {
        id: 'thu-1',
        time: '08:30 - 10:00',
        subject: 'Project Management',
        code: 'SWE207',
        room: 'LT-3',
        lecturer: 'Deki Lham',
        type: 'Lecture',
      },
      {
        id: 'thu-2',
        time: '10:30 - 12:00',
        subject: 'Database Systems',
        code: 'CS204',
        room: 'LT-1',
        lecturer: 'Sonam Choden',
        type: 'Tutorial',
      },
    ],
  },
  {
    day: 'Friday',
    slots: [
      {
        id: 'fri-1',
        time: '09:00 - 10:30',
        subject: 'Software Engineering',
        code: 'SWE201',
        room: 'LT-4',
        lecturer: 'Pema Dorji',
        type: 'Tutorial',
      },
    ],
  },
  {
    day: 'Saturday',
    slots: [],
  },
  {
    day: 'Sunday',
    slots: [],
  },
];

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#0A0B0D',
  text: '#E7E7E4',
  accent: '#D9D9D2',
  muted: '#A8A8A2',
  card: '#2F2F2F',
  border: '#4A4A4A',
};

// Badge colour by class type (dynamic style)
const TYPE_COLORS: Record<ClassSlot['type'], { bg: string; text: string }> = {
  Lecture: { bg: '#2D2D2D', text: '#A8A8A2' },
  Lab:     { bg: '#2B4E74', text: '#8BC0FF' },
  Tutorial:{ bg: '#324642', text: '#99D3BE' },
};

const VISIBLE_DAYS = SCHEDULE.filter((d) => d.day !== 'Sunday');

// Get today's day name to pre-select
function todayName(): string {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][
    new Date().getDay()
  ];
}

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(todayName());

  const dayData = SCHEDULE.find((d) => d.day === selectedDay);

  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <Text style={styles.screenTitle}>Schedule</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayBar}
        >
          {VISIBLE_DAYS.map((d) => {
            const isSelected = d.day === selectedDay;
            return (
              <TouchableOpacity
                key={d.day}
                style={[styles.dayBtn, isSelected && styles.dayBtnActive]}
                onPress={() => setSelectedDay(d.day)}
                activeOpacity={0.75}
              >
                <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
                  {d.day.slice(0, 3)}
                </Text>
                <View style={[styles.dot, isSelected && styles.dotActive]} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.classList} showsVerticalScrollIndicator={false}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayFull}>{selectedDay}</Text>
          <Text style={styles.slotCount}>
            {dayData?.slots.length ?? 0} class{dayData?.slots.length !== 1 ? 'es' : ''}
          </Text>
        </View>

        {dayData?.slots.length === 0 && (
          <View style={styles.noClass}>
            <Ionicons name="checkmark-circle-outline" size={48} color={COLORS.accent} style={styles.noClassIcon} />
            <Text style={styles.noClassText}>No classes today!</Text>
            <Text style={styles.noClassSub}>Enjoy your free day.</Text>
          </View>
        )}

        {dayData?.slots.map((slot) => {
          const colors = TYPE_COLORS[slot.type];
          const [startTime, endTime] = slot.time.split(/[-–]/).map((value) => value.trim());
          return (
            <View key={slot.id} style={styles.slotCard}>
              {/* Time column */}
              <View style={styles.timeCol}>
                <Text style={styles.timeText}>{startTime}</Text>
                <View style={styles.timeLine} />
                <Text style={styles.timeText}>{endTime}</Text>
              </View>

              {/* Info column */}
              <View style={[styles.infoCol, { width: width - 120 }]}>
                {/* Type badge – dynamic style based on class type */}
                <View style={[styles.badge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.badgeText, { color: colors.text }]}>
                    {slot.type}
                  </Text>
                </View>
                <Text style={styles.subjectName}>{slot.subject}</Text>
                <Text style={styles.subjectCode}>{slot.code}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={12} color={COLORS.muted} />
                    <Text style={styles.metaText}>{slot.room}</Text>
                  </View>
                  <Text style={styles.metaDot}> · </Text>
                  <View style={styles.metaItem}>
                    <Ionicons name="person-outline" size={12} color={COLORS.muted} />
                    <Text style={styles.metaText}>{slot.lecturer}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  topPanel: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingTop: 14,
    paddingBottom: 8,
  },
  screenTitle: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 10,
  },

  // Day selector bar
  dayBar: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  dayBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    minWidth: 60,
    marginHorizontal: 4,
    shadowOpacity: 0,
    elevation: 0,
  },
  dayBtnActive: {
    backgroundColor: '#EFEFE9',
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  dayLabelActive: {
    color: '#2E2E2E',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.muted,
    marginTop: 4,
  },
  dotActive: {
    backgroundColor: '#2E2E2E',
  },

  // Day header
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  dayFull: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  slotCount: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '600',
  },

  // Class list
  classList: {
    paddingHorizontal: 12,
    paddingTop: 2,
    paddingBottom: 28,
  },

  // No class placeholder
  noClass: {
    alignItems: 'center',
    marginTop: 60,
  },
  noClassIcon: {
    marginBottom: 12,
  },
  noClassText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  noClassSub: {
    fontSize: 14,
    color: COLORS.muted,
  },

  // Slot card
  slotCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
    shadowOpacity: 0,
    elevation: 0,
  },
  timeCol: {
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252525',
    paddingVertical: 18,
    paddingHorizontal: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    textAlign: 'center',
  },
  timeLine: {
    width: 1,
    height: 22,
    backgroundColor: '#6B6B6B',
    borderRadius: 1,
    marginVertical: 4,
  },
  infoCol: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#585858',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 3,
  },
  subjectCode: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '600',
    marginBottom: 9,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 10,
    color: COLORS.muted,
  },
  metaDot: {
    color: '#808080',
    fontSize: 11,
  },
});