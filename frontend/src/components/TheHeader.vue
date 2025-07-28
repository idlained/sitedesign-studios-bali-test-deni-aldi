<template>
  <header class="topbar">
    <div class="left-section">
      <button class="sidebar-toggle" @click="$emit('toggleSidebar')">☰</button>
      <div class="logo"><img :src="Logo" style="width: 100px" /></div>
    </div>
    <button class="logout" @click="logout">Logout</button>
  </header>
</template>

<script>
import Logo from "@/assets/sitedesign-logo.jpg";
export default {
  data() {
    return {
      Logo: Logo, // Makes the imported logo available to the template
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login"); // if using Vue Router
    },
  },
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white !important;
  border-bottom: 1px solid #000;
  padding: 10px 20px;
  height: 60px;
}

/* Sidebar toggle and logo grouped */
.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Toggle button styling */
.sidebar-toggle {
  background-color: transparent;
  color: black;
  border: none;
  padding: 6px 10px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
}

/* Logo and logout styles (unchanged) */
.logo {
  font-weight: bold;
  font-size: 18px;
}
.logout {
  border: 1px solid #000;
  padding: 5px 10px;
  background: transparent;
  color: black;
  cursor: pointer;
}
</style>
