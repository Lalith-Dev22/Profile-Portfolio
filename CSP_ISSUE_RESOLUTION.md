# Content Security Policy (CSP) Issue Resolution

## Problem Description

You're seeing this error in the browser console:
```
Refused to load the script 'http://localhost:8080/?onload=__iframefcb541786' because it violates the following Content Security Policy directive
```

This is a common issue when using Chrome extensions (like React Developer Tools) with local development servers.

## Root Cause

This error occurs when browser extensions try to inject scripts into your local development environment but are blocked by Content Security Policy restrictions. It's not an issue with your application code but rather a security feature of the browser.

## Solutions

### Solution 1: Disable Problematic Extensions (Recommended)
1. Open Chrome and go to `chrome://extensions/`
2. Identify and temporarily disable development-related extensions:
   - React Developer Tools
   - Redux DevTools
   - Vue DevTools
   - Angular DevTools
   - Other development/debugging extensions
3. Refresh your application page

### Solution 2: Use Incognito/Private Mode
1. Open an incognito or private browsing window
2. Navigate to your development server (http://localhost:8080 or http://localhost:8081)
3. Extensions are disabled by default in private mode

### Solution 3: Add Development CSP Headers (Development Only)
The vite.config.ts has been updated to include appropriate CSP headers for development:

```javascript
server: {
  host: "::",
  port: 8080,
  // Only in development mode
  headers: {
    "Content-Security-Policy": "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:*; object-src 'none'; connect-src 'self' http://localhost:* ws://localhost:*;"
  }
}
```

**Important**: These headers are only applied in development mode and should never be used in production as they reduce security.

### Solution 4: Use HTTPS for Development
Some extensions work better with HTTPS. To enable HTTPS in Vite:

1. Update vite.config.ts:
```javascript
server: {
  host: "::",
  port: 8080,
  https: true // Enable HTTPS
}
```

2. Run the development server:
```bash
npm run dev
```

3. Accept the self-signed certificate warning in your browser

### Solution 5: Extension-Specific Workarounds

#### For React Developer Tools:
1. Click on the React DevTools extension icon in the browser toolbar
2. Select "Open DevTools" instead of allowing automatic injection
3. Manually open React DevTools when needed

#### For Other Extensions:
1. Check the extension's settings for development mode options
2. Look for options to disable automatic script injection
3. Use the extension's popup interface instead of automatic injection

## Prevention

### Development Best Practices:
1. Keep a separate browser profile for development without extensions
2. Use incognito mode for testing
3. Only enable necessary extensions during development
4. Regularly update development extensions

### Production Considerations:
1. Never use relaxed CSP policies in production
2. Implement strict CSP headers for production builds
3. Test your application with extensions disabled to ensure it works for all users

## Verification

To verify the issue is resolved:
1. Restart your development server: `npm run dev`
2. Open your application in the browser
3. Check the console for the CSP error (it should no longer appear)
4. Test that your application functions normally
5. Verify that development tools still work as expected

## Additional Notes

- This error does not affect your application's functionality
- Users without development extensions won't see this error
- The error only appears in development environments
- It's safe to ignore if it doesn't impact your development workflow

## When to Seek Further Help

If the error persists after trying these solutions:
1. Check if it's affecting application functionality
2. Verify it's not causing actual application errors
3. Consider if other developers on your team are experiencing the same issue
4. Document the specific extensions and versions causing the issue