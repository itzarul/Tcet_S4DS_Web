export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'datathon' | 'conclave' | 'keynote' | 'workshop' | 'archive';
  imageUrl: string;
  year?: string;
  meta?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface FloatingCardItem extends GalleryItem {
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  scale?: number;
}

export interface ChapterFeatureItem {
  id: string;
  title: string;
  iconName: string;
  bullets: string[];
}

export interface ChapterData {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlightWords?: string[];
  featuredImage: {
    url: string;
    caption: string;
    metaBadge: string;
  };
  features: ChapterFeatureItem[];
  gallery: GalleryItem[];
}
