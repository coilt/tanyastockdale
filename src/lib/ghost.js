import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: "https://blog.tanyastockdale.com",
  key: "0319eca78d5ef9159eb282bc91",
  version: "v3",
});

export async function getGhostPosts() {
  return await api.posts.browse({ 
    limit: 'all',
     
    timestamp: new Date().getTime(),
     
  });
}