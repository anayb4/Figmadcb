# MobilityIQ Static Export Guide for Figma

## Project Overview

This project converts React/TSX components from MobilityIQ (a transportation planning platform) into static HTML pages optimized for Web-to-Figma capture. The goal is to create clean, layered, visually accurate representations of each screen.

---

## Design System

### Colors
```css
:root {
  --primary: #1E3A5F;
  --primary-hover: #2d5a8f;
  --success: #4CAF50;
  --success-hover: #45a049;
  --warning: #FF9800;
  --error: #F44336;
  --yellow: #FFC107;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-900: #111827;
  --white: #ffffff;
}
```

### Typography
- Font Family: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Headings: 24px (h1), 16px (h2), 14px (h3)
- Body: 14px
- Small: 12px
- Extra small: 10px

### Spacing
- Base unit: 4px
- Common values: 8px, 12px, 16px, 24px, 32px

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px

---

## Component Structure

### Each HTML file should:
1. Be a complete standalone page
2. Include all CSS inline or in a `<style>` tag (no external files)
3. Use semantic class names for Figma layer naming
4. Group related elements in `<div>` containers with descriptive classes
5. Use SVG for icons and map visualizations
6. Include Google Fonts link for Inter

### Layer Naming Convention
Use class names that will become readable Figma layers:
- `sidebar` → Sidebar
- `sidebar-nav-item` → Nav Item
- `card-delay-statistics` → Delay Statistics Card
- `map-container` → Map Container
- `btn-primary` → Primary Button

---

## Pages to Create

### 1. `login.html`
**Viewport:** 1440x900

**Structure:**
```
div.login-page (gradient background)
  div.login-card (white, centered, max-width 400px)
    div.logo-container
      div.logo-icon (MQ square)
      h1.app-title "MobilityIQ"
      p.app-subtitle "Transportation Planning Platform"
    form.login-form
      div.form-field
        label "Email"
        input (placeholder: planner@city.gov)
      div.form-field
        label "Password"
        input (type password)
      button.btn-primary "Sign In"
      a.forgot-password "Forgot password?"
    footer.login-footer "© 2025 MobilityIQ..."
```

---

### 2. `sidebar.html` (component only)
**Viewport:** 264x900

**Structure:**
```
div.sidebar (dark blue background)
  div.sidebar-header
    div.logo-small
    div.app-info
      span.app-name "MobilityIQ"
      span.version "v2.4.1"
  nav.sidebar-nav
    ul.nav-list
      li.nav-item.active (Dashboard - Home icon)
      li.nav-item (Corridor Analysis - TrendingUp icon)
      li.nav-item (Bike Infrastructure - Bike icon)
      li.nav-item (Scenario Planning - GitCompare icon)
      li.nav-item (Reports - FileText icon)
  div.sidebar-footer
    div.help-box
      p "Need help?"
      a "View Documentation →"
```

**Icons:** Use Lucide icons as inline SVG

---

### 3. `corridor-analysis.html`
**Viewport:** 1440x900

**Structure:**
```
div.app-layout
  div.sidebar (include full sidebar)
  main.main-content
    div.page-header
      h1 "Corridor Analysis"
      p "Analyze performance and identify bottlenecks"
    
    div.controls-bar (white card)
      div.control-group
        label "Route / Corridor"
        div.select-dropdown "Route 44 - Main Street"
      div.control-group
        label "Date Range"
        div.date-picker "Last 30 Days"
      button.btn-primary "Analyze Performance"
    
    div.content-grid (3 columns)
      div.map-section (spans 2 cols)
        div.map-header "Route 44 - Main Street Delay Heatmap"
        div.map-container
          svg.corridor-map
            (grid background)
            (building blocks)
            (cross streets)
            (main corridor with color segments)
            (intersection markers)
            (legend box)
          button.toggle-layers "Toggle Layers"
      
      div.right-panel
        div.card-delay-statistics
          h3 "Delay Statistics"
          div.stat-row (Average Delay: 3.4 min, progress bar)
          div.stat-row (Schedule Adherence: 71%, progress bar)
          div.stat-row (Reliability Score: 64/100, progress bar)
        
        div.card-top-delays
          h3 "Top Delay Locations" (with icon)
          div.delay-item (Main St & 5th Ave, 4.2 min, High)
          div.delay-item (Broadway & Park, 3.8 min, High)
          div.delay-item (2nd St & Oak Ave, 2.9 min, Medium)
          div.delay-item (Center St & Elm, 2.3 min, Medium)
        
        button.btn-success "Simulate TSP Solution"
```

