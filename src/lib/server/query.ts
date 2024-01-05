import { PUBLIC_BACKEND_URL } from "$env/static/public";

export function fetchJSON(relPath: string) {
  return fetch(PUBLIC_BACKEND_URL + relPath).then((response) =>
    response.json(),
  );
}
