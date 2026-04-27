import { getToken } from "../utils/storage.js";

const BASE_URL = "https://v2.api.noroff.dev/social/posts";


export async function createPost(postData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    },
    body: JSON.stringify(postData)
  });

  return await res.json();
}


eexport async function getPosts() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://v2.api.noroff.dev/social/posts?_author=true&limit=50&sort=created&order=desc",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
      }
    }
  );

  return await res.json();
}

export async function deletePost(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707"
    }
  });
}
