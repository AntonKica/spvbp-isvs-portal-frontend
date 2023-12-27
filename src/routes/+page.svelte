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
    // TODO HARDCODED VALUE 1
    // clear bound roles
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

<title>Iniciácia ISMS</title>
<div class="row justify-content-md-center">
  <div class="col-10">
    <h1 class="display-1">Iniciácia ISMS</h1>
    <div class="row">
      <h4>
        <span class="text-primary"> Prečítaj si viac <span> </span></span>
      </h4>
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
              <td>IT-Grundschutz-Compendium</td>
              <td>ISMS.1 Security Management</td>
            </tr>
            <tr>
              <td> BSI-Standard 200-2 IT-Grundschutz Methodology </td>
              <td> 3.1 Accepting responsibility by management </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h2>Prvé kroky</h2>
    <div class="alert alert-warning" role="alert">
      <h2>! Bez podpory manažmentu to nejde !</h2>
      Bezpečnostný proces nemôže spustiť nikto iný ako CEO/vedenie. Je nutné aby
      vrchný manažment prevzal zodpovednosť za informačnú bezpečnosť.
    </div>

    {#if iso}
      {#if iso.humans.length > 0}
        <h3 class="alert alert-success" role="alert">
          ISO je: {iso.humans[0].firstName}
          {iso.humans[0].lastName}
        </h3>
      {:else}
        <h3 class="alert alert-danger" role="alert">
          Rola ISO nie je obsadená
        </h3>
      {/if}
    {:else}
      <p>Loading</p>
    {/if}

    <h4>Priraď rolu ISO</h4>
    <form on:submit|preventDefault={bindISO}>
      <div class="row">
        <div class="col-3">
          <select class="form-select" bind:value={humanId}>
            <option value="" disabled selected>Zvoľ si osobu</option>
            {#if humanList}
              {#each humanList as human}
                <option value={human.id}
                  >{human.firstName} {human.lastName}
                </option>,
              {/each}
            {/if}
          </select>
        </div>
        <div class="col">
          <input
            type="submit"
            class="btn btn-primary"
            value="Nastav rolu ISO"
          />
        </div>
      </div>
    </form>
    <hr />
    <h4>Vytvor nového človeka</h4>
    <form on:submit|preventDefault={createHuman}>
      <div class="row">
        <div class="col-4">
          <label for="firstName" class="form-label">Meno</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            bind:value={firstName}
          />
        </div>
        <div class="col-4">
          <label for="lastName">Priezvisko</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            bind:value={lastName}
          />
        </div>
        <div class="col">
          <input type="submit" class="btn btn-primary" value="Vytvor" />
        </div>
      </div>
    </form>
  </div>
</div>
