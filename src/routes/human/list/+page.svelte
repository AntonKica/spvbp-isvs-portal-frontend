<script lang="ts">
  import { onMount } from "svelte";
  let humanList: any;
  function loadHumans() {
    fetch("/svc/human/list")
      .then((response) => response.json())
      .then((json) => (humanList = json));
  }
  onMount(() => {
    loadHumans();
  });

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

    loadHumans();
  }
</script>

<body>
  <table class="table">
    <caption> human list </caption>
    <tr>
      <th> ID </th>
      <th> First name </th>
      <th> Last name </th>
      <th> Roles </th>
      <th> </th>
    </tr>
    {#if humanList}
      {#each humanList as human}
        <tr>
          <td> {human.id} </td>
          <td> {human.firstName} </td>
          <td> {human.lastName} </td>
          <td>
            {#each human.roles as role}
              <span>{role.name}, </span>
            {/each}
          </td>
          <td> <a href="/human/view/{human.id}"> view </a></td>
        </tr>
      {/each}
    {/if}
  </table>
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
  <hr />
  <script>
  </script>
</body>
