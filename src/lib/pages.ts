// Create this new file to handle page loading
import fs from 'fs';
import path from 'path';

interface Page {
  title: string;
  addToNavigation?: boolean;
  navOrder?: number;
}

export async function getNavigationPages(): Promise<Array<{ title: string; href: string; order: number }>> {
  try {
    // Get the content/pages directory path
    const pagesDir = path.join(process.cwd(), 'content', 'pages');
    
    // Check if directory exists
    if (!fs.existsSync(pagesDir)) {
      return [];
    }
    
    // Get all JSON files in the directory
    const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.json'));
    
    // Load and parse each file
    const pages = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(pagesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const page = JSON.parse(content) as Page;
        const slug = file.replace('.json', '');
        
        return {
          title: page.title,
          href: `/${slug}`,
          addToNavigation: page.addToNavigation ?? false,
          order: page.navOrder ?? 999, // Default to a high number if not specified
        };
      })
    );
    
    // Filter pages that should be in navigation and sort by navOrder
    return pages
      .filter(page => page.addToNavigation)
      .sort((a, b) => a.order - b.order)
      .map(({ title, href, order }) => ({ title, href, order }));
  } catch (error) {
    console.error('Error loading navigation pages:', error);
    return [];
  }
}
