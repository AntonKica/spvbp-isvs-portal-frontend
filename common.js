document.addEventListener("DOMContentLoaded", () => {
  let navbar = document.createElement('custom-navbar')
  navbar.innerHTML= `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">spvbp-isvs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/assets.html">Assets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/humans.html">Humans</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/roles.html">Roles</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Create
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/create/asset.html">Asset</a>
                <a class="dropdown-item" href="/create/human.html">Human</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
    </nav> 
  `

  document.body.insertBefore(navbar, document.body.firstChild);
});

document.addEventListener('htmx:afterRequest', evt => {
  alert(evt.detail.xhr.responseText)
  if(evt.detail.successful) {
    window.location.reload()
  }
})

function listHumans() {
  fetch('/svc/human/list')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      var str = `<table class="table">
        <caption> Human list </caption>
        <tr>
        <th> ID </th>
        <th> First name</th>
        <th> Last name</th>
        <th> Roles </th>
        <th> </th>
        </tr>
        `

      data.forEach(entity => {
        roles = ""
        if(entity.roles) {
          roles = entity.roles.map(role => role.name + ';')
        }
        str += `
          <tr class="clickable-row" data-href="idk">
          <td> ${entity.id} </td>
          <td> ${entity.firstName} </td>
          <td> ${entity.lastName} </td>
          <td> ${roles} </td>
          <td> <a href="/view-human.html?humanId=${entity.id}"> view </a></td>
          </tr>`
      })
      str += `</table>`
      return str
    })
    .then(table => document.getElementById('humans').innerHTML = table)
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data:', error)
    })
}
function listAssets() {
fetch('/svc/asset/list')
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    var str = `<table class="table">
      <caption> Asset list </caption>
      <tr>
      <th> ID </th>
      <th> Asset name </th>
      </tr>
      `

    data.forEach(entity => {
      str += `
        <tr>
        <td> ${entity.id} </td>
        <td> ${entity.name} </td>
        </tr>`
    })
    str += `</table>`
    return str
  })
  .then(table => document.getElementById('assets').innerHTML = table)
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data:', error)
  })
}

function listRoles() {
  fetch('/svc/role/list')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      var str = `<table class="table">
        <caption> Role list </caption>
        <tr>
        <th> ID </th>
        <th> Role name </th>
        <th> Humans </th>
        </tr>
        `

      data.forEach(entity => {
        humans = ""
        if(entity.humans) {
          humans = entity.humans.map(human => `${human.firstName} ${human.lastName};`)
        }
        str += `
          <tr>
          <td> ${entity.id} </td>
          <td> ${entity.name} </td>
          <td> ${humans} </td>
          </tr>`
      })
      str += `</table>`
      return str
    })
    .then(table => document.getElementById('roles').innerHTML = table)
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data:', error)
    })
}
