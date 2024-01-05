<div class="row align-items-start">
  <div class="col-2">
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">spvbp-isvs</a> -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <hr />
          <li>
            <a class="dropdown-item" href="/tutorial/01-initiation"
              >1 - Initiation</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="/tutorial/02-scope">2 - Scope</a>
          </li>
          <hr />
          <li class="nav-item">
            <a class="nav-link" href="/human/list">Ľudia</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/asset/list">Assets</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/role/list">Role</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="col-9">
    <slot />
  </div>
</div>

<style>
  nav {
    height: 100%;
  }
</style>
