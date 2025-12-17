# Premium PCF Control Development Guide

## Quick Start Commands

### Build Commands
```powershell
# Build the control once
npm run build

# Watch mode (auto-rebuild on save)
npm start watch

# Launch test harness (test control locally)
npm start

# Clean build artifacts
npm run clean
```

### Solution Commands
```powershell
# Build the solution for deployment
cd Solutions
msbuild /t:build /restore
```

## Control Development Lifecycle

### 1. Planning Phase
Before writing code, answer these questions:
- What problem does this control solve?
- Who is the target user?
- What configurations should be available?
- Will it work in Canvas apps, Model-Driven apps, or both?
- What's the pricing strategy?

### 2. Implementation Phase

#### Update ControlManifest.Input.xml
Define your control's metadata:
- Control name and description
- Input/output properties
- Data types
- Resource files (CSS, images, etc.)

#### Implement index.ts
Write your control logic:
```typescript
export class YourControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
    // Initialize your control
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        // Setup code here
    }
    
    // Update when data changes
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update UI based on new data
    }
    
    // Return data to the platform
    public getOutputs(): IOutputs {
        return {};
    }
    
    // Cleanup when control is destroyed
    public destroy(): void {
        // Cleanup code here
    }
}
```

#### Add Styling
Create CSS files in the `css/` folder and reference them in the manifest.

### 3. Testing Phase

#### Local Testing
```powershell
npm start
```
This launches a test harness at http://localhost:8181

#### Test in Power Platform
1. Build the solution:
   ```powershell
   cd Solutions
   msbuild /t:build /restore
   ```
2. Import the solution zip file (in `Solutions\bin\Debug\`) into your Power Platform environment
3. Add the control to an app and test

### 4. Documentation Phase

Create comprehensive documentation:
- **User Guide**: How to use the control
- **Configuration Guide**: All available properties
- **Examples**: Real-world use cases
- **Screenshots/Videos**: Visual demonstrations
- **Troubleshooting**: Common issues and solutions

### 5. Packaging Phase

Build for production:
```powershell
# Ensure clean build
npm run clean
npm run build

# Build solution
cd Solutions
msbuild /t:build /restore /p:Configuration=Release
```

The deployable solution will be in `Solutions\bin\Release\`

## Best Practices

### Performance
- Minimize DOM manipulations
- Use event delegation
- Debounce rapid updates
- Lazy load resources
- Cache computed values

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Support keyboard navigation
- Ensure proper contrast ratios
- Test with screen readers

### Error Handling
- Validate all inputs
- Gracefully handle missing data
- Provide meaningful error messages
- Log errors for debugging
- Never break the app experience

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type
- Document complex types with JSDoc
- Use enums for constants

## Creating Multiple Controls

To add more controls to this project:

```powershell
# Create a new control folder
mkdir MyNewControl
cd MyNewControl

# Initialize the control
pac pcf init --namespace PremiumPCF --name MyNewControl --template field

# Install dependencies
npm install

# Add to solution
cd ..\Solutions
pac solution add-reference --path ..\MyNewControl
```

## Common Issues & Solutions

### Issue: Control doesn't update
**Solution**: Ensure you call `notifyOutputChanged()` when outputs change.

### Issue: Build fails
**Solutions**:
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors
- Verify ControlManifest.Input.xml is valid XML

### Issue: Test harness won't start
**Solutions**:
- Ensure port 8181 is not in use
- Run `npm run clean` then `npm run build`
- Check Node.js version compatibility

### Issue: Solution build fails
**Solutions**:
- Ensure .NET Framework is installed
- Rebuild the control first: `npm run build`
- Check Solutions\Other\Solution.xml for errors

## Deployment Checklist

Before releasing a control:
- [ ] Code is well-documented
- [ ] All TypeScript errors resolved
- [ ] Control tested in test harness
- [ ] Control tested in actual Power Platform environment
- [ ] Works in both Canvas and Model-Driven apps (if applicable)
- [ ] Accessibility features tested
- [ ] Performance optimized
- [ ] Documentation complete
- [ ] Screenshots/videos created
- [ ] Pricing determined
- [ ] License terms defined
- [ ] Support plan established

## Marketing Your Controls

### Website Requirements
- Control showcase with demos
- Feature descriptions
- Pricing information
- Purchase/licensing system
- Documentation portal
- Support contact

### Recommended Tech Stack for Website
- **Framework**: Next.js, Astro, or WordPress
- **Payment**: Stripe, PayPal, or Gumroad
- **Licensing**: License key system
- **Hosting**: Vercel, Netlify, or Azure

## Resources

- [PCF Samples](https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework)
- [PCF Gallery](https://pcf.gallery/)
- [Power Platform Community](https://powerusers.microsoft.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Need Help?** Check the README.md or official Microsoft documentation.
