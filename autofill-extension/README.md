# PTC Eightfold AI Autofill Extension

## Overview
This Chrome extension automatically fills job application forms on PTC's Eightfold AI platform, handling all  steps of the application process.

## Features
✅ Fills all common field types (text, select, checkbox, radio)  
✅ Navigates through multi-step application forms  
✅ Handles all  application steps automatically  
✅ 80%+ field coverage

## Installation

### Step 1: Load Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `autofill-extension` folder
5. The extension should now appear in your extensions list

### Step 2: Pin the Extension (Optional)
1. Click the puzzle icon in Chrome toolbar
2. Find "PTC Eightfold AI Autofill"
3. Click the pin icon to keep it visible

## Usage

### Step 1: Customize Your Data
Edit `data.js` to include your personal information:
```javascript
window.formData = {
  firstName: "Your First Name",
  lastName: "Your Last Name",
  email: "your.email@example.com",
  // ... 
};
```

### Step 2: Navigate to Application Page
Open the PTC job application page:
```
https://ptc.eightfold.ai/careers/apply?pid=137477695724
```
Or any other PTC Eightfold job application URL.

### Step 3: Trigger Autofill
1. Click the extension icon in Chrome toolbar
2. The extension will automatically:
   - Fill all form fields
   - Navigate through all steps
   - Complete in approximately 5-10 seconds

### Step 4: Review and Submit
- Review the filled information
- Make any manual adjustments if needed
- Submit the application manually

## Application Steps Covered

| Step | Fields | Status |
|------|--------|--------|
| 1 | Resume Upload | ⚠️ Manual (Eightfold UI) |
| 2 | Contact Info (Name, Email, Phone) | ✅ Automated |
| 3 | Source (How did you hear?) | ✅ Automated |
| 4 | Disability Self-ID | ✅ Automated |
| 5 | Veteran Status | ✅ Automated |
| 6 | Willing to Relocate | ✅ Automated |
| 7 | Cover Letter Upload | ⚠️ Manual (Eightfold UI) |
| 8 | Address | ✅ Automated |
| 9 | Salary & Remote Preference | ✅ Automated |
| 10 | Legal (Work Authorization) | ✅ Automated |



## Known Limitations
1. **File Uploads**: Resume and cover letter uploads must be handled through Eightfold's native file picker modal
2. **Dynamic Selectors**: Some field selectors may change if Eightfold updates their UI
3. **Timing**: Uses fixed delays (1.5s per step) which may need adjustment for slower connections

## Troubleshooting

### Extension Not Working?
1. Verify you're on a PTC Eightfold application page
2. Check browser console (F12) for any errors
3. Reload the extension in `chrome://extensions/`

### Fields Not Filling?
- Increase delay times in `content.js` (change `await sleep(1500)` to higher values)
- Check that field names match Eightfold's current HTML structure

### Cannot Click Next Button?
- Eightfold may have updated their button text/structure
- Check the `next()` function in `content.js`

## Technical Details

### Files
- `manifest.json` - Extension configuration
- `background.js` - Service worker (handles extension icon clicks)
- `data.js` - Your personal data structure
- `content.js` - Main autofill logic
- `IMPLEMENTATION.md` - Technical documentation

### Strategy
DOM-driven autofill with delayed execution to handle Eightfold's asynchronous rendering. Each step waits 1.5 seconds before filling to ensure elements are loaded.

## Customization

### Adjust Timing
If fields aren't filling properly, increase delays:
```javascript
await sleep(2000); // Increase from 1500 to 2000ms
```

### Add New Fields
To handle additional fields:
```javascript
fill('input[name="newField"]', data.newValue);
```

### Modify Click Behavior
For different button text:
```javascript
clickByText("Your Button Text");
```


## Time Spent
Approximately 7 hours of development and testing.

