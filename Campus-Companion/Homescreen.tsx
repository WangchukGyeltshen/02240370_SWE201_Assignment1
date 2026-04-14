import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabParamList } from './App';

const { width } = Dimensions.get('window');

type Props = {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Home'>;
};

const COLORS = {
  background: '#0A0B0D',
  hero: '#2D2D2D',
  card: '#2F2F2F',
  border: '#4A4A4A',
  text: '#E7E7E4',
  subtext: '#A8A8A2',
  accent: '#D9D9D2',
  success: '#4CAF50',
  notice: '#F57C32',
};

const QUICK_CARDS = [
  {
    label: 'Contacts',
    tab: 'Contacts' as keyof BottomTabParamList,
    icon: 'people-outline' as keyof typeof Ionicons.glyphMap,
    desc: 'Helpdesk & services',
  },
  {
    label: 'Schedule',
    tab: 'Schedule' as keyof BottomTabParamList,
    icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
    desc: 'Weekly class timetable',
  },
  {
    label: 'Notices',
    tab: 'Notices' as keyof BottomTabParamList,
    icon: 'notifications-outline' as keyof typeof Ionicons.glyphMap,
    desc: '3 new announcements',
  },
  {
    label: 'About CST',
    icon: 'globe-outline' as keyof typeof Ionicons.glyphMap,
    desc: 'Rinchending, Phuentsholing',
  },
];

const TODAY_SCHEDULE = [
  { time: '8:00', subject: 'Data Structures' },
  { time: '10:00', subject: 'Software Design' },
  { time: '14:00', subject: 'Networks Lab' },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={[styles.root, { backgroundColor: COLORS.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

      {/* Hero */}
      <View style={styles.banner}>
        <Text style={styles.collegeLine}>CST · ROYAL UNIVERSITY OF BHUTAN</Text>
        <Text style={styles.appTitle}>Campus Companion</Text>
        <Text style={styles.appSub}>Year 3 · Software Engineering</Text>
      </View>

      {/* Quick Access */}
      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.cardGrid}>
        {QUICK_CARDS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.navCard, { width: (width - 44) / 2 }]}
            onPress={() => item.tab && navigation.navigate(item.tab)}
            activeOpacity={0.8}
          >
            <View style={styles.iconRow}>
              <Ionicons name={item.icon} size={24} color={COLORS.accent} style={styles.navCardIcon} />
              {item.label === 'Notices' && <View style={styles.noticeDot} />}
            </View>
            <Text style={styles.navCardLabel}>{item.label}</Text>
            <Text style={styles.navCardDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Today */}
      <View style={styles.todayCard}>
        <Text style={styles.todayTitle}>TODAY</Text>
        {TODAY_SCHEDULE.map((item) => (
          <View key={item.time} style={styles.todayRow}>
            <Text style={styles.timeText}>{item.time}</Text>
            <View style={styles.timeLine} />
            <Text style={styles.subjectText}>{item.subject}</Text>
          </View>
        ))}
      </View>

      {/* Bottom padding for tab bar */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 36,
  },

  // Hero
  banner: {
    paddingTop: Platform.OS === 'ios' ? 48 : 28,
    paddingHorizontal: 18,
    paddingBottom: 22,
    backgroundColor: COLORS.hero,
  },
  collegeLine: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 8,
    color: COLORS.subtext,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 38,
    marginBottom: 8,
    color: COLORS.text,
  },
  appSub: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    color: COLORS.subtext,
  },
  // Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 14,
    marginHorizontal: 16,
    color: COLORS.subtext,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  // Nav cards grid
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  navCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    minHeight: 138,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  navCardIcon: {
    marginBottom: 0,
  },
  noticeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.notice,
    marginLeft: 6,
    marginTop: -8,
  },
  navCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: COLORS.text,
  },
  navCardDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.subtext,
  },

  // Today card
  todayCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  todayTitle: {
    color: COLORS.subtext,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  todayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeText: {
    width: 46,
    color: COLORS.subtext,
    fontSize: 15,
    fontWeight: '600',
  },
  timeLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#565656',
    marginHorizontal: 12,
  },
  subjectText: {
    width: 140,
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
});