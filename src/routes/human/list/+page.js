import { fetchJSON } from "$lib/query";

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    humanList: await fetchJSON("/svc/human/list"),
  };
}
