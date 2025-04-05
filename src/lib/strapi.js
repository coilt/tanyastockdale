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
      const errorText = await response.text().catch(() => 'No response text');
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
    } else {
    }
    return null;
  }
}

export async function getHomepage() {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";

  try {
    // Use the query that we know works for the lead image
    const leadUrl = `${STRAPI_URL}/api/homepage?populate[lead][populate]=*`;
    const leadResponse = await fetch(leadUrl);
    
    if (!leadResponse.ok) {
      throw new Error(`Failed to fetch from Strapi: ${leadResponse.status}`);
    }
    
    const leadData = await leadResponse.json();
    
    // Now fetch testimonials with photos
    const testimonialsUrl = `${STRAPI_URL}/api/homepage?populate[testimonials][populate]=photo`;
    
    let testimonialData = null;
    try {
      const testimonialsResponse = await fetch(testimonialsUrl);
      if (testimonialsResponse.ok) {
        testimonialData = await testimonialsResponse.json();
      }
    } catch (testimonialsError) {
    }
    
    // Fetch any other data needed with populate=*
    const generalUrl = `${STRAPI_URL}/api/homepage?populate=*`;
    
    let generalData = null;
    try {
      const generalResponse = await fetch(generalUrl);
      if (generalResponse.ok) {
        generalData = await generalResponse.json();
      }
    } catch (generalError) {
    }
    
    // Combine all the data
    const combinedData = {
      ...generalData?.data,
      lead: leadData?.data?.lead,
      testimonials: testimonialData?.data?.testimonials || generalData?.data?.testimonials
    };
    
    return combinedData;
  } catch (error) {
    return null;
  }
}
 

 // Add this test function to your strapi.js file
export async function testStrapiApi() {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  
  // Try a simple query first
  const response = await fetch(`${STRAPI_URL}/api/homepage?populate=*`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.status}`);
  }
  
  const data = await response.json();  
  return data;
}


 
/**
 * Fetch all pages from Strapi
 * @returns {Promise<Array>} Array of page objects
 */


export async function getPages() {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";

  try {
    // Include the position field in the query and sort by it
    const url = `${STRAPI_URL}/api/pages?sort[0]=position:asc`;
    
    const response = await fetch(url);    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.data) {
      // Add a Home entry at the beginning (position 0)
      const pagesWithHome = [
        {
          id: 'home',
          slug: '',  // Empty slug for the home page
          title: 'Home',
          position: 0
        },
        ...data.data
      ];
      
      return pagesWithHome;
    }
    
    console.warn(`⚠️ Unexpected data structure from Strapi pages API:`, data);
    return [];
  } catch (error) {
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



export async function getContactPage() {
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
    
    console.warn(`⚠️ Unexpected data structure from Strapi contact page API:`, data);
    return null;
  } catch (error) {
    console.error(`💥 Error in getContactPage:`, error);
    return null;
  }
}