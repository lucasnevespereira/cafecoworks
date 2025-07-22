# 🎯 Community Submission Guide

Welcome to CafeCoworks! This guide explains how to submit new cafes to our directory using our Git-based file system.

## 📁 File Structure

Each café is stored as a separate JSON file in the following structure:

```
src/data/cafes/
├── new-york/
│   ├── bluestone-lane-soho.json
│   └── stumptown-coffee-ace-hotel.json
├── london/
│   ├── monmouth-coffee-borough.json
│   ├── gentlemen-baristas-union-street.json
│   └── workshop-coffee-fitzrovia.json
├── san-francisco/
│   └── blue-bottle-hayes-valley.json
└── [other-cities]/
    └── [cafe-slug].json
```

Images are stored in:

```
public/images/
├── new-york/
│   ├── bluestone-lane-soho.jpg
│   └── stumptown-coffee-ace-hotel.jpg
├── london/
│   ├── monmouth-coffee-borough.jpg
│   └── [other-images].jpg
└── [other-cities]/
    └── [cafe-slug].jpg
```

## 📝 How to Submit a New Cafe

### Step 1: Create the JSON File

1. Navigate to `src/data/cafes/[city-name]/`
2. Create a new file named `[cafe-slug].json`
3. Use the following template:

```json
{
  "name": "Cafe Name",
  "slug": "cafe-name-location",
  "description": "A detailed description of the cafe, its atmosphere, and why it's great for remote work. Include information about wifi, seating, noise level, etc.",
  "city": "City Name",
  "country": "Country Name",
  "location": "Full address of the cafe",
  "website": "https://cafe-website.com",
  "googleMapsUrl": "https://maps.google.com/?q=encoded+address",
  "image": "/images/city-name/cafe-slug.jpg",
  "tags": [
    "wifi",
    "quiet",
    "power-outlets",
    "spacious",
    "cozy",
    "coffee-quality"
  ],
  "lat": 40.7128,
  "lng": -74.006,
  "featured": false
}
```

### Step 2: Add the Image

1. Navigate to `public/images/[city-name]/`
2. Add your image file named `[cafe-slug].jpg`
3. Recommended image specifications:
   - Format: JPG
   - Size: 800x600px or similar aspect ratio
   - File size: Under 500KB
   - Content: Exterior or interior shot of the cafe

### Step 3: Test Your Submission

1. Run the build script to generate the aggregated data:

   ```bash
   npm run build-cafes
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Check that your cafe appears correctly on the website

### Step 4: Submit Your Changes

1. Create a new branch for your submission
2. Commit your changes:
   ```bash
   git add src/data/cafes/[city-name]/[cafe-slug].json
   git add public/images/[city-name]/[cafe-slug].jpg
   git commit -m "Add [Cafe Name] in [City]"
   ```
3. Push your branch and create a pull request

## 📋 Required Fields

| Field           | Type    | Required | Description                                  |
| --------------- | ------- | -------- | -------------------------------------------- |
| `name`          | string  | ✅       | Full name of the cafe                        |
| `slug`          | string  | ✅       | URL-friendly identifier (lowercase, hyphens) |
| `description`   | string  | ✅       | Detailed description (100-200 words)         |
| `city`          | string  | ✅       | City name                                    |
| `country`       | string  | ✅       | Country name                                 |
| `location`      | string  | ✅       | Full address                                 |
| `website`       | string  | ❌       | Cafe's website URL                           |
| `googleMapsUrl` | string  | ❌       | Google Maps URL                              |
| `image`         | string  | ✅       | Path to image file                           |
| `tags`          | array   | ✅       | Array of relevant tags                       |
| `lat`           | number  | ❌       | Latitude coordinate                          |
| `lng`           | number  | ❌       | Longitude coordinate                         |
| `featured`      | boolean | ❌       | Whether to feature on homepage               |

## 🏷️ Recommended Tags

Use these tags to help users find cafes that match their needs:

### Work Environment

- `wifi` - Reliable internet connection
- `power-outlets` - Available power outlets
- `quiet` - Quiet atmosphere
- `spacious` - Plenty of seating space
- `cozy` - Comfortable, intimate setting

### Coffee & Food

- `specialty-coffee` - High-quality coffee
- `local-roasting` - Locally roasted beans
- `food-menu` - Good food options
- `pastries` - Fresh pastries available

### Atmosphere

- `modern` - Contemporary design
- `historic` - Historic building/charm
- `industrial` - Industrial aesthetic
- `scandinavian` - Scandinavian design
- `minimalist` - Minimalist interior

### Location

- `downtown` - Central location
- `near-transit` - Close to public transport
- `creative-district` - In creative/arts area
- `tech-district` - Near tech companies

## 🔧 Build Process

The build system automatically:

1. **Scans** all JSON files in `src/data/cafes/`
2. **Validates** the data structure
3. **Aggregates** all cafes into a single array
4. **Generates** `public/cafes.json` for client-side use
5. **Updates** `src/data/cafes.json` for development

## 🚀 Benefits of This System

- **Git-based**: All changes are tracked and versioned
- **Community-driven**: Easy for anyone to contribute
- **Instant updates**: Changes appear immediately after build
- **Scalable**: Can handle thousands of cafes efficiently
- **Searchable**: Fuse.js provides fast client-side search
- **Maintainable**: Each cafe is a separate file

## ❓ Need Help?

If you have questions or need assistance:

1. Check existing cafe files for examples
2. Open an issue on GitHub
3. Join our community discussions

Happy contributing! ☕
