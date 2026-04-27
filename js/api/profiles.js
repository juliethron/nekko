import { getToken } from "../utils/storage.js";

const BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "134d87df-3d4c-4578-b111-c34a8e816707";

export async function followUser(name) {
  await fetch(`${BASE_URL}/social/profiles/${name}/follow`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    }
  });
}

export async function unfollowUser(name) {
  await fetch(`${BASE_URL}/social/profiles/${name}/unfollow`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    }
  });
}
