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
  title: string;
  excerpt: string;
  url: string;
  published_at: string;
  // Add any other properties you're using from the Ghost API
}
