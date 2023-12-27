<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  const humanId = $page.params.humanId;
  let human: any;
  let availableRoles: any[];

  function loadHuman() {
    fetch(`/svc/human/${humanId}`)
      .then((response) => response.json())
      .then((json) => {
        human = json;

        const roleIds: number[] = human.roles.map((role) => role.id);
        fetch("/svc/role/list")
          .then((response) => response.json())
          .then((roles) => roles.filter((role) => !roleIds.includes(role.id)))
          .then((roles) => (availableRoles = roles));
      });
  }
  onMount(() => {
    loadHuman();
  });

  async function unbindRole(roleId: number) {
    const res = await fetch(`/svc/human/${humanId}/unbind/role/${roleId}`, {
      method: "POST",
    });
    const text = await res.text();
    alert(text);

    loadHuman();
  }

  let roleId: number;
  async function bindRole() {
    const res = await fetch(`/svc/human/${humanId}/bind/role/${roleId}`, {
      method: "POST",
    });
    const text = await res.text();
    alert(text);

    loadHuman();
  }
</script>

{#if human}
  <div class="row p-3">
    <div class="col bg-primary rounded">
      <span class="text-white fs-2"> Meno: </span>
    </div>
    <div class="col">
      <span class="text-primary fs-2"> {human.firstName} </span>
    </div>
  </div>
  <div class="row p-3">
    <div class="col bg-primary rounded">
      <span class="text-white fs-2"> Priezvisko: </span>
    </div>
    <div class="col">
      <span class="text-primary fs-2"> {human.lastName} </span>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Priradene role</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {#each human.roles as role}
        <tr>
          <td>{role.name}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              on:click|preventDefault={unbindRole(role.id)}>remove</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>Loading...</p>
{/if}
<hr />

{#if availableRoles}
  <form on:submit|preventDefault={bindRole}>
    <div class="row">
      <div class="col-3">
        <select class="form-select" bind:value={roleId}>
          <option value="" disabled selected>Zvoľ si rolu</option>
          {#if availableRoles}
            {#each availableRoles as role}
              <option value={role.id}>{role.name} </option>,
            {/each}
          {/if}
        </select>
      </div>
      <div class="col">
        <input type="submit" class="btn btn-primary" value="Nastav rolu" />
      </div>
    </div>
  </form>
{/if}
