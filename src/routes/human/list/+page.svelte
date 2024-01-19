<script lang="ts">
  export let data: any;
  import HumanForm from "$lib/HumanForm.svelte";
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
    {#each data.humanList as human}
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
  </table>
  <hr />
  <HumanForm />
</body>
