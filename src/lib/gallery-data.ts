import { getCollection } from 'astro:content';

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  category: 'childrensIllustration' | 'weddingIllustration' | 'surfacePattern' | 'weddingStationery';
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const allItems = await getCollection('gallery');
    return allItems.map(item => ({
      id: item.id,
      title: item.data.title,
      image: item.data.image,
      imageAlt: item.data.imageAlt,
      category: item.data.category
    }));
  } catch (error) {
    console.error('Error loading gallery data:', error);
    return [];
  }
}

export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  const allItems = await getAllGalleryItems();
  return allItems.filter(item => item.category === category);
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const allItems = await getAllGalleryItems();
  return allItems.find(item => item.id === id) || null;
} 