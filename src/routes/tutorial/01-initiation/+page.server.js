import { fetchJSON } from "$lib/server/query";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const iso = await fetchJSON("/svc/role/1");
  return {
    isoRole: iso,
    isoHuman: iso.humans[0],
    humanList: await fetchJSON("/svc/human/list"),
  };
}
