import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Contact } from './App';

const { width } = Dimensions.get('window');

const COLORS = {
  text: '#E7E7E4',
  accent: '#D9D9D2',
  muted: '#A8A8A2',
  card: '#2F2F2F',
  border: '#4A4A4A',
};

type Props = {
  contact: Contact;
  onPress: () => void;
};

// Reusable component – renders one contact row in the FlatList
export default function ContactCard({ contact, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      {/* Icon circle */}
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name={contact.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={22}
          color={COLORS.accent}
        />
      </View>

      {/* Text info */}
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.role}>{contact.role}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>

      {/* Chevron */}
      <Ionicons name="chevron-forward" size={18} color={COLORS.muted} style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
    // Responsive width – card takes almost full width on any screen
    width: width - 32,
    shadowOpacity: 0,
    elevation: 0,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  role: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 2,
  },
  phone: {
    fontSize: 11,
    color: COLORS.accent,
  },
  chevron: {
    marginLeft: 8,
  },
});