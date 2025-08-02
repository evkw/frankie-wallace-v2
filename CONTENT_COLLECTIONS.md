# Content Collections for Gallery Data

This project uses Astro's Content Collections API to manage gallery data in a structured way. The gallery data has been extracted from hardcoded arrays into separate JSON files for each category.

## Structure

### Content Collection Configuration
- **File**: `src/content/config.ts`
- **Purpose**: Defines the schema for gallery items using Zod validation

### Gallery Data Files
All gallery data is stored in `src/content/gallery/`:

1. **`childrens-illustrations.json`** - Children's book illustrations
2. **`wedding-illustrations.json`** - Wedding illustrations  
3. **`surface-patterns.json`** - Surface pattern designs

### Data Schema
Each gallery item follows this structure:
```typescript
{
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  category: 'childrensIllustration' | 'weddingIllustration' | 'surfacePattern';
}
```

## Utility Functions

### `src/lib/gallery-data.ts`
Provides helper functions for accessing gallery data:

- `getAllGalleryItems()` - Returns all gallery items from all categories
- `getGalleryItemsByCategory(category)` - Returns items for a specific category
- `getGalleryItemById(id)` - Returns a specific item by ID

## Usage

### In Gallery Pages
```typescript
import { getAllGalleryItems, getGalleryItemsByCategory } from '../../lib/gallery-data';

// Get all items for a category
const items = await getGalleryItemsByCategory('childrensIllustration');

// Get all items (filtered for "all" view)
const allItems = await getAllGalleryItems();
const filteredItems = allItems.filter(item => 
  item.category === 'childrensIllustration' || item.category === 'weddingIllustration'
);
```

### In Individual Item Pages
```typescript
import { getAllGalleryItems } from '../../lib/gallery-data';

export async function getStaticPaths() {
  const allItems = await getAllGalleryItems();
  
  return allItems.map((item) => ({
    params: { id: item.id },
    props: { item }
  }));
}
```

## Benefits

1. **Type Safety**: Zod schema validation ensures data consistency
2. **Separation of Concerns**: Data is separated from presentation logic
3. **Maintainability**: Easy to add, remove, or modify gallery items
4. **Performance**: Astro's content collections provide optimized data access
5. **Scalability**: Easy to extend with additional metadata fields

## Adding New Items

To add a new gallery item:

1. Open the appropriate JSON file in `src/content/gallery/`
2. Add a new object following the schema
3. Ensure the `id` is unique across all categories
4. Set the correct `category` value
5. Provide the image path and alt text

The changes will automatically be reflected in the gallery pages after rebuilding. 