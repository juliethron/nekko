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
    const nameInput = document.getElementById("register-name");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");
    const message = document.getElementById("register-message");

    if (!nameInput || !emailInput || !passwordInput) {
      console.error("Missing input fields");
      return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const result = await register({ name, email, password });

      console.log("REGISTER RESULT:", result);

      if (result.errors) {
        message.textContent = "Registration failed.";
        console.error(result.errors[0].message);
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
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    console.log("LOGIN INPUT:", { email, password });

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

document.getElementById("create-post-btn")?.addEventListener("click", async () => {
  const content = document.getElementById("post-content").value;

  const token = localStorage.getItem("token");

  await fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    },
    body: JSON.stringify({ body: content })
  });

  location.reload(); 
});

window.deletePost = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    }
  });

  location.reload();
};

  document.addEventListener("DOMContentLoaded", () => {
  initFeed();
  initSearch();
  initRegister();
  initLogin();
});
