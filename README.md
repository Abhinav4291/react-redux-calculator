# React Redux Calculator

A modern, accessible calculator built with React 18 and Redux Toolkit. Features a clean interface, keyboard support, and comprehensive error handling.

![Calculator Screenshot](https://via.placeholder.com/320x480/2563eb/ffffff?text=Calculator)

## ✨ Features

- **Four-function arithmetic**: Addition, subtraction, multiplication, division
- **Sequential operations**: Chain calculations like "5 + 2 × 3 = 21"
- **Keyboard support**: Full keyboard navigation and input
- **Error handling**: Graceful divide-by-zero and floating-point precision
- **Accessibility**: ARIA labels, semantic HTML, screen reader support
- **Responsive design**: Works on desktop and mobile devices
- **Dark mode**: Automatic dark mode based on system preference

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/react-redux-calculator.git
cd react-redux-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
\`\`\`

## 🛠️ Tech Stack

- **React 18** - UI library with hooks and functional components
- **Redux Toolkit** - State management with modern Redux patterns
- **Vite** - Fast build tool and development server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **CSS3** - Modern styling with CSS custom properties

## 📁 Project Structure

\`\`\`
src/
├── app/
│   └── store.js                 # Redux store configuration
├── features/
│   └── calculator/
│       ├── calculatorSlice.js   # Redux slice with actions/reducers
│       └── __tests__/
│           └── calculatorSlice.test.js
├── components/
│   ├── Display.jsx              # Calculator display component
│   ├── Button.jsx               # Reusable button component
│   ├── Keypad.jsx               # Button grid layout
│   └── __tests__/
│       └── Calculator.test.jsx  # Integration tests
├── hooks/
│   └── useKeyboard.js           # Keyboard event handling
├── App.jsx                      # Main application component
├── main.jsx                     # Application entry point
└── index.css                    # Global styles
\`\`\`

## 🎯 Key Implementation Details

### State Management
All calculator state is managed through Redux Toolkit with a single slice:
- \`display\`: Current display value
- \`previousValue\`: Stored value for operations
- \`operation\`: Current operation (+, -, ×, ÷)
- \`waitingForOperand\`: Input state flag
- \`error\`: Error message for invalid operations

### Edge Case Handling
- **Division by zero**: Shows error message and resets state
- **Leading zeros**: Prevented in number input
- **Floating point precision**: Results rounded to avoid precision errors
- **Large numbers**: Scientific notation for very large/small values

### Accessibility Features
- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support
- Focus management

### Performance Optimizations
- \`React.memo\` for Button components to prevent unnecessary re-renders
- Memoized selectors to optimize Redux subscriptions
- Efficient event handling with single keyboard listener

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| \`0-9\` | Input digits |
| \`+\` | Addition |
| \`-\` | Subtraction |
| \`*\` | Multiplication |
| \`/\` | Division |
| \`Enter\` or \`=\` | Calculate result |
| \`.\` | Decimal point |
| \`Backspace\` | Remove last digit |
| \`Delete\` | Clear entry |
| \`Escape\` or \`C\` | Clear all |

## 🧪 Testing

The project includes comprehensive tests covering:

- **Unit tests**: Redux reducers and actions
- **Integration tests**: Complete user workflows
- **Edge cases**: Error handling and boundary conditions

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
\`\`\`

## 🎨 Styling

The calculator uses modern CSS with:
- CSS custom properties for theming
- Flexbox and Grid for layout
- Responsive design with mobile-first approach
- Dark mode support via \`prefers-color-scheme\`
- Smooth transitions and hover effects

## 🔧 Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
\`\`\`

## 🚀 Deployment

The calculator can be deployed to any static hosting service:

1. **Build the project**: \`npm run build\`
2. **Deploy the \`dist\` folder** to your hosting service

### Vercel Deployment
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Netlify Deployment
\`\`\`bash
npm run build
# Drag and drop the dist folder to Netlify
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'feat: add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):
- \`feat:\` New features
- \`fix:\` Bug fixes
- \`docs:\` Documentation changes
- \`style:\` Code style changes
- \`refactor:\` Code refactoring
- \`test:\` Test additions or changes
- \`chore:\` Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Redux team for Redux Toolkit
- Vite team for the fast build tool
- Testing Library team for excellent testing utilities

---

# Abhinav Calculator

## Table Of Contents
- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors](#authors)

## About The Project
This is a modern calculator application built with React and Redux that provides a clean and intuitive interface for performing mathematical calculations. It features a responsive design that works seamlessly across all devices, supports basic arithmetic operations, and includes advanced features like percentage calculations and keyboard input support.

## Getting Started
To get started with this calculator, you'll need to set up your development environment first.

### Prerequisites
```sh
npm install npm@latest -g
```

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/your-username/abhinav-calculator.git
   ```

2. Navigate to the project directory
   ```sh
   cd abhinav-calculator
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Roadmap
See the [open issues](https://github.com/your-username/abhinav-calculator/issues) for a list of proposed features and known issues.

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

We follow a feature-branch workflow and Conventional Commits specification. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Git workflow and branch naming conventions
- Commit message format
- Pull request process
- Code review guidelines

Key points:
- Create feature branches from `main`
- Make small, atomic commits
- Follow conventional commit messages
- Submit PRs with clear descriptions

Please ensure you:
- Check your spelling and grammar
- Create individual PR for each suggestion
- Read through the Code Of Conduct before posting your first idea

## Authors
- Abhinav

## Screenshot

![Calculator Screenshot](screenshot/Screenshot%202025-06-12%20at%202.24.43%20PM.png)
