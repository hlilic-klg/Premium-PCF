<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Premium PCF - Custom Instructions

## Project Overview
This is a PowerApps Component Framework (PCF) control library project for creating premium, commercial-grade custom controls.

## Project Standards
- **Publisher**: Premium PCF (PremiumPCF)
- **Prefix**: prempcf
- **Language**: TypeScript
- **Framework**: PowerApps Component Framework (PCF)

## Development Guidelines
1. All controls should be production-ready and follow Microsoft's PCF best practices
2. Code should be well-documented with JSDoc comments
3. Controls should be responsive and accessible (ARIA compliance)
4. Include comprehensive error handling and validation
5. Follow TypeScript strict mode guidelines
6. Ensure controls work in both Canvas and Model-Driven apps when applicable

## Code Quality Standards
- Use TypeScript for type safety
- Follow PCF naming conventions
- Implement proper lifecycle methods (init, updateView, destroy)
- Optimize performance (minimize DOM operations, use efficient rendering)
- Test controls thoroughly before release

## Documentation Requirements
- Each control should have a detailed README with:
  - Feature description
  - Configuration options
  - Usage examples
  - Screenshots/demos
  - Known limitations
  - Browser compatibility

## Resources
- [PCF Documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [PCF Gallery](https://pcf.gallery/)
- [Power Platform CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)
