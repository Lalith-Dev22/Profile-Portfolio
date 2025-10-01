# Deployment Guide

## Prerequisites
- Node.js 20.x
- npm package manager
- Vercel account

## Deployment Steps

### 1. Local Testing
Before deploying, always test locally:
```bash
npm run build
npm run preview
```

### 2. Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### 3. Vercel Configuration
Ensure these settings in your Vercel project:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Framework: Vite

### 4. Environment Variables
Set these environment variables in Vercel:
- NODE_ENV: production
- VITE_APP_ENV: production

## Troubleshooting

### Common Issues

#### 1. Build Failures
- Check the build logs in Vercel
- Ensure all dependencies are correctly listed in package.json
- Verify Node.js version is set to 20.x

#### 2. Module Not Found Errors
- Clear Vercel's build cache
- Check for typos in import statements
- Verify all dependencies are installed

#### 3. Large Bundle Size
- Consider implementing code splitting
- Optimize images and assets
- Use dynamic imports for heavy components

#### 4. Rollup Platform-Specific Module Errors
- Error: "Cannot find module @rollup/rollup-linux-x64-gnu"
- Solution: Remove platform-specific rollup dependencies from package.json overrides
- See VERCEL_DEPLOYMENT_ISSUES.md for detailed explanation

#### 5. Tailwind CSS Configuration Errors
- Error: "require is not defined" in tailwind.config.ts
- Solution: Convert tailwind.config.ts to tailwind.config.js and use CommonJS syntax
- Use `module.exports` instead of ES module export syntax

### Configuration Files
- [vercel.json](file:///c:/Users/lalit/OneDrive/Desktop/porfile/Profile-Portfolio/vercel.json) - Vercel deployment configuration
- [vite.config.ts](file:///c:/Users/lalit/OneDrive/Desktop/porfile/Profile-Portfolio/vite.config.ts) - Vite build configuration
- [package.json](file:///c:/Users/lalit/OneDrive/Desktop/porfile/Profile-Portfolio/package.json) - Project dependencies and scripts
- [tailwind.config.js](file:///c:/Users/lalit/OneDrive/Desktop/porfile/Profile-Portfolio/tailwind.config.js) - Tailwind CSS configuration

## Post-Deployment Checklist
- [ ] Verify all pages load correctly
- [ ] Test all interactive elements
- [ ] Check for console errors
- [ ] Validate responsive design
- [ ] Confirm SEO meta tags are correct