import { fetchJSON } from "$lib/server/query";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const iso = await fetchJSON("/svc/role/1");
  return {
    iso: iso,
  };
}
