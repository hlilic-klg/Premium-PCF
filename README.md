# Premium PCF - Custom Control Library

[![License](https://img.shields.io/badge/license-Commercial-blue.svg)](LICENSE)

## Overview
Premium PCF is a collection of high-quality, commercial-grade PowerApps Component Framework (PCF) controls designed to enhance your Power Platform applications.

## Project Structure
```
Premium PCF/
├── .github/                    # GitHub configuration and Copilot instructions
├── Solutions/                  # Power Platform solution for packaging
├── SampleControl/             # Your first PCF control (rename as needed)
│   ├── index.ts              # Main control implementation
│   ├── ControlManifest.Input.xml  # Control metadata and properties
│   └── css/                  # Control styles
├── package.json              # Node dependencies
└── pcfproj.json             # PCF project configuration
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [.NET Framework 4.6.2+](https://dotnet.microsoft.com/download/dotnet-framework)
- [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)
- [Visual Studio Code](https://code.visualstudio.com/)

### Installation
All dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### Development

#### Build the Control
```bash
npm run build
```

#### Watch Mode (Auto-rebuild on changes)
```bash
npm start watch
```

#### Test Harness (Test your control locally)
```bash
npm start
```
This will launch a local test harness where you can interact with your control.

#### Build the Solution (for deployment)
```bash
cd Solutions
msbuild /t:build /restore
```

### Creating New Controls

To create a new control in this workspace:

1. Create a new folder for your control:
```bash
mkdir MyNewControl
cd MyNewControl
```

2. Initialize the PCF control:
```bash
pac pcf init --namespace PremiumPCF --name MyNewControl --template field
```

3. Install dependencies:
```bash
npm install
```

4. Add it to the solution:
```bash
cd ..\Solutions
pac solution add-reference --path ..\MyNewControl
```

### Control Templates Available
- `field` - Field control (bound to a field on a form)
- `dataset` - Dataset control (for grids/lists)

## Development Workflow

1. **Design Your Control**
   - Plan the functionality and user experience
   - Define configuration properties in ControlManifest.Input.xml

2. **Implement**
   - Write TypeScript code in index.ts
   - Add styles in the css folder
   - Test frequently using `npm start`

3. **Build Solution**
   - Build the solution for packaging
   - Test in a Power Platform environment

4. **Document**
   - Create user documentation
   - Add screenshots and examples
   - Update pricing and licensing info

## Project Configuration

### Publisher Information
- **Name**: PremiumPCF
- **Prefix**: prempcf
- **Display Name**: Premium PCF

You can update publisher details in `Solutions\Other\Solution.xml`

## Resources

### Official Documentation
- [PCF Overview](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [PCF Reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/)
- [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)

### Community
- [PCF Gallery](https://pcf.gallery/) - Browse existing controls
- [Power Platform Community](https://powerusers.microsoft.com/)

## Next Steps

1. ✅ **Workspace Created** - You're here!
2. 🎨 **Design Your First Control** - Rename and customize `SampleControl`
3. 🔧 **Build and Test** - Use `npm start` to test locally
4. 📦 **Package for Distribution** - Build the solution
5. 🌐 **Create Marketing Site** - Showcase your controls
6. 💰 **Set Up Payment/Licensing** - Prepare for sales

## License
This is a commercial project. All rights reserved.

## Support
For support and inquiries, please contact: [Your Contact Information]

---

**Happy Coding! 🚀**
