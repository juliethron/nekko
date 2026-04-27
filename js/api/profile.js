import { followUser, unfollowUser } from "/nekko/js/api/profiles.js";

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
const followBtn = document.getElementById("follow-btn");

console.log("FOLLOW BTN:", followBtn); 

async function loadProfile() {
  try {
    const res = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${nameToLoad}?_posts=true&_followers=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
        }
      }
    );

    console.log("STATUS:", res.status); /

    const data = await res.json();
    console.log("PROFILE DATA:", data);

    if (!data.data) {
      console.error("Failed to load profile");
      return;
    }

    const profile = data.data;

    
    nameEl.textContent = profile.name;
    bioEl.textContent = profile.bio || "No bio yet ✧";

    
    const avatarUrl = profile.avatar?.url;
    avatarEl.src =
      avatarUrl && !avatarUrl.includes("dicebear")
        ? avatarUrl
        : "../assets/pfp.jpg";

   
    if (!followBtn) {
      console.error("Follow button not found");
      return;
    }

    
    if (profile.name === user.name) {
      followBtn.style.display = "none";
    } else {
      followBtn.style.display = "block";

      const isFollowing = profile.followers?.some(
        follower => follower.name === user.name
      );

      followBtn.textContent = isFollowing ? "Unfollow" : "Follow";

      followBtn.onclick = async () => {
        console.log("CLICKED FOLLOW"); 

        try {
          if (followBtn.textContent === "Follow") {
            await followUser(profile.name);
            followBtn.textContent = "Unfollow";
          } else {
            await unfollowUser(profile.name);
            followBtn.textContent = "Follow";
          }
        } catch (err) {
          console.error("Follow error:", err);
        }
      };
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
