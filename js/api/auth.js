const BASE_URL = "https://v2.api.noroff.dev";


export async function register(userData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  return await res.json();
}


export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  const data = await res.json();

  localStorage.setItem("token", data.data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.data));

  return data;
}
