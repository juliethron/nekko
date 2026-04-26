import { getPosts } from "./api/posts.js";
import { renderPosts } from "./ui/renderPosts.js";

async function init() {
  const response = await getPosts();
  renderPosts(response.data);
}

init();
