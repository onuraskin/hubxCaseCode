# HubX Case Study - Plant Care App

This project is a case study developed for HubX company, showcasing a modern plant care and identification mobile application built with React Native. The app helps users identify plants, track their garden, and get plant care recommendations.

## 🚀 Features

- Personal garden management
- Plant diagnosis system
- User profile management
- Onboarding experience
- Modern and intuitive UI design
- Cross-platform support (iOS & Android)
- State management with Redux
- TypeScript implementation for type safety

## 🛠 Tech Stack

- React Native (v0.70.10)
- TypeScript
- Redux Toolkit & React Redux for state management
- React Navigation for routing and tab navigation
- Async Storage for local data persistence
- Axios for API requests
- React Native Vector Icons for UI elements

## 📱 App Screens

- Home: Dashboard with quick actions and plant overview
- Scanner: Plant identification feature
- My Garden: Personal plant collection management
- Diagnose: Plant health diagnosis tool
- Profile: User settings and preferences

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Install iOS pods (macOS only):
```bash
cd ios && pod install
```

4. Run the application:

For iOS:
```bash
yarn ios
# or
npm run ios
```

For Android:
```bash
yarn android
# or
npm run android
```

## 📝 Project Structure

- `/src`: Source code
  - `/screens`: Main app screens (Home, Scanner, MyGarden, Diagnose, Profile)
  - `/components`: Reusable UI components
  - `/store`: Redux store configuration
  - `/navigation`: Tab and stack navigation setup
  - `/services`: API services for plant identification and diagnosis
  - `/utils`: Helper functions and utilities
  - `/theme`: App-wide styling and theme configuration
  - `/assets`: Images, icons, and other static assets
  - `/hooks`: Custom React hooks
  - `/Modals`: Modal components



## 🙏 Acknowledgments

- HubX for the opportunity to work on this case study
- React Native community for the excellent documentation
- All contributors who invest time and effort into making this project better 