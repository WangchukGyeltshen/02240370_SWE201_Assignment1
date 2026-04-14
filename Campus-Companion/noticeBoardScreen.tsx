import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Notice = {
  id: string;
  title: string;
  body: string;
  date: string;
  category: 'Academic' | 'Event' | 'Admin' | 'Urgent';
  icon: keyof typeof Ionicons.glyphMap;
};

const NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Mid-Semester Exam Timetable Published',
    body: 'The mid-semester exam schedule for all Year 3 modules is now available on the department notice board and LMS.',
    date: '2026-04-10',
    category: 'Academic',
    icon: 'document-text-outline',
  },
  {
    id: 'n2',
    title: 'Guest Talk: AI in Healthcare',
    body: 'Join us on Friday at 2:00 PM in Auditorium Hall for an industry guest talk on modern AI applications.',
    date: '2026-04-11',
    category: 'Event',
    icon: 'megaphone-outline',
  },
  {
    id: 'n3',
    title: 'Hostel Water Supply Interruption',
    body: 'Water supply in Hostel Block B will be interrupted from 10:00 AM to 1:00 PM due to maintenance work.',
    date: '2026-04-12',
    category: 'Urgent',
    icon: 'alert-circle-outline',
  },
  {
    id: 'n4',
    title: 'Library Extended Hours',
    body: 'From next week, the library will remain open until 9:00 PM on weekdays during exam preparation period.',
    date: '2026-04-13',
    category: 'Admin',
    icon: 'library-outline',
  },
  {
    id: 'n5',
    title: 'Capstone Proposal Submission Deadline',
    body: 'Final-year students must submit capstone project proposals by April 25 through the project portal.',
    date: '2026-04-14',
    category: 'Academic',
    icon: 'attach-outline',
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

// Category colours (dynamic style based on notice type)
const CAT_COLORS: Record<Notice['category'], { bg: string; text: string; border: string }> = {
  Academic: { bg: '#3A3A3A', text: '#D9D9D2', border: '#D9D9D2' },
  Event:    { bg: '#393939', text: '#D9D9D2', border: '#D9D9D2' },
  Admin:    { bg: '#383838', text: '#D9D9D2', border: '#D9D9D2' },
  Urgent:   { bg: '#373737', text: '#D9D9D2', border: '#D9D9D2' },
};

const CATEGORIES: (Notice['category'] | 'All')[] = ['All', 'Academic', 'Event', 'Admin', 'Urgent'];

export default function NoticeBoardScreen() {
  const [activeCategory, setActiveCategory] = useState<Notice['category'] | 'All'>('All');

  // Filter by selected category (dynamic style on filter chips)
  const filtered =
    activeCategory === 'All'
      ? NOTICES
      : NOTICES.filter((n) => n.category === activeCategory);

  const renderNotice = ({ item }: { item: Notice }) => {
    const colors = CAT_COLORS[item.category];
    return (
      <View style={[styles.card, { borderLeftColor: colors.border }]}>
        {/* Card header */}
        <View style={styles.cardHeader}>
          <Ionicons name={item.icon} size={18} color={COLORS.accent} style={styles.cardIcon} />
          <View style={[styles.categoryBadge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.categoryText, { color: colors.text }]}>
              {item.category}
            </Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        {/* Title & body */}
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardBody}>{item.body}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ── Category filter chips (horizontal scroll) ─────── */}
      <View style={styles.filterWrapper}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const colors = cat !== 'All' ? CAT_COLORS[cat] : null;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                isActive && {
                  backgroundColor: colors ? colors.bg : '#3A3A3A',
                  borderColor: colors ? colors.border : '#D9D9D2',
                },
              ]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive && { color: colors ? colors.text : '#D9D9D2', fontWeight: '700' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Notices FlatList ───────────────────────────────── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderNotice}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No notices in this category.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Filter chips
  filterWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: COLORS.card,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '500',
  },

  // Notice list
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Notice card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLORS.border,
    borderRightColor: COLORS.border,
    borderBottomColor: COLORS.border,
    // Responsive width
    width: width - 32,
    shadowOpacity: 0,
    elevation: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  cardIcon: {
    marginTop: 1,
  },
  categoryBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    color: COLORS.muted,
    marginLeft: 'auto',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 20,
  },

  // Empty state
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.muted,
  },
});