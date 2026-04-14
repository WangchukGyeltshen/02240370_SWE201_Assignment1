import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './App';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#0A0B0D',
  text: '#E7E7E4',
  accent: '#D9D9D2',
  muted: '#A8A8A2',
  card: '#2F2F2F',
  border: '#4A4A4A',
};

type Props = StackScreenProps<RootStackParamList, 'ContactDetail'>;

// Row for each detail field
function DetailRow({ icon, label, value, onPress }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <Ionicons name={icon} size={18} color={COLORS.accent} style={styles.rowIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, onPress && styles.rowLink]}>{value}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={18} color={COLORS.muted} style={styles.rowChevron} />}
    </TouchableOpacity>
  );
}

export default function ContactDetailScreen({ route }: Props) {
  // Receiving parameters from ContactsScreen (param passing requirement)
  const { contact } = route.params;

  const callPhone = () => {
    Linking.openURL(`tel:${contact.phone}`).catch(() =>
      Alert.alert('Error', 'Unable to open dialler.')
    );
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:${contact.email}`).catch(() =>
      Alert.alert('Error', 'Unable to open mail app.')
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero card */}
      <View style={styles.hero}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name={contact.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={34}
            color={COLORS.accent}
          />
        </View>
        <Text style={styles.heroName}>{contact.name}</Text>
        <Text style={styles.heroRole}>{contact.role}</Text>
      </View>

      {/* Detail rows */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>

        <DetailRow
          icon="call-outline"
          label="Phone"
          value={contact.phone}
          onPress={callPhone}
        />
        <View style={styles.divider} />

        <DetailRow
          icon="mail-outline"
          label="Email"
          value={contact.email}
          onPress={sendEmail}
        />
        <View style={styles.divider} />

        <DetailRow
          icon="location-outline"
          label="Office Location"
          value={contact.office}
        />
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnCall]} onPress={callPhone}>
          <View style={styles.btnInner}>
            <Ionicons name="call-outline" size={16} color="#fff" />
            <Text style={styles.btnText}>Call Now</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnEmail]} onPress={sendEmail}>
          <View style={styles.btnInner}>
            <Ionicons name="mail-outline" size={16} color="#fff" />
            <Text style={styles.btnText}>Send Email</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Hero section
  hero: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  heroRole: {
    fontSize: 13,
    color: COLORS.muted,
  },

  // Detail card
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 6,
    // Responsive width
    width: width - 32,
    shadowOpacity: 0,
    elevation: 0,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowIcon: {
    marginRight: 14,
  },
  rowLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  rowLink: {
    color: COLORS.accent,
  },
  rowChevron: {
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  // Action buttons
  actions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnCall: {
    backgroundColor: COLORS.accent,
  },
  btnEmail: {
    backgroundColor: '#1E1E1E',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});