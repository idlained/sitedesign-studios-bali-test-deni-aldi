<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/" exact>Dashboard</router-link>
        </li>
        <li>
          <router-link to="/users" exact>User Management</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #000;
  min-height: 100vh;
  position: relative;
  transition: transform 0.3s ease;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  border-bottom: 1px solid #000;
}

a {
  display: block;
  padding: 15px 20px;
  color: black;
  text-decoration: none;
}

.router-link-exact-active {
  background-color: #ddd;
  font-weight: bold;
}
</style>
