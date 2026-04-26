export function renderPosts(posts) {
  const container = document.getElementById("feed");

  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
      <h3>${post.title || "No title"}</h3>
      <p>${post.body || ""}</p>

      <div class="post-actions">
        <button onclick="deletePost('${post.id}')">Delete</button>
        <button onclick="editPost('${post.id}')">Edit</button>
      </div>
    `;

    container.appendChild(div);
  });
}
