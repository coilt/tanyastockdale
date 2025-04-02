import { getPages } from '../../lib/strapi';

export async function GET() {
  try {
    const pages = await getPages();
    return new Response(JSON.stringify(pages), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in pages API:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
