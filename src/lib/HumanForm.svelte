<script lang="ts">
  import { invalidateAll } from "$app/navigation";
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

    invalidateAll();
  }
</script>

<div class="border border-2 rounded m-2 p-2">
  <h3>Nový človek</h3>
  <form on:submit|preventDefault={createHuman}>
    <div class="form-group row p-2">
      <label for="firstName" class="form-label col-2">Meno</label>
      <div class="col-10">
        <input
          type="text"
          class="form-control"
          id="firstName"
          bind:value={firstName}
        />
      </div>
    </div>
    <div class="form-group row p-2">
      <label for="lastName" class="form-label col-2">Priezvisko</label>
      <div class="col-10">
        <input
          type="text"
          class="form-control"
          id="lastName"
          bind:value={lastName}
        />
      </div>
    </div>
    <div class="form-group row p-2 justify-content-center">
      <input type="submit" class="btn btn-primary m-2" value="Pridaj človeka" />
    </div>
  </form>
</div>
