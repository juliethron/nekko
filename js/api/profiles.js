import { getToken } from "../utils/storage.js";

const BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "134d87df-3d4c-4578-b111-c34a8e816707";

/**
 * Follows a user by name
 * @param {string} name -Username to follow
 */
export async function followUser(name) {
  const res = await fetch(`${BASE_URL}/social/profiles/${name}/follow`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    }
  });

  console.log("FOLLOW STATUS:", res.status);

  if (!res.ok) {
    const error = await res.json();
    console.error("Follow failed:", error);
    throw new Error("Follow failed");
  }

  return await res.json();
}

/**
 * Unfollows a user by name
 * @param {string} name -Username to unfollow
 */
export async function unfollowUser(name) {
  const res = await fetch(`${BASE_URL}/social/profiles/${name}/unfollow`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    }
  });

  console.log("UNFOLLOW STATUS:", res.status);

  if (!res.ok) {
    const error = await res.json();
    console.error("Unfollow failed:", error);
    throw new Error("Unfollow failed");
  }

  return await res.json();
}
