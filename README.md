# Precifi

A React Native application built with Expo.

## Project Structure

```
src/
├── api/            # API calls and service integrations
├── assets/         # Static assets like images, fonts, etc.
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # Business logic services
├── store/          # State management
├── theme/          # UI theme configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Devices

```bash
# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## Development Guidelines

- Use TypeScript for all new files
- Follow the established folder structure
- Write unit tests for business logic
- Use the theme system for consistent styling
