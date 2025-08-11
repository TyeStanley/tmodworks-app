# TModWorks

A powerful desktop application for modifying game statistics and parameters in real-time. TModWorks provides an intuitive user interface for adjusting health, stamina, ammo, and other game stats through a modern, cross-platform desktop application.

## 🎮 Features

- **Real-time Game Modification**: Modify game statistics while playing
- **Intuitive UI**: Clean, modern interface for easy stat adjustment
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Database Integration**: Persistent storage for game profiles and settings
- **Desktop App**: Native desktop experience with Tauri framework

### Supported Game Modifications

- Health points
- Stamina/Energy
- Ammunition
- Experience points
- Currency/Money
- Skill points
- And more...

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Rust (for Tauri development)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tmodworks-app.git
   cd tmodworks-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start development server**
   ```bash
   npm run tauri:dev
   ```

### Building for Production

```bash
npm run tauri:build
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run tauri:dev` - Start Tauri development mode
- `npm run tauri:build` - Build production desktop app
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio for database management

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Desktop**: Tauri 2.0
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: Rust (backend), TypeScript (frontend)

## 📋 Version History

### [0.1.0] - 2025-08-11

- **Initial Release**
- Basic project structure with Next.js and Tauri
- Database integration with Prisma
- Development environment setup
- Basic UI framework with Tailwind CSS

### Planned Features

- [ ] Game detection and process monitoring
- [ ] Memory reading and writing capabilities
- [ ] Game profile management
- [ ] Hotkey support for quick modifications
- [ ] Game compatibility database
- [ ] User authentication and cloud sync
- [ ] Plugin system for custom modifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is intended for educational purposes and single-player games only. Users are responsible for ensuring compliance with game terms of service and applicable laws. The developers are not responsible for any consequences resulting from the use of this software.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tauri Documentation](https://tauri.app/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Note**: This project is currently in early development. Features and APIs may change significantly between versions.
