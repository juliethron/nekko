export function renderPosts(posts) {
  const container = document.getElementById("feed");

  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <small>By ${post.author.name}</small>
    `;

    container.appendChild(div);
  });
}
