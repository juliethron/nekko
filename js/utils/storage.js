export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
