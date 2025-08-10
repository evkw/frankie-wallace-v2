# Navigation Configuration

This directory contains the central configuration for navigation routes used throughout the application.

## Files

- `navigation.ts` - Main navigation configuration file
- `README.md` - This documentation file

## Usage

### Basic Navigation Configuration

The `navigation.ts` file exports a `navigationConfig` array that contains all active navigation items. Each item has the following structure:

```typescript
interface NavigationItem {
  label: string;        // Display text for the navigation link
  href: string;         // URL or path for the link
  isExternal?: boolean; // Whether the link opens in a new tab
  isActive?: boolean;   // Whether the route is currently active
}
```

### Adding New Routes

To add a new navigation route:

1. Open `src/config/navigation.ts`
2. Add a new object to the `navigationConfig` array:

```typescript
{
  label: 'New Page',
  href: '/new-page',
  isActive: true
}
```

### External Links

For external links (like the Etsy store), set `isExternal: true`:

```typescript
{
  label: 'Store',
  href: 'https://www.etsy.com/shop/lovefrankieart',
  isExternal: true,
  isActive: true
}
```

### Temporarily Disabling Routes

To temporarily disable a route without removing it:

1. Set `isActive: false` in the route configuration
2. Or move it to the `inactiveRoutes` array

### Using in Components

Import and use the navigation configuration in any component:

```typescript
import { getActiveRoutes } from '../config/navigation';

// Get only active routes
const activeRoutes = getActiveRoutes();

// Get all routes (active and inactive)
const allRoutes = getAllRoutes();
```

### Benefits

- **DRY Principle**: Routes are defined once and used everywhere
- **Consistency**: All navigation components use the same data source
- **Maintainability**: Easy to add, remove, or modify routes
- **Type Safety**: TypeScript interfaces ensure correct data structure
- **Flexibility**: Support for external links and conditional activation

## Example Usage in Astro Components

```astro
---
import { getActiveRoutes } from '../config/navigation';
---

{getActiveRoutes().map((item) => (
  <a 
    href={item.href} 
    class="nav-link"
    {...(item.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
  >
    {item.label}
  </a>
))}
``` 