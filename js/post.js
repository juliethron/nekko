const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const profileName = params.get("name");

const user = JSON.parse(localStorage.getItem("user"));

const nameToLoad = profileName || user.name;

if (!token) {
  window.location.href = "/nekko/pages/login.html";
}

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

console.log("POST ID:", postId);

const titleEl = document.getElementById("post-title");
const bodyEl = document.getElementById("post-body");
const authorEl = document.getElementById("post-author");

async function loadPost() {
  if (!postId) {
    titleEl.textContent = "No post ID found";
    return;
  }

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

    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("POST DATA:", data);

    if (!res.ok || !data.data) {
      titleEl.textContent = "Post not found";
      bodyEl.textContent = "";
      authorEl.textContent = "";
      return;
    }

    const post = data.data;

    titleEl.textContent = post.title || "No title";
    bodyEl.textContent = post.body || "";
    authorEl.textContent = "By " + (post.author?.name || "Unknown");

  } catch (err) {
    console.error("Post error:", err);
    titleEl.textContent = "Error loading post";
  }
}

loadPost();
