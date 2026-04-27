export function renderPosts(posts) {
  const container = document.getElementById("feed");

  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
  <h3 class="post-title">
    <a href="/nekko/pages/post.html?id=${post.id}">
      ${post.title || "No title"}
    </a>
  </h3>

  <p class="post-author">
    <a href="/nekko/pages/profile.html?name=${post.author?.name}">
      ${post.author?.name || "Unknown"}
    </a>
  </p>

  <p class="post-body">${post.body || ""}</p>

  <div class="post-actions">
    <button onclick="deletePost('${post.id}')">Delete</button>
    <button onclick="editPost('${post.id}')">Edit</button>
  </div>
`;

    container.appendChild(div);
  });
}
