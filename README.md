# TModWorks

A desktop application for modifying game stats and parameters, built with Tauri, Next.js, and DaisyUI.

## Features

- **Custom Title Bar**: The app uses a custom title bar with window controls
- **Game Library**: Browse and manage your game collection
- **Favorites System**: Mark your favorite games for quick access
- **Modern UI**: Built with DaisyUI components for a clean, modern interface
- **Desktop Native**: Built with Tauri for native performance

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: DaisyUI + Tailwind CSS
- **Desktop**: Tauri 2.0
- **Database**: Prisma (configured but not used yet)

## Getting Started

### Prerequisites

- Node.js 18+
- Rust (for Tauri)
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tmodworks-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run tauri:dev
```

This will start both the Next.js development server and the Tauri app.

### Building for Production

```bash
npm run tauri:build
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # UI components (Button, etc.)
│   ├── Navbar.tsx     # Custom title bar with window controls
│   ├── Sidebar.tsx    # Game library sidebar
│   └── MainContent.tsx # Main content area
└── lib/               # Utilities and data
    └── mockData.ts    # Mock game data
```

## Custom Title Bar & System Tray

The app features a custom title bar similar to Discord and WeMod:

- **Draggable Area**: The navbar can be used to drag the window
- **Window Controls**: Minimize, maximize/restore, and hide buttons
- **Integrated Design**: Seamlessly integrated with the app's design
- **System Tray**: App minimizes to system tray instead of closing
- **Tray Menu**: Right-click tray icon for "Show TModWorks" and "Quit" options
- **Background Running**: App continues running in background when hidden

## Mock Data

Currently using mock data for games. The structure includes:

- Game name, category, play time
- Favorite status
- Installation status
- Last played information

## Next Steps

- Implement actual Tauri window control commands
- Add game detection and scanning
- Create game modification interface
- Add user preferences and settings
- Implement database for game data persistence

## Development

The app is set up with:

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- DaisyUI for consistent UI components
