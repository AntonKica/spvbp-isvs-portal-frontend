<script lang="ts">
  /** @type {import('./$types').PageServerLoad} */
  export let data: any;
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

  <li class="list-group-item">
    Vedenie organizácie bude v regulárnych intervaloch informované ohľadom
    potenciálnych rizík a dôsledkov nedostatočných opatrení KIB.
  </li>
</ol>
<br />
<hr />

<h4>Pridajte seba do systému</h4>
V systéme sa nachádza základna rola {data.isoRole.name}, videť ju možno v
záložke 'Roles'. Cez záložku 'Ľudia' sa pridajte do systém, rozkliknite sa a
pridajte si rolu {data.isoRole.name}.

<hr />
{#if data.isoHuman}
  <div class="alert alert-success" role="alert">
    <strong>Výborne!</strong>
    Manažér KIB je: {data.isoHuman.firstName}
    {data.isoHuman.lastName}
  </div>
{:else}
  <div class="alert alert-danger" role="alert">
    <strong>Počkaj!</strong>
    Rola manažera KIB nie je nikomu priradená.
  </div>
{/if}
<hr />

<!-- TODO move smwhr else -->
Informujte manažment ohľadom:
<ul>
  <li>bezpečnostných rizík, súvisiacich účinkov a nákladov</li>
  <li>dopad bezpečnostných incidentov na kritické procesy</li>
  <li>bezpečnstných požiadaviek zákona</li>
  <li>štandartných bezpečnostných opatrení, vo vašom odvetví</li>
  <li>súčasny stav KIB v organizácií, na akej úrovní sú aktuálne opatrenia</li>
  <li>vaše odporúćania, ako ďalej konať</li>
</ul>
