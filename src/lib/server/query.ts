import { PUBLIC_BACKEND_URL as BACKEND_URL } from "$env/static/public";

export async function fetchJSON(relPath: string) {
  console.log("bip");
  return fetch(BACKEND_URL + relPath).then((response) => response.json());
}
