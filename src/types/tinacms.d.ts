import { TinaField } from 'tinacms'

// Extend TinaField to include defaultValue
declare module 'tinacms' {
  interface TinaField<T extends boolean = false> {
    defaultValue?: any;
    if?: {
      fields: string[];
      match: (value: any) => boolean;
    };
  }
}
  
// Define types for your content blocks
export interface Block {
  blockType: string;
  [key: string]: any; // For additional properties based on block type
}

// You can also define more specific block types if needed
export interface HeroBlock extends Block {
  blockType: 'hero';
  heading?: string;
  subheading?: string;
  introText?: string;
  heroImage?: string;
  imageCaption?: string;
}

export interface ParagraphBlock extends Block {
  blockType: 'paragraph';
  text: string;
}

// Add other block types as needed

// Define the Page type
export interface Page {
  title: string;
  metaTitle?: string;
  addToNavigation?: boolean;
  navOrder?: number;
  blocks?: Block[];
}
