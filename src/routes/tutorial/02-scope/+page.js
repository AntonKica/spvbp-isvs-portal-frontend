import { fetchJSON } from "$lib/query";

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    businessProcesses: await fetchJSON("/svc/businessProcess/list"),
    humans: await fetchJSON("/svc/human/list"),
  };
}
