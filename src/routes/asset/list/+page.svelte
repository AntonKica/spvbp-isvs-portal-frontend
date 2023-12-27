<script lang="ts">
  import { onMount } from "svelte";
  let assetList: any;
  function loadAssets() {
    fetch("/svc/asset/list")
      .then((response) => response.json())
      .then((json) => (assetList = json));
  }
  onMount(() => {
    loadAssets();
  });

  let assetName: string;
  async function createAsset() {
    const res = await fetch("/svc/asset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: assetName }),
    });
    const text = await res.text();
    alert(text);

    loadAssets();
  }
</script>

<body>
  <table class="table">
    <caption> Asset list </caption>
    <tr>
      <th> ID </th>
      <th> Asset name </th>
    </tr>
    {#if assetList}
      {#each assetList as asset}
        <tr>
          <td> {asset.id} </td>
          <td> {asset.name} </td>
        </tr>
      {/each}
    {/if}
  </table>
  <form on:submit|preventDefault={createAsset}>
    <label for="name" class="form-label">Asset name:</label>
    <input
      type="text"
      class="form-control"
      id="name"
      bind:value={assetName}
    /><br />
    <button type="submit" class="btn btn-primary"> Create asset </button>
  </form>
  <hr />
  <script>
  </script>
</body>
