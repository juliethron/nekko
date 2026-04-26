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
const name = document.getElementById("register-name").value;
const email = document.getElementById("register-email").value;
const password = document.getElementById("register-password").value;
const message = document.getElementById("register-message");

try {
  await register({ name, email, password });

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
const email = document.getElementById("login-email").value;
const password = document.getElementById("login-password").value;
const message = document.getElementById("login-message");


loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("login-message");

  try {
    const data = await login({ email, password });

    if (!data.data || !data.data.accessToken) {
      throw new Error("Invalid login");
    }

    localStorage.setItem("token", data.data.accessToken);

    window.location.href = "./feed.html";

  } catch (err) {
    message.textContent = "Login failed. Check your email/password.";
    console.error(err);
  }
});
}


  document.addEventListener("DOMContentLoaded", () => {
  initFeed();
  initSearch();
  initRegister();
  initLogin();
  });
