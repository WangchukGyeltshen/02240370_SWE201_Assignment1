# 02240370_SWE201_Assignment1# Campus Companion

## Overview
Campus Companion is a React Native mobile application built with Expo for new students at the College of Science and Technology (CST), Royal University of Bhutan. It provides quick access to key campus information including important contacts, class schedules, and notice board announcements — all in one clean, responsive app.

## Main Features
- **Home** – Welcome screen with quick navigation cards and a light/dark theme toggle
- **Contacts** – Searchable list of important campus contacts (IT Helpdesk, Student Services, Library, etc.) with tap-to-call and tap-to-email on detail screen
- **Schedule** – Weekly class timetable with day selector, colour-coded by class type (Lecture / Lab / Tutorial)
- **Notice Board** – Categorised campus announcements with filter chips (Academic, Event, Admin, Urgent)

## Installation & Running

### Prerequisites
- Node.js 18+
- Expo Go app on your Android/iOS device, **or** an Android/iOS emulator

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd CampusCompanion

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

Then:
- Press **`a`** to open on Android emulator
- Press **`i`** to open on iOS simulator
- Scan the **QR code** with the Expo Go app on your physical device

## Known Issues / Limitations
- Contact phone and email links open the device's native dialler/mail app; actual calling requires a real device
- Campus map is not yet implemented (planned for a future assignment)
- Schedule data is hardcoded; no live API integration