// declare module "@tryghost/content-api" {
//   export default class GhostContentAPI {
//     constructor(options: { url: string; key: string; version: string });

//     posts: {
//       browse: (options?: any) => Promise<any[]>;
//       read: (options: any) => Promise<any>;
//     };

//     categories: {
//       browse: (options?: any) => Promise<any[]>;
//     };
//   }
// }


interface GhostPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  published_at: string;
  feature_image: string;
  slug: string;
  post: string;  
  // Add any other properties you're using from the Ghost API
}
 

export async function getStaticPaths() {
  const posts = await getGhostPosts();
  return posts.map((post: GhostPost) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

declare module '@tryghost/content-api' {
  export interface PostOrPage {
    // Define the properties of PostOrPage here
    id: string;
    title: string;
    // Add other properties as needed
  }

  // Add other types and interfaces as necessary
}