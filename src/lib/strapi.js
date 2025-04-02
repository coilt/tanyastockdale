export async function fetchFromStrapi(endpoint, params = {}) {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  
  // Remove any trailing slashes
  const baseUrl = STRAPI_URL.replace(/\/+$/, '');
  
  // Convert params object to query string
  const queryString = Object.keys(params)
    .map(key => {
      const value = typeof params[key] === 'object' 
        ? JSON.stringify(params[key]) 
        : params[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  
  const url = `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch from Strapi (${url}):`, error);
    return null;
  }
}




// Get the homepage content (single type)
export async function getHomepage() {
  try {
    const data = await fetchFromStrapi("homepage?populate=deep");
    console.log("Raw Strapi response:", data); // Add this for debugging
    
    if (data && data.data) {
      return data.data;
    }
    
    console.warn("Unexpected data structure from Strapi homepage API:", data);
    return null;
  } catch (error) {
    console.error("Error in getHomepage:", error);
    return null;
  }
}


 


// Add this function to your existing strapi.js file

/**
 * Fetch all pages from Strapi
 * @returns {Promise<Array>} Array of page objects
 */
export async function getPages() {
  try {
    const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
    const response = await fetch(`${STRAPI_URL}/api/pages?populate=*`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}




// Get all pages for navigation
export async function getNavigation() {
  try {
    const pagesData = await fetchFromStrapi("pages");
    
    if (!pagesData || !pagesData.data) {
      return [];
    }
    
    return pagesData.data;
  } catch (error) {
    console.error("Error in getNavigation:", error);
    return [];
  }
}

// Add the missing getPageBySlug function
export async function getPageBySlug(slug) {
  try {
    const pagesData = await fetchFromStrapi("pages", {
      'filters[slug][$eq]': slug
    });
    
    if (!pagesData || !pagesData.data || pagesData.data.length === 0) {
      return null;
    }
    
    // Return the first matching page
    return pagesData.data[0];
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
}

// Get all pages
export async function getAllPages() {
  try {
    const pagesData = await fetchFromStrapi("pages");
    return pagesData?.data || [];
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}