**Map SVG Requirements:**
- Viewbox: 800x500
- Include grid pattern
- Building blocks as gray rectangles
- Color-coded corridor segments (red/orange/yellow/green)
- Circular intersection markers with colored strokes
- Legend showing delay ranges

---

### 4. `corridor-analysis-modal.html`
**Viewport:** 1440x900 (same as above but with modal overlay)

**Additional Structure:**
```
div.modal-overlay (semi-transparent black)
  div.modal-dialog
    div.modal-header
      h2 "Main St & 5th Ave"
      button.close-btn (X icon)
    div.modal-content
      div.stats-grid (2x2)
        div.stat-box (Average Delay: 4.2 min)
        div.stat-box (Delay Frequency: High)
        div.stat-box (Peak Hour Impact: 6.8 min)
        div.stat-box (Signal Cycle: 120s)
      div.recommendations
        h4 "Recommendations"
        ul
          li "Install Transit Signal Priority (TSP)"
          li "Optimize signal timing for peak hours"
          li "Add queue jump lane"
```

---

### 5. `bike-lane-designer.html`
**Viewport:** 1440x900

**Structure:**
```
div.app-layout
  div.sidebar
  main.main-content
    div.page-header
      h1 "Bike Lane Designer"
      p "Design safe cycling infrastructure with data-driven insights"
    
    div.content-grid (4 columns)
      div.map-section (spans 3 cols)
        div.map-toolbar
          h2 "Oak Avenue - Mile 0.0 to 2.4"
          div.toolbar-buttons
            button.btn-tool.active "Draw"
            button.btn-tool "Measure"
            button.btn-tool "Satellite"
        div.map-container
          svg.street-map
            (grid background)
            (building blocks top/bottom)
            (sidewalks)
            (street with lane markings)
            (bike lane - green strip)
            (crash heatmap circles - optional)
            (intersection labels)
          
          div.drawing-tools-panel (floating, top-left)
            button "Draw Lane (add 0.3 mi)"
            button "Delete Last Segment"
            button "Clear All"
          
          div.layer-toggle (floating, bottom-left)
            label "Crash History Heatmap"
            div.toggle-switch
      
      div.right-panel
        div.card-design-options
          h3 "Design Options"
          div.radio-group
            div.radio-item.selected "Cycle Track" (Physically separated)
            div.radio-item "Parking-Protected" (Cars provide buffer)
            div.radio-item "Raised Lane" (Elevated 4-6 inches)
        
        div.card-safety-metrics
          h3 "Safety Metrics" (with Shield icon)
          div.metric-row (Crash Reduction: 42%, progress bar green)
          div.metric-row (Safety Score: 87/100, progress bar green)
          div.metric-sources
            p "Based on:"
            ul
              li "5 years crash data"
              li "FHWA safety factors"
              li "Local traffic patterns"
        
        div.card-cost-estimate
          h3 "Cost Estimate" (with Dollar icon)
          div.cost-row (Length: 2.4 miles)
          div.cost-row (Construction: $486,000)
          div.cost-row (Signage: $24,000)
          div.cost-row (Signals/Lighting: $67,000)
          div.cost-total (Total Estimate: $577,000)
          p.cost-per-mile "≈ $240,417 per mile"
        
        button.btn-success "Generate Design Report"
```

**Map SVG Requirements:**
- Viewbox: 1000x600
- Street cross-section view
- Buildings as gray blocks (top/bottom)
- Sidewalks
- Road with center line and edge markings
- Green bike lane strip
- Optional: red/orange crash heatmap circles
- Bike symbols (🚴 emoji or SVG)
- Barrier posts (small green rectangles)

---

### 6. `file-upload-modal.html`
**Viewport:** 500x500 (modal only, centered)

**Structure:**
```
div.modal-overlay
  div.modal-dialog.upload-dialog
    div.modal-header
      h2 "Upload Network Data Files"
    div.modal-content
      p.description "Upload the required data files..."
      
      div.upload-field
        label "GPS.txt"
        div.file-input-row
          input.file-input
          svg.check-icon (green, hidden by default)
      
      div.upload-field
        label "crashes.txt"
        div.file-input-row
          input.file-input
          svg.check-icon
      
      div.upload-field
        label "ST.txt"
        div.file-input-row
          input.file-input
          svg.check-icon
      
      div.success-message (hidden by default)
        svg.check-icon
        p "All files uploaded successfully"
        p.small "Click 'Process Data' to generate..."
      
      button.btn-primary.disabled "Process Data"
```

