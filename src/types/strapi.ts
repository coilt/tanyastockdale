// Basic Strapi response structure
export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

// Strapi media structure
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText?: string;
      caption?: string;
      formats?: any;
    };
  } | null;
}

// Testimonial item structure
export interface TestimonialItem {
  id: number;
  attributes: {
    title: string;
    content: string;
    author: string;
    photo: StrapiMedia;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Homepage content structure
export interface HomepageContent {
  hero?: {
    data: {
      attributes: any;
    };
  };
  lead?: {
    data: {
      attributes: {
        quote?: string;
        imagealt?: string;
        image?: StrapiMedia;
      };
    };
  };
  paragraphs?: {
    data: Array<{
      id: number;
      attributes: {
        paragraph: string;
      };
    }>;
  };
  backgroundimage?: StrapiMedia;
  testimonials?: {
    data: TestimonialItem[];
  };
}