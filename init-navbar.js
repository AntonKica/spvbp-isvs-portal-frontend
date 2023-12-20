document.addEventListener("DOMContentLoaded", () => {
  let navbar = document.createElement('custom-navbar')
  navbar.innerHTML= `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
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

