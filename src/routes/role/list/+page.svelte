<script lang="ts">
  import { onMount } from "svelte";
  let roleList: any;
  function loadRoles() {
    fetch("/svc/role/list")
      .then((response) => response.json())
      .then((json) => (roleList = json));
  }
  onMount(() => {
    loadRoles();
  });

  let roleName: string;
  async function createRole() {
    const res = await fetch("/svc/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: roleName }),
    });
    const text = await res.text();
    alert(text);

    loadRoles();
  }
</script>

<body>
  <table class="table">
    <caption> role list </caption>
    <tr>
      <th> ID </th>
      <th> role name </th>
      <th> humans </th>
    </tr>
    {#if roleList}
      {#each roleList as role}
        <tr>
          <td> {role.id} </td>
          <td> {role.name} </td>
          {#each role.humans as human}
            <span> {human.firstName} {human.lastName}, </span>
          {/each}
        </tr>
      {/each}
    {/if}
  </table>
  <form on:submit|preventDefault={createRole}>
    <label for="name" class="form-label">role name:</label>
    <input
      type="text"
      class="form-control"
      id="name"
      bind:value={roleName}
    /><br />
    <button type="submit" class="btn btn-primary"> Create role </button>
  </form>
  <hr />
  <script>
  </script>
</body>
