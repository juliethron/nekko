import { getToken } from "../utils/storage.js";

const BASE_URL = "https://v2.api.noroff.dev/social/posts";


export async function getPosts() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}


export async function createPost(postData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(postData)
  });

  return await res.json();
}


export async function deletePost(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}
