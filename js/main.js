import { getPosts } from "./api/posts.js";
import { renderPosts } from "./ui/renderPosts.js";
import { filterPosts } from "./utils/filter.js";

let allPosts = [];


async function init() {
  const res = await getPosts();
  allPosts = res.data;
  renderPosts(allPosts);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const filtered = filterPosts(allPosts, e.target.value);
      renderPosts(filtered);
    });
  }

  init();
});
