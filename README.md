# 🎓 Pixel Phonics - Dyslexia-Friendly Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)](https://vitejs.dev/)

An innovative, AI-powered educational platform designed specifically for learners with dyslexia. Pixel Phonics combines adaptive learning technology with evidence-based dyslexia interventions to create an engaging, supportive learning environment.

## 🌟 Features

### 📚 Phonological Training
- **AI Phonetic Breakdown Engine**: Splits words into syllables and phonemes with real-time highlighting
- **Speech-to-Text & Text-to-Speech**: Interactive pronunciation practice with immediate feedback
- **Progressive Learning**: 3-step workflow (Listen → Practice → Complete) with session tracking
- **Visual Highlighting**: Synchronized audio-visual feedback for enhanced learning

### ⚡ Speed Training (Rapid Naming)
- **Adaptive Drills**: Letters, numbers, words, and objects with adjustable difficulty
- **Latency Tracking**: Real-time response time measurement with color-coded indicators
- **AI Feedback Loop**: Automatic hints and visual adjustments based on performance
  - 4 seconds: Shows rhyme hints
  - 6 seconds: Enlarges text for better visibility
  - 8 seconds: Simplifies visual layout with encouraging messages
- **Voice Recognition**: Hands-free training with automatic progression
- **Gamified Experience**: Points, achievements, and performance statistics

### 🎮 Spelling Game
- **Interactive A-Z Keyboard**: Click or type to spell words
- **Visual Word Display**: Large, clear fonts with helpful hints
- **Positive Reinforcement**: Encouraging feedback ("Retry! You can do it!")
- **Score Tracking**: Points system with progress monitoring
- **Helper Tools**: Backspace, Clear, and Skip options

### 👁️ Visual Dyslexia Support
- **One-Click Toggle**: Instantly enable/disable dyslexia-friendly mode
- **Quick Presets**:
  - ✨ Dyslexia Friendly: OpenDyslexic font, cream background, optimal spacing
  - 🔆 High Contrast: Bold text, strong colors, maximum readability
  - 🎯 Minimal: Clean and simple, reduced visual clutter
- **Color Overlays**: Yellow, Blue, Green, Pink tints to reduce visual stress
- **Font Customization**: OpenDyslexic, Lexend, Comic Sans
- **Spacing Adjustments**: Automated line spacing (1.5-2.0) and character spacing
- **Background Colors**: Customizable with cream default to reduce dazzle

### 📊 Progress Dashboard
- **Performance Tracking**: Monitor accuracy, speed, and improvement over time
- **Achievement System**: Unlock badges and celebrate milestones
- **Skill Progress Bars**: Visual representation of phonological accuracy and rapid naming speed
- **Session Statistics**: Exercises completed, practice time, and day streaks

### 🎨 Professional Design
- **Dyslexia-Friendly UI**: Following WCAG 2.2 standards and dyslexia design principles
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Left-Aligned Text**: No justification to prevent "river" effect
- **No Italics/Underlines**: Bold for emphasis only
- **Icon + Label Pattern**: All buttons have both icons and text
- **Consistent Navigation**: Always visible, same location on every screen

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/khanzoefisha/Dyslexia-.git
cd Dyslexia-/pixel-phonics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Demo Accounts

For testing purposes, use these demo credentials:

- **Student**: `student@demo.com` / `demo123`
- **Teacher**: `teacher@demo.com` / `demo123`
- **Parent**: `parent@demo.com` / `demo123`

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Emotion (CSS-in-JS)
- **Speech Recognition**: Web Speech API
- **Text-to-Speech**: Web Speech Synthesis API
- **Testing**: Vitest + React Testing Library
- **State Management**: React Context API
- **Routing**: React Router DOM

## 📁 Project Structure

```
pixel-phonics/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx
│   │   ├── PhonologicalTraining.tsx
│   │   ├── SpeedTraining.tsx
│   │   ├── SpellingGame.tsx
│   │   ├── VisualDyslexia.tsx
│   │   ├── ProgressDashboard.tsx
│   │   ├── ThemeCustomizer.tsx
│   │   └── Login.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── services/            # Business logic
│   │   ├── PhoneticEngine.ts
│   │   └── ThemeEngine.ts
│   ├── data/                # Static data
│   │   ├── words.ts
│   │   └── drills.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Key Features Implementation

### Adaptive AI Feedback
The platform uses real-time latency tracking to provide progressive support:
- Monitors response time for each item
- Automatically provides hints when delays are detected
- Adjusts visual presentation (text size, layout simplification)
- Offers encouraging messages to maintain motivation

### Property-Based Testing
Comprehensive test coverage using property-based testing to ensure correctness:
- Round-trip properties for parsers and serializers
- Invariant testing for data transformations
- Metamorphic properties for complex operations
- Edge case handling with generated test data

### Accessibility Compliance
- WCAG 2.2 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode
- Focus indicators
- Skip to main content link

## 👥 Team

### Project Maintainer
- **Zoefisha Khan**
  - GitHub: [@khanzoefisha](https://github.com/khanzoefisha)
  - Email: khanzoefisha.122@gmail.com

### Collaborators
- **Mariyam Usmani**
  - Email: usmanimariyam2931@gmail.com

- **Rukaiya Ghadiali**
  - Email: rukaiyaghadiali14@gmail.com

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenDyslexic font by Abelardo Gonzalez
- Lexend font by Bonnie Shaver-Troup and Thomas Jockin
- Web Speech API for speech recognition and synthesis
- React and TypeScript communities for excellent tools and documentation

## 📧 Contact

For questions, suggestions, or support, please reach out to:

- **Project Lead**: khanzoefisha.122@gmail.com
- **Repository**: [https://github.com/khanzoefisha/Dyslexia-](https://github.com/khanzoefisha/Dyslexia-)

## 🔮 Future Enhancements

- [ ] Backend API integration for data persistence
- [ ] Multi-language support
- [ ] Parent/Teacher dashboard with student analytics
- [ ] Mobile app (React Native)
- [ ] AI-powered personalized learning paths
- [ ] Integration with educational platforms
- [ ] Offline mode support
- [ ] Advanced reporting and analytics

---

**Made with ❤️ for learners with dyslexia**

*Empowering every learner to reach their full potential through adaptive, accessible education technology.*
