document.addEventListener('htmx:afterRequest', evt => {
  alert(evt.detail.xhr.responseText)
  if(evt.detail.successful) {
    window.location.reload()
  }
})

function listHumans() {
  fetch('http://spvbp-isvs.local/svc/human/list')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      var str = `<table class="table">
        <caption> Human list </caption>
        <tr>
        <th> ID </th>
        <th> First name</th>
        <th> Last name</th>
        <th> Roles </th>
        </tr>
        `

      data.forEach(entity => {
        roles = ""
        if(entity.roles) {
          roles = entity.roles.map(role => role.name + ';')
        }
        str += `
          <tr>
          <td> ${entity.id} </td>
          <td> ${entity.firstName} </td>
          <td> ${entity.lastName} </td>
          <td> ${roles} </td>
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
fetch('http://spvbp-isvs.local/svc/asset/list')
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
fetch('http://spvbp-isvs.local/svc/role/list')
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
