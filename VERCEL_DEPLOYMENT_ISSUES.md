# Vercel Deployment Issues and Solutions

## Issue: Rollup Platform-Specific Module Error

### Error Message
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
```

### Root Cause
This error occurs when platform-specific native modules are explicitly specified in package.json but are not available in the Vercel deployment environment. Rollup uses optional dependencies for performance optimization on different platforms, but these modules may not be compatible with or available in serverless environments like Vercel.

### Solution Applied
We removed the platform-specific rollup dependencies from the overrides section in package.json:

**Before:**
```json
"overrides": {
  "rollup": "^4.22.4",
  "@rollup/rollup-linux-x64-gnu": "^4.22.4",
  "@rollup/rollup-win32-x64-msvc": "^4.22.4",
  "@rollup/rollup-darwin-x64": "^4.22.4",
  "@types/react": "^18.3.23",
  "@types/react-dom": "^18.3.7"
}
```

**After:**
```json
"overrides": {
  "rollup": "^4.22.4",
  "@types/react": "^18.3.23",
  "@types/react-dom": "^18.3.7"
}
```

### Why This Fixes the Issue
1. **Automatic Resolution**: By removing explicit platform-specific dependencies, npm can automatically resolve the appropriate native module for the deployment environment
2. **Optional Dependency Handling**: Rollup's optional dependencies are designed to be automatically selected based on the runtime environment
3. **Vercel Compatibility**: Vercel's build environment can now properly select or fallback to a compatible rollup implementation

### Additional Recommendations
1. **Avoid Explicit Native Dependencies**: In general, avoid explicitly specifying platform-specific native modules in package.json for cloud deployments
2. **Use Generic Versions**: Let package managers resolve platform-specific dependencies automatically
3. **Test in Similar Environments**: Use containers or CI/CD pipelines that mimic your deployment environment for testing

### Alternative Solutions (If Issues Persist)
1. **Add .npmrc Configuration**:
   ```
   optional=false
   ```
   This tells npm to skip optional dependencies entirely.

2. **Use Yarn Instead of npm**:
   Yarn handles optional dependencies differently and may resolve this issue.

3. **Specify Rollup Version in Vercel**:
   In vercel.json:
   ```json
   {
     "buildCommand": "npm install rollup@4.22.4 && npm run build"
   }
   ```

## Related npm Issue
This is a known issue with npm's handling of optional dependencies: https://github.com/npm/cli/issues/4828

The issue occurs when:
1. Optional dependencies are explicitly specified
2. The deployment environment doesn't match the specified platform
3. npm fails to gracefully fallback to alternatives