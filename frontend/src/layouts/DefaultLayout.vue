<template>
  <div class="layout-wrapper">
    <Header
      class="layout-header"
      @toggleSidebar="isSidebarVisible = !isSidebarVisible"
    />

    <div class="layout-body">
      <!-- Sidebar -->
      <Sidebar
        class="layout-sidebar"
        :class="{ 'hide-sidebar': !isSidebarVisible }"
      />

      <!-- Sidebar toggle button -->
      <!-- <button
        class="sidebar-toggle"
        @click="isSidebarVisible = !isSidebarVisible"
      >
        {{ isSidebarVisible ? "«" : "»" }}
      </button> -->

      <!-- Main content -->
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/TheSidebar.vue";
import Header from "@/components/TheHeader.vue";

export default {
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      isSidebarVisible: true,
      isMobile: false,
    };
  },
  mounted() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
  },
  methods: {
    checkScreen() {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
        this.isSidebarVisible = false;
      } else {
        this.isSidebarVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-header {
  height: 60px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
}

.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.layout-sidebar {
  width: 200px;
  background: #f0f0f0;
  padding: 10px;
  border-right: 1px solid #ccc;
  transition: transform 0.3s ease;
}

.layout-sidebar.hide-sidebar {
  transform: translateX(-100%);
  position: absolute;
  z-index: 1000;
  height: 100%;
}

.layout-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.sidebar-toggle {
  width: 30px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 0;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 14px;
  transition: all 0.3s ease;
}

/* Position it next to the sidebar */
.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.layout-sidebar.hide-sidebar + .sidebar-toggle {
  background-color: #555;
}

/* On mobile, position it absolutely so it's visible even when sidebar hidden */
@media (max-width: 768px) {
  .sidebar-toggle {
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 1100;
    height: 40px;
    width: 40px;
    writing-mode: horizontal-tb;
  }
}
</style>
