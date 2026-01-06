# PersonalSite - Interactive CS Projects Portfolio

A modern, interactive personal portfolio website showcasing computer science and engineering projects. Built with React, TypeScript, and Tailwind CSS, featuring live emulator, cryptography demos, and documentation of advanced hardware control systems.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-38B2AC) ![Vite](https://img.shields.io/badge/Vite-7.3-purple) ![WebAssembly](https://img.shields.io/badge/WebAssembly-WASM-E34F26)

## Overview

This portfolio website provides interactive demonstrations of advanced computer science concepts through live, in-browser applications powered by WebAssembly. Visitors can:

- **Execute assembly code** on a simulated CS4380 CPU with real-time instruction tracking
- **Encrypt/decrypt messages** using RSA and DES algorithms
- **View detailed execution metrics** including memory cycles, PC values, and instruction disassembly
- **Step through instructions** one-by-one or run programs at full speed

## Key Features

### CS4380 CPU Emulator
- **Interactive Emulator Demo**: Load and execute assembly programs in the browser
- **Real-time Visualization**: Watch the program counter, instruction, and memory cycles update as code executes
- **Multiple Test Programs**: Pre-loaded programs including Fibonacci calculator and comprehensive test suites
- **Execution Modes**:
  - Animated mode with throttled updates (100ms) for visual clarity
  - Single-step mode for detailed instruction-level debugging
  - Fast-finish mode to complete execution instantly
- **Memory Cycle Tracking**: Accurate cycle counting accounting for cache operations
- **Debug Console**: Dual-mode output (regular and debug) with syntax highlighting

### Cryptography Demos
- **RSA Encryption**: Asymmetric encryption demonstration with key generation and message encryption/decryption
- **DES Encryption**: Symmetric encryption showcase with block cipher operations
- Both implement full encryption pipelines compiled from C++ to WebAssembly

### Modern UI/UX
- Responsive design with gradient animations and smooth transitions
- Animated tech tags with gradient fill effects
- Interactive buttons with scale and hover effects (400ms transitions)
- Syntax-highlighted console output with color-coded debugging information
- Modular component architecture for easy extension

### Senior Capstone Project - Electric Tug System
- **Project Overview**: Autonomous electric tug vehicle developed in collaboration with Rocky Mountain Power and Provo International Airport
- **Hardware Integration**: Control systems for DC motors, stepper motors, servos, and solenoids
- **Autonomous Capabilities**: Navigation and operational autonomy systems
- **Control Architecture**: Onboard microcontroller systems for coordinated motor control
- **Project Documentation**: Comprehensive photo gallery and technical documentation
- **Repository Status**: Private repository required by project stakeholders

## Technology Stack

**Frontend:**
- React 19 - UI framework
- TypeScript 5.9 - Type-safe development
- Tailwind CSS 4.1 - Utility-first styling
- Vite 7.3 - Fast build tool and dev server
- React Router 7.11 - Client-side routing
- React Icons 5.5 - Icon library
- React Tooltip 5.30 - Tooltip components
- xterm 5.3 - Terminal emulation

**Backend/Compilation:**
- Emscripten - C++ to WebAssembly compiler
- C++ - Algorithm implementations

**Development:**
- ESLint 9 - Code linting
- TypeScript ESLint - Type-aware linting

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Emscripten (for building WASM modules)
- CMake 3.15+ (for building C++ projects)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mackaygrange/PersonalSite.git
   cd PersonalSite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build WebAssembly modules** (if needed)
   ```bash
   # Build CS4380 emulator
   cd src/projects/cs4380-emulator-assembler
   ./build_wasm.bat    # Windows
   ./build_wasm.sh     # Linux/macOS
   
   # Build RSA encryption
   cd ../RSA_Encryption_Project
   ./build_wasm.bat
   
   # Build DES encryption
   cd ../DES_Encryption_Project
   ./build_wasm.bat
   ```

### Running the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173` (or the port shown in terminal).

### Building for Production

```bash
npm run build
```

Output will be generated in the `dist/` directory.

### Running Production Preview

```bash
npm run preview
```

## Project Structure

```
PersonalSite/
├── src/
│   ├── index.html              # Entry HTML file
│   ├── css/
│   │   ├── index.css           # Global styles
│   │   └── tailwind.css        # Tailwind imports
│   ├── assets/
│   │   └── images/             # Project images
│   ├── ts/
│   │   ├── index.tsx           # React app entry point
│   │   ├── components/         # Reusable React components
│   │   │   ├── EmulatorDemo.tsx           # CS4380 emulator interface
│   │   │   ├── RSAEncryptionDemo.tsx      # RSA crypto demo
│   │   │   ├── DESEncryptionDemo.tsx      # DES crypto demo
│   │   │   ├── Header.tsx                 # Navigation header
│   │   │   ├── ContentCard.tsx            # Reusable card component
│   │   │   ├── TechTag.tsx                # Technology badge
│   │   │   ├── RepositoryLink.tsx         # GitHub link button
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useWasmLoader.ts           # WASM module loader hook
│   │   │   └── useEmulatorWasm.ts         # Emulator-specific hook
│   │   ├── pages/
│   │   │   ├── Home.tsx                   # Landing page
│   │   │   ├── About.tsx                  # About page
│   │   │   ├── Projects.tsx               # Projects showcase
│   │   │   ├── Gallery.tsx                # Project gallery
│   │   │   └── Contact.tsx                # Contact page
│   │   └── tsconfig.json
│   ├── projects/
│   │   ├── cs4380-emulator-assembler/    # CS4380 CPU emulator
│   │   │   ├── src/
│   │   │   ├── include/
│   │   │   ├── asm/                       # Assembly program examples
│   │   │   ├── assembler/                 # Python assembler
│   │   │   └── CMakeLists.txt
│   │   ├── RSA_Encryption_Project/       # RSA implementation
│   │   │   ├── src/
│   │   │   └── rsa_wrapper.cpp
│   │   ├── DES_Encryption_Project/       # DES implementation
│   │   │   ├── src/
│   │   │   └── des_wrapper.cpp
│   │   ├── ElectricTugCapstone/          # Senior capstone project
│   │   │   ├── documentation/             # Technical documentation
│   │   │   ├── images/                    # Project photos and diagrams
│   │   │   └── README.md                  # Capstone project details
│   └── public/
│       └── wasm/                          # Compiled WASM modules
│           ├── emu4380_demo.js
│           ├── rsa_demo.js
│           └── des_demo.js
├── public/                    # Static assets
├── dist/                      # Production build output
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Usage Guide

### CS4380 Emulator Demo

1. **Load a Program**: Select from the dropdown menu (Program A, B, C, D, or test suites)
2. **Execute**:
   - Click **Run** to watch execution with animated updates
   - Click **Step** to execute one instruction at a time
   - Click **Finish** during execution to complete without delays
3. **Monitor**:
   - Current Instruction window shows PC, disassembled instruction, and memory cycles
   - Console output displays program output and debug information
   - Registers window shows all register values in real-time
4. **Debug**:
   - Toggle **Debug Mode** to see internal emulator messages
   - Use input dialog when program requests input

### Encryption Demos

1. **Enter Message**: Type your message in the input field
2. **For RSA**: Generate keys, then encrypt/decrypt your message
3. **For DES**: Enter a key and encrypt/decrypt your message
4. View results with detailed operation metrics

### Capstone Project Gallery

1. **Project Overview**: View comprehensive documentation of the electric tug system
2. **Photo Gallery**: Explore high-quality images of the prototype, components, and assembly
3. **Technical Details**: Learn about the control architecture and component specifications
4. **Project Information**: Understand the collaboration with Rocky Mountain Power and Provo International Airport
5. **Repository Access**: Note that the source repository is private per project requirements

## Development

### Code Style

The project uses ESLint with TypeScript support. Run linting:

```bash
npm run lint
```

### Adding New Components

1. Create a new `.tsx` file in `src/ts/components/`
2. Use TypeScript for type safety
3. Style with Tailwind CSS classes
4. Follow the existing component patterns

### Building C++ Projects

Each C++ project has its own build script:
- Windows: `build_wasm.bat`
- Linux/macOS: `build_wasm.sh`

These scripts compile C++ to WebAssembly using Emscripten and output JavaScript loader files to `src/public/wasm/`.

## Performance Optimization

### Display Throttling
- Emulator UI updates throttled to 100ms intervals during animated execution
- Prevents excessive WASM calls that slow down execution
- Fast-finish mode runs synchronously without UI updates

### Memory Cycle Tracking
- Accurate cycle counting using internal `mem_cycle_cntr` from emulator
- Accounts for cache hit/miss timing
- Resets properly on program load and reset

## Educational Value

This portfolio demonstrates:

- **CPU Architecture**: Fetch-decode-execute cycle simulation with realistic memory timing
- **Assembly Programming**: Loading and executing real assembly code with visible state changes
- **Cryptography**: RSA public-key and DES symmetric encryption implementations
- **Web Technologies**: React, TypeScript, WebAssembly integration
- **Software Engineering**: Modular design, performance optimization, user experience
- **Hardware Control Systems**: Embedded systems design for autonomous vehicle applications
- **Systems Integration**: Coordinating multiple motor types and actuators in a complex system
- **Industrial Collaboration**: Practical engineering in partnership with real-world stakeholders

## Troubleshooting

### WASM Modules Not Loading
- Ensure WASM files are built: Run `build_wasm.bat` in each project folder
- Check browser console for specific errors
- Verify WASM files exist in `src/public/wasm/`

### Emulator Running Too Slowly
- Use "Finish" button to skip animation delays
- Program D contains longer execution sequence - expected to take several seconds
- Try reducing number of display updates

### Debug Output Not Showing
- Toggle "Debug" mode in emulator controls
- Check browser console for any JavaScript errors

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## Contact

- **GitHub**: [mackaygrange](https://github.com/mackaygrange)
- **Project Repositories**:
  - [CS4380 Emulator-Assembler](https://github.com/mackaygrange/cs4380-emulator-assembler)
  - [RSA Encryption Project](https://github.com/mackaygrange/RSA_Encryption_Project)
  - [DES Encryption Project](https://github.com/mackaygrange/DES_Encryption_Project)

## Acknowledgments

- CS4380 CPU Architecture course materials
- Emscripten documentation and community
- React and TypeScript communities
- Tailwind CSS for styling utilities

---

**Last Updated**: January 2026

For detailed information about individual projects, refer to their respective README files in the `src/projects/` subdirectories.
