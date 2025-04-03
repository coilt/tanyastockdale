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
  console.log(`🔍 Attempting to fetch from: ${url}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    console.log(`📡 Sending fetch request to: ${url}`);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log(`📥 Received response with status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No response text');
      console.error(`❌ Error response body: ${errorText}`);
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Successfully parsed JSON response`);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`⏱️ Request timed out for ${url}`);
    } else {
      console.error(`💥 Failed to fetch from Strapi (${url}):`, error);
    }
    return null;
  }
}

export async function getHomepage() {
  console.log(`🏠 Starting homepage data fetch...`);
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";

  try {
    // Use the query that we know works for the lead image
    const leadUrl = `${STRAPI_URL}/api/homepage?populate[lead][populate]=*`;
    console.log(`🔍 Fetching homepage with lead image from: ${leadUrl}`);
    
    const leadResponse = await fetch(leadUrl);
    console.log(`📥 Received lead response with status: ${leadResponse.status}`);
    
    if (!leadResponse.ok) {
      throw new Error(`Failed to fetch from Strapi: ${leadResponse.status}`);
    }
    
    const leadData = await leadResponse.json();
    console.log(`✅ Successfully parsed lead JSON response`);
    
    // Now fetch testimonials with photos
    const testimonialsUrl = `${STRAPI_URL}/api/homepage?populate[testimonials][populate]=photo`;
    console.log(`🔍 Fetching testimonials with photos from: ${testimonialsUrl}`);
    
    let testimonialData = null;
    try {
      const testimonialsResponse = await fetch(testimonialsUrl);
      if (testimonialsResponse.ok) {
        testimonialData = await testimonialsResponse.json();
        console.log(`✅ Successfully parsed testimonials JSON response`);
      }
    } catch (testimonialsError) {
      console.error(`⚠️ Error fetching testimonials:`, testimonialsError);
    }
    
    // Fetch any other data needed with populate=*
    const generalUrl = `${STRAPI_URL}/api/homepage?populate=*`;
    console.log(`🔍 Fetching general homepage data from: ${generalUrl}`);
    
    let generalData = null;
    try {
      const generalResponse = await fetch(generalUrl);
      if (generalResponse.ok) {
        generalData = await generalResponse.json();
        console.log(`✅ Successfully parsed general JSON response`);
      }
    } catch (generalError) {
      console.error(`⚠️ Error fetching general data:`, generalError);
    }
    
    // Combine all the data
    const combinedData = {
      ...generalData?.data,
      lead: leadData?.data?.lead,
      testimonials: testimonialData?.data?.testimonials || generalData?.data?.testimonials
    };
    
    console.log(`✅ Successfully combined all homepage data`);
    return combinedData;
  } catch (error) {
    console.error(`💥 Error in getHomepage:`, error);
    return null;
  }
}




// Make sure this is at the end of the file
export { getHomepage };



 // Add this test function to your strapi.js file
export async function testStrapiApi() {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";
  
  // Try a simple query first
  const response = await fetch(`${STRAPI_URL}/api/homepage?populate=*`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.status}`);
  }
  
  const data = await response.json();
  console.log("Simple API test response:", JSON.stringify(data, null, 2));
  
  return data;
}


 
// Add this function to your existing strapi.js file

/**
 * Fetch all pages from Strapi
 * @returns {Promise<Array>} Array of page objects
 */



export async function getPages() {
  console.log(`📄 Fetching pages for navigation...`);
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";

  try {
    // Include the position field in the query and sort by it
    const url = `${STRAPI_URL}/api/pages?sort[0]=position:asc`;
    console.log(`🔍 Attempting to fetch from: ${url}`);
    
    const response = await fetch(url);
    console.log(`📥 Received response with status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Successfully parsed JSON response`);
    
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
      
      console.log(`Pages for navigation menu:`, pagesWithHome);
      return pagesWithHome;
    }
    
    console.warn(`⚠️ Unexpected data structure from Strapi pages API:`, data);
    return [];
  } catch (error) {
    console.error(`💥 Error in getPages:`, error);
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
  console.log(`📞 Fetching contact page data...`);
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "https://strapi.substorm.cc";

  try {
    const url = `${STRAPI_URL}/api/contact-page`;
    console.log(`🔍 Attempting to fetch from: ${url}`);
    
    const response = await fetch(url);
    console.log(`📥 Received response with status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch contact page: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`✅ Successfully parsed JSON response`);
    
    if (data && data.data) {
      console.log(`✅ Successfully extracted contact page data`);
      return data.data;
    }
    
    console.warn(`⚠️ Unexpected data structure from Strapi contact page API:`, data);
    return null;
  } catch (error) {
    console.error(`💥 Error in getContactPage:`, error);
    return null;
  }
}