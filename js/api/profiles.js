import { getToken } from "../utils/storage.js";

const BASE_URL = "https://v2.api.noroff.dev";


export async function followUser(name) {
  await fetch(`${BASE_URL}/social/profiles/${name}/follow`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}


export async function unfollowUser(name) {
  await fetch(`${BASE_URL}/social/profiles/${name}/unfollow`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}
