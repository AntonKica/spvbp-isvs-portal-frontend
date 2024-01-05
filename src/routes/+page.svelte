<div class="col-8">
  <script lang="ts">
    import { onMount } from "svelte";

    let iso: any;
    async function loadISO() {
      fetch("/svc/role/1")
        .then((response) => response.json())
        .then((json) => (iso = json));
    }
    let humanList: any;
    async function loadHumanList() {
      fetch("/svc/human/list")
        .then((response) => response.json())
        .then((json) => (humanList = json));
    }
    onMount(() => {
      loadISO();
      loadHumanList();
    });

    let humanId: number;
    async function bindISO() {
      // clear bound roles
      // TODO HARDCODED VALUE 1
      await fetch(`/svc/role/1/clear`, { method: "POST" });
      const res = await fetch(`/svc/human/${humanId}/bind/role/1`, {
        method: "POST",
      });
      const text = await res.text();
      alert(text);

      loadISO();
    }
    let firstName: string;
    let lastName: string;
    async function createHuman() {
      const res = await fetch("/svc/human", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName, lastName: lastName }),
      });
      const text = await res.text();
      alert(text);

      loadHumanList();
    }
  </script>

  <title>Home</title>

  <h1 class="display-1">Home</h1>
</div>
