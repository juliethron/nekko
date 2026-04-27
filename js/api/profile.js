const token = localStorage.getItem("token");
const params = new URLSearchParams(window.location.search);
const profileName = params.get("name");

const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
  window.location.href = "/nekko/pages/login.html";
}

const nameToLoad = profileName || user.name;

const nameEl = document.getElementById("profile-name");
const avatarEl = document.getElementById("profile-avatar");
const bioEl = document.getElementById("profile-bio");
const postsContainer = document.getElementById("profile-posts");

async function loadProfile() {
  try {
    const res = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${nameToLoad}?_posts=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
        }
      }
    );

    const data = await res.json();
    console.log("PROFILE DATA:", data);

    if (!data.data) {
      console.error("Failed to load profile");
      return;
    }

    const profile = data.data;

    nameEl.textContent = profile.name;
    bioEl.textContent = profile.bio || "今日はかなり怖かったけど、どうでもいい ✧";

    const avatarUrl = profile.avatar?.url;

    if (!avatarUrl || avatarUrl.includes("dicebear")) {
      avatarEl.src = "../assets/pfp.jpg";
    } else {
      avatarEl.src = avatarUrl;
    }

    postsContainer.innerHTML = "";

    if (!profile.posts || profile.posts.length === 0) {
      postsContainer.innerHTML = "<p>No posts yet ✧</p>";
      return;
    }

    profile.posts.forEach(post => {
      const div = document.createElement("div");
      div.classList.add("post");

      div.innerHTML = `
        <h3>${post.title || "No title"}</h3>
        <p>${post.body || ""}</p>
      `;

      postsContainer.appendChild(div);
    });

  } catch (err) {
    console.error("Profile error:", err);
    nameEl.textContent = "Error loading profile";
  }
}

loadProfile();
