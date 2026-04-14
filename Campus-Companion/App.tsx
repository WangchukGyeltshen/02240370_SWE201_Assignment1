import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './Homescreen';
import ContactsScreen from './contactScreen';
import ContactDetailScreen from './contactDetailScreen';
import ScheduleScreen from './scheduleScreen';
import NoticeBoardScreen from './noticeBoardScreen';

// ─── Types ────────────────────────────────────────────────────────────────────
// Defines all routes and the params each screen accepts
export type RootStackParamList = {
  Main: undefined;
  ContactDetail: { contact: Contact };
};

export type BottomTabParamList = {
  Home: undefined;
  Contacts: undefined;
  Schedule: undefined;
  Notices: undefined;
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  office: string;
  icon: string;
};

// ─── Navigators ───────────────────────────────────────────────────────────────
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const COLORS = {
  background: '#0A0B0D',
  text: '#E7E7E4',
  accent: '#D9D9D2',
  muted: '#A8A8A2',
  border: '#4A4A4A',
};

const TAB_ICONS: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Contacts: 'people-outline',
  Schedule: 'calendar-outline',
  Notices: 'notifications-outline',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconName = TAB_ICONS[route.name as keyof BottomTabParamList];
          return <Ionicons name={iconName} size={focused ? 22 : 20} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: 4,
          paddingBottom: Platform.OS === 'ios' ? 20 : 6,
          height: Platform.OS === 'ios' ? 76 : 58,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '500', fontSize: 17 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Notices" component={NoticeBoardScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Bottom tabs live as one stack screen */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        {/* Contact detail slides in over tabs */}
        <Stack.Screen
          name="ContactDetail"
          component={ContactDetailScreen}
          options={{
            title: 'Contact Details',
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.text,
            headerTitleStyle: { fontWeight: '600' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}