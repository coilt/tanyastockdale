import type { HomepageContent, TestimonialItem, StrapiResponse } from "../types/strapi";

export async function fetchFromStrapi<T = any>(endpoint: string, params: Record<string, any> = {}): Promise<T | null> {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  const baseUrl = STRAPI_URL.replace(/\/+$/, "");
  const queryString = Object.keys(params)
    .map(key => {
      const value = typeof params[key] === "object"
        ? JSON.stringify(params[key])
        : params[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
  const url = `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ""}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      const errorText = await response.text().catch(() => "No response text");
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
 


export async function getHomepage(): Promise<HomepageContent | null> {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  try {
    const url = `${STRAPI_URL}/api/homepage?populate[testimonials][populate]=photo&populate[lead][populate]=*&populate=*`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Strapi: ${response.status}`);
    }
    const data = await response.json();
    // If testimonials is an array, return as is. If it's wrapped in .data, unwrap.
    let homepage: HomepageContent = data.data;
    if (homepage && (homepage as any).testimonials && Array.isArray((homepage as any).testimonials)) {
      // Already array, do nothing
    } else if (homepage && (homepage as any).testimonials && (homepage as any).testimonials.data) {
      (homepage as any).testimonials = (homepage as any).testimonials.data;
    }
    return homepage;
  } catch (error) {
    console.error("💥 Error fetching homepage from Strapi:", error);
    return null;
  }
}

export async function testStrapiApi(): Promise<any> {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  const response = await fetch(`${STRAPI_URL}/api/homepage?populate=*`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function getPages(): Promise<any[]> {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  try {
    const url = `${STRAPI_URL}/api/pages?sort[0]=position:asc`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data) {
      const pagesWithHome = [
        { id: 'home', slug: '', title: 'Home', position: 0 },
        ...data.data
      ];
      return pagesWithHome;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function getNavigation(): Promise<any[]> {
  try {
    const pagesData = await fetchFromStrapi<any>("pages");
    if (!pagesData || !pagesData.data) {
      return [];
    }
    return pagesData.data;
  } catch (error) {
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  try {
    const pagesData = await fetchFromStrapi<any>("pages", {
      'filters[slug][$eq]': slug
    });
    if (!pagesData || !pagesData.data || pagesData.data.length === 0) {
      return null;
    }
    return pagesData.data[0];
  } catch (error) {
    return null;
  }
}

export async function getAllPages(): Promise<any[]> {
  try {
    const pagesData = await fetchFromStrapi<any>("pages");
    return pagesData?.data || [];
  } catch (error) {
    return [];
  }
}

export async function getContactPage(): Promise<any | null> {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  try {
    const url = `${STRAPI_URL}/api/contact-page`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch contact page: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}
