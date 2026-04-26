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
  const res = await fetch("https://v2.api.noroff.dev/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": "134d87df-3d4c-4578-b111-c34a8e816707" 
    },
    body: JSON.stringify(credentials)
  });

  return await res.json();
}
