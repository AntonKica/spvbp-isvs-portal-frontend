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

<title>Podklady pre ISMS</title>
<div class="row justify-content-md-center">
  <div class="col-8">
    <h1 class="display-1">Podklady pre ISMS</h1>
    <div class="row">
      <h4>
        <span class="text-info"> Prečítaj si viac </span>
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
    <ul class="list-group">
      <li class="list-group-item">
        Vedenie organizácie MUSÍ prijať celkovú zodpovednosť za kybernetickú a
        informačnú bezpečnosť v organizácií a to takým spôsobom, aby to bolo
        jasné všetkým zainteresovaným stranám.
      </li>
      <li class="list-group-item">
        Vedenie organizácie MUSÍ iniciovať, riadiť a monitorovať bezpečnostný
        proces.
      </li>
      <li class="list-group-item">
        Vedenie organizácie MUSÍ byť dobrým príkladom pri dodržiavaní
        požiadaviek (neskôr opatrení) KIB.
      </li>
      <li class="list-group-item">
        Vedenie organizácie MUSÍ vymenovať zamestnancov zodpovedných za KIB,
        poskytnúť im potrebné oprávnenia a zdroje.
      </li>
      <li class="list-group-item">
        Vedenie organizácie MUSÍ pravidelne dostávať informácie o stave KIB v
        organizácií, najmä informácie o stave KIB v organizácií, možných
        rizikách vyplývajúcich z chýbajúcich alebo nedostatočných bezpečnostných
        opatrení.
      </li>
    </ul>
    <br />
    <h2>Akčne kroky</h2>
    <ol class="list-group list-group-numbered">
      <li class="list-group-item">
        Vedenie organizácie prevezme plnú zodpovednosti za KIB
      </li>
      <li class="list-group-item">
        Vedenie organizácie iniciuje KIB v organizácií.
      </li>
      <li class="list-group-item">
        Vedenie organizácie vymenuje manažéra KIB.
      </li>
      <li class="list-group-item">
        Vedenie organizácie je v regulárnych intervaloch informované ohľadom
        prípadných rizík a dôsledkov nedostatku KIB.
      </li>
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
      <div class="col">
        <h4>Alebo ešte pridaj nového človeka</h4>
        <form on:submit|preventDefault={createHuman}>
          <label for="firstName" class="form-label">Meno</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            bind:value={firstName}
          />
          <label for="lastName">Priezvisko</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            bind:value={lastName}
          />
          <br />
          <input type="submit" class="btn btn-primary" value="Pridaj človeka" />
        </form>
      </div>
    </div>
  </div>
</div>
