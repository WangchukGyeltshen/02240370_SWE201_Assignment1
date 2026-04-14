import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ContactCard from './contactCard';
import { RootStackParamList, BottomTabParamList, Contact } from './App';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#0A0B0D',
  text: '#E7E7E4',
  accent: '#D9D9D2',
  muted: '#A8A8A2',
  card: '#2F2F2F',
  border: '#4A4A4A',
};

// Composite type: screen lives inside tabs but can push to stack
type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Contacts'>,
    StackNavigationProp<RootStackParamList>
  >;
};

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Pema Dorji',
    role: 'Programme Leader, Software Engineering',
    phone: '+975-17110001',
    email: 'pema.dorji@cst.edu.bt',
    office: 'Academic Block A-203',
    icon: 'account-tie-outline',
  },
  {
    id: '2',
    name: 'Sonam Choden',
    role: 'Lecturer, Database Systems',
    phone: '+975-17110002',
    email: 'sonam.choden@cst.edu.bt',
    office: 'Academic Block A-117',
    icon: 'account-tie',
  },
  {
    id: '3',
    name: 'Tshering Wangdi',
    role: 'Lab Technician',
    phone: '+975-17110003',
    email: 'tshering.wangdi@cst.edu.bt',
    office: 'Computing Lab 2',
    icon: 'tools',
  },
  {
    id: '4',
    name: 'Karma Zangmo',
    role: 'Student Affairs Officer',
    phone: '+975-17110004',
    email: 'karma.zangmo@cst.edu.bt',
    office: 'Admin Block Ground Floor',
    icon: 'briefcase-outline',
  },
  {
    id: '5',
    name: 'College Help Desk',
    role: 'General Enquiries',
    phone: '+975-17110005',
    email: 'helpdesk@cst.edu.bt',
    office: 'Main Reception',
    icon: 'headset',
  },
];

export default function ContactsScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  // Filter contacts by search query
  const filtered = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase())
  );

  // Navigate to detail screen, passing the full contact object (param passing requirement)
  const handlePress = (contact: Contact) => {
    navigation.navigate('ContactDetail', { contact });
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={16} color={COLORS.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor={COLORS.muted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <Text style={styles.count}>{filtered.length} contacts</Text>

      {/* FlatList – core requirement */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => handlePress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No contacts found.</Text>
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
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // Responsive width
    width: width - 32,
    shadowOpacity: 0,
    elevation: 0,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  count: {
    fontSize: 12,
    color: COLORS.muted,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  list: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.muted,
  },
});