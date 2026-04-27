const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/nekko/pages/login.html";
}

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const titleEl = document.getElementById("post-title");
const bodyEl = document.getElementById("post-body");
const authorEl = document.getElementById("post-author");

async function loadPost() {
  try {
    const res = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}?_author=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
        }
      }
    );

    const data = await res.json();

    if (!data.data) {
      titleEl.textContent = "Post not found";
      return;
    }

    const post = data.data;

    titleEl.textContent = post.title || "No title";
    bodyEl.textContent = post.body || "";
    authorEl.textContent = "By " + post.author?.name;

  } catch (err) {
    console.error("Post error:", err);
  }
}

loadPost();
