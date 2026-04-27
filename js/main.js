import { register, login } from "./api/auth.js";
import { getPosts } from "./api/posts.js";
import { renderPosts } from "./ui/renderPosts.js";
import { filterPosts } from "./utils/filter.js";

let allPosts = [];

async function initFeed() {
const feed = document.getElementById("feed");
if (!feed) return;

try {
const res = await getPosts();


if (!res.data) {
  console.error("No posts returned", res);
  return;
}

allPosts = res.data;
renderPosts(allPosts);


} catch (err) {
console.error("Failed to load posts", err);
}
}

function initSearch() {
const searchInput = document.getElementById("search");
if (!searchInput) return;

searchInput.addEventListener("input", (e) => {
const filtered = filterPosts(allPosts, e.target.value);
renderPosts(filtered);
});
}

function initRegister() {
const registerBtn = document.getElementById("register-btn");
if (!registerBtn) return;

registerBtn.addEventListener("click", async () => {
const name = document.getElementById("register-name")?.value;
const email = document.getElementById("register-email")?.value;
const password = document.getElementById("register-password")?.value;
const message = document.getElementById("register-message");


try {
  const result = await register({ name, email, password });

  if (result.errors) {
    message.textContent = result.errors[0].message;
    return;
  }

  message.textContent = "Registered successfully! You can now log in.";
} catch (err) {
  message.textContent = "Registration failed.";
  console.error(err);
}


});
}

function initLogin() {
const loginBtn = document.getElementById("login-btn");
if (!loginBtn) return;

loginBtn.addEventListener("click", async () => {
const email = document.getElementById("login-email")?.value;
const password = document.getElementById("login-password")?.value;
const message = document.getElementById("login-message");


try {
  const data = await login({ email, password });

  if (!data.data || !data.data.accessToken) {
    throw new Error("Invalid login");
  }

  localStorage.setItem("token", data.data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.data));

  window.location.href = "./feed.html";
} catch (err) {
  message.textContent = "Login failed.";
  console.error(err);
}


});
}

function initCreatePost() {
const btn = document.getElementById("create-post-btn");
const textarea = document.getElementById("post-content");

console.log("Create button:", btn); 

if (!btn || !textarea) return;

btn.addEventListener("click", async () => {
console.log("POST CLICKED"); 


const content = textarea.value.trim();
const token = localStorage.getItem("token");

if (!content) return;

try {
  const res = await fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    },
    body: JSON.stringify({ body: content })
  });

  const data = await res.json();
  console.log("NEW POST:", data);

  if (!data.data) {
    console.error("Post failed", data);
    return;
  }

  allPosts.unshift(data.data);
  renderPosts(allPosts);

  textarea.value = "";
} catch (err) {
  console.error("Create post failed", err);
}


});
}

window.deletePost = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
      }
    });

    console.log("DELETE STATUS:", res.status);

    if (!res.ok) {
      const error = await res.json();
      console.error("Delete failed:", error);
      return;
    }

    allPosts = allPosts.filter(post => post.id !== id);
    renderPosts(allPosts);

  } catch (err) {
    console.error("Delete error:", err);
  }
};


window.editPost = async (id) => {
  const newText = prompt("Edit your post:");
  if (!newText) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
      },
      body: JSON.stringify({ body: newText })
    });

    console.log("EDIT STATUS:", res.status);

    if (!res.ok) {
      const error = await res.json();
      console.error("Edit failed:", error);
      return;
    }

    const data = await res.json();

    allPosts = allPosts.map(post =>
      post.id === id ? { ...post, body: data.data.body } : post
    );

    renderPosts(allPosts);

  } catch (err) {
    console.error("Edit error:", err);
  }
};


document.addEventListener("DOMContentLoaded", () => {
initFeed();
initSearch();
initRegister();
initLogin();
initCreatePost();
});
