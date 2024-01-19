<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import HumanForm from "$lib/HumanForm.svelte";

  /** @type {import('./$types').PageLoad} */
  export let data: any;
  let businessProcessName: string;
  let goals: string;
  let information: string;
  let contactId: string;

  async function createBusinessProcess() {
    const create = await fetch(`/svc/businessProcess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: businessProcessName,
        goals: goals,
        information: information,
        contact: { id: contactId },
      }),
    });
    const businessProcessId = create.headers.get("Location").split("/").pop();
    const res = await fetch(
      `/svc/human/${contactId}/attach/businessProcess/${businessProcessId}`,
      {
        method: "POST",
      },
    );
    const text = await res.text();
    alert(text);

    invalidateAll();
  }
</script>

<title>Návrh a plán bezpečnostného procesu</title>
<h1 class="display-1">Návrh a plán bezpečnostného procesu</h1>
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
          <td> 3.2 Designing and planning the security process </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<br />
<br />

<h2>Vymedzenie podmienok</h2>
Zo začiatku je dobré si spraviť širokú analýzu prítomných procesov vo vašej organizácií.
Aký je ich cieľ, ktoré informácie spracovávajú a kontaktnú osobu pre daný proces.
<br />
<hr />
<br />
<table class="table table-striped">
  <caption> Zoznam procesov </caption>
  <thead>
    <tr>
      <th> Nazov </th>
      <th> Ciele </th>
      <th> Informacie </th>
      <th> Vlastnik </th>
      <th> </th>
    </tr>
  </thead>
  <tbody>
    {#each data.businessProcesses as businessProcess}
      <tr>
        <td> {businessProcess.name} </td>
        <td> {businessProcess.goals} </td>
        <td> {businessProcess.information} </td>
        <td>
          {businessProcess.contact.firstName}
          {businessProcess.contact.lastName}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="border border-2 rounded m-2 p-2 d-grid gap-2">
  <form on:submit|preventDefault={createBusinessProcess}>
    <h3>Nový proces</h3>
    <div class="form-group row p-2">
      <label for="businessProcessName" class="form-label col-2"
        >Názov procesu</label
      >
      <div class="col-4">
        <input
          class="form-control"
          id="businessProcessName"
          bind:value={businessProcessName}
        />
      </div>
    </div>
    <div class="form-group row p-2">
      <label for="goals" class="form-label col-2">Ciele procesu</label>
      <div class="col-10">
        <input class="form-control" id="goals" bind:value={goals} />
      </div>
    </div>
    <div class="form-group row p-2">
      <label for="information" class="form-label col-2"
        >Spracovaváne informácie</label
      >
      <div class="col-10">
        <input class="form-control" id="information" bind:value={information} />
      </div>
    </div>
    <div class="form-group row p-2">
      <label for="contact" class="form-label col-2">Kontaktná osoba</label>
      <div class="col-4">
        <select class="form-select" bind:value={contactId} id="owner">
          <option value="" disabled selected>Zvoľ si reprezentanta</option>
          {#each data.humans as human}
            <option value={human.id}
              >{human.firstName} {human.lastName}
            </option>,
          {/each}
        </select>
      </div>
    </div>
    <br />
    <div class="form-group row justify-content-end m-2">
      <input
        type="submit"
        class="btn btn-primary col"
        value="Pridaj nový proces"
      />
    </div>
  </form>
</div>
<br />
<br />
Ak sa ešte kontaktná osoba nenachádza v systéme, pridaj ju.
<HumanForm />
Bezpečnostné požiadavky by mali by byť v súlade s úlohami vašej organizácie.
