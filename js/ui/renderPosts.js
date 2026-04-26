export function renderPosts(posts) {
  const container = document.getElementById("feed");

  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
      <h3>${post.title || "No title"}</h3>
      <p>${post.body || ""}</p>
    `;

    container.appendChild(div);
  });
}

<button onclick="deletePost('${post.id}')">Delete</button>
