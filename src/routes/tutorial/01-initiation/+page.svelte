<script lang="ts">
  /** @type {import('./$types').PageServerLoad} */
  export let data: any;
  import { onMount } from "svelte";

  let iso: any;
  async function loadISO() {
    iso = await fetch("/svc/role/1").then((response) => response.json());
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

  let availableRoles: any = null;
  let roleId: number;
</script>

<title>Podklady pre ISMS</title>
<h1 class="display-1">Podklady pre ISMS</h1>
<h4>
  <span class="text-info"> Prečítaj si viac </span>
</h4>
<div class="row">
  <div class="col-4">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">manuál</th>
          <th scope="col">kapitola</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> IT-Grundschutz-Compendium </td>
          <td> ISMS.1 Security Management </td>
        </tr>
        <tr>
          <td> BSI-Standard 200-2 IT-Grundschutz Methodology </td>
          <td> 3.1 Accepting responsibility by management </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<br />
<br />
<h2>Prijatie celkovej zodpovednosti za KIB vedením organizácie</h2>
<ol class="list-group list-group-numbered">
  <li class="list-group-item">
    Vedenie organizácie iniciuje KIB v organizácií.
  </li>
  <li class="list-group-item">
    Vedenie organizácie prevezme plnú zodpovednosti za KIB
  </li>
  <li class="list-group-item">Vedenie organizácie vymenuje manažéra KIB.</li>
</ol>
<br />
<hr />
{#if iso}
  {#if iso.humans.length > 0}
    <h3 class="alert bg-success text-white" role="alert">
      <span>
        Manažér KIB je: {iso.humans[0].firstName}
        {iso.humans[0].lastName}
      </span>
    </h3>
  {:else}
    <h3 class="alert bg-danger text-white" role="alert">
      Rola manažéra KIB nie je obsadená
    </h3>
  {/if}
{/if}

<h4>Pridaj seba do systému</h4>
V systéme sa nachádza základna rola {data.iso.name}. V záložké 'Ľudia' sa pridaj
do systém. záložke<a href="/role/list"> </a>
<form on:submit|preventDefault={createHuman}>
  <label for="firstName" class="form-label">Meno</label>
  <input
    type="text"
    class="form-control"
    id="firstName"
    bind:value={firstName}
  />
  <label for="lastName">Priezvisko</label>
  <input type="text" class="form-control" id="lastName" bind:value={lastName} />

  {#if availableRoles}
    <select class="form-select" bind:value={roleId}>
      <option value="" disabled selected>Zvoľ si rolu</option>
      {#if availableRoles}
        {#each availableRoles as role}
          <option value={role.id}>{role.name} </option>,
        {/each}
      {/if}
    </select>
  {/if}
  <br />
  <input type="submit" class="btn btn-primary" value="Vytvor v systéme" />
</form>
<div class="row">
  <div class="col">
    <h4>Nastav rolu manažéra KIB</h4>
    <form on:submit|preventDefault={bindISO}>
      <label for="firstName" class="form-label">Vyber osobu</label>
      <select class="form-select" bind:value={humanId}>
        {#if humanList}
          {#each humanList as human}
            <option value={human.id}
              >{human.firstName} {human.lastName}
            </option>
          {/each}
        {/if}
      </select>
      <br />
      <input
        type="submit"
        class="btn btn-primary"
        value="Nastav manažéra KIB"
      />
    </form>
  </div>
  <div class="col"></div>
  <br />
  <hr />

  <h2>Nezabúdajte</h2>
  <span>
    V regulárnych intervaloch informovať vedenie organizácie ohľadom
    potenciálnych rizík a dôsledkov nedostatočných opatrení KIB.
  </span>
</div>