**Create 2 versions:**
- `file-upload-modal-empty.html` - No files uploaded, button disabled
- `file-upload-modal-complete.html` - All files uploaded, success message visible, button enabled

---

## SVG Icon Library

Include these Lucide icons as inline SVG in each file:

```html
<!-- Home -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>

<!-- TrendingUp -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>

<!-- Bike -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>

<!-- GitCompare -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>

<!-- FileText -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>

<!-- Shield -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>

<!-- DollarSign -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>

<!-- Calendar -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>

<!-- MapPin -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>

<!-- TrendingDown -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>

<!-- CheckCircle -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>

<!-- Upload -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>

<!-- MousePointer2 -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/></svg>

<!-- X (close) -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
```

---

## CSS Base Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1440, height=900">
  <title>[Page Name] - MobilityIQ</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      color: #374151;
      background: #f9fafb;
    }
    
    /* Layout */
    .app-layout {
      display: flex;
      min-height: 100vh;
    }
    
    .sidebar {
      width: 264px;
      background: #1E3A5F;
      color: white;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    
    .main-content {
      flex: 1;
      padding: 24px;
      overflow: auto;
    }
    
    /* Cards */
    .card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
    }
    
    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background 0.2s;
    }
    
    .btn-primary {
      background: #1E3A5F;
      color: white;
    }
    
    .btn-primary:hover {
      background: #2d5a8f;
    }
    
    .btn-success {
      background: #4CAF50;
      color: white;
    }
    
    .btn-success:hover {
      background: #45a049;
    }
    
    .btn-outline {
      background: white;
      border: 1px solid #e5e7eb;
      color: #374151;
    }
    
    .btn.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Form Elements */
    .form-field {
      margin-bottom: 16px;
    }
    
    .form-field label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }
    
    .form-field input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
    }
    
    /* Progress Bars */
    .progress-bar {
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-bar-fill {
      height: 100%;
      border-radius: 4px;
    }
    
    .progress-bar-fill.red { background: #F44336; }
    .progress-bar-fill.orange { background: #FF9800; }
    .progress-bar-fill.yellow { background: #FFC107; }
    .progress-bar-fill.green { background: #4CAF50; }
    
    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-dialog {
      background: white;
      border-radius: 12px;
      padding: 24px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    /* Utilities */
    .text-sm { font-size: 12px; }
    .text-xs { font-size: 10px; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-900 { color: #111827; }
    .text-success { color: #4CAF50; }
    .text-error { color: #F44336; }
    .mt-2 { margin-top: 8px; }
    .mt-4 { margin-top: 16px; }
    .mb-2 { margin-bottom: 8px; }
    .mb-4 { margin-bottom: 16px; }
    .gap-2 { gap: 8px; }
    .gap-4 { gap: 16px; }
  </style>
</head>
<body>
  <!-- Content here -->
</body>
</html>
```

---

## Output Files Checklist

Create these files in order:

1. [ ] `login.html`
2. [ ] `dashboard.html` (sidebar + empty main area with welcome message)
3. [ ] `corridor-analysis.html`
4. [ ] `corridor-analysis-modal.html`
5. [ ] `bike-lane-designer.html`
6. [ ] `bike-lane-designer-heatmap.html` (with crash heatmap visible)
7. [ ] `file-upload-modal-empty.html`
8. [ ] `file-upload-modal-complete.html`

---

## Web-to-Figma Capture Instructions

After creating all HTML files:

1. Open each HTML file in Chrome
2. In Figma, go to Plugins → html.to.design
3. Use "Import from URL" with `file:///path/to/file.html` OR
4. Use the Chrome extension to capture the current tab
5. Repeat for each page

The class names will become Figma layer names, making organization cleaner.

---

## Notes for Claude

- Prioritize visual accuracy over code elegance
- All CSS should be inline in `<style>` tags
- No external dependencies except Google Fonts
- SVG maps should be detailed but not overly complex
- Use actual pixel values, not relative units
- Ensure 1440x900 viewport for main pages
- Group elements logically for clean Figma layers