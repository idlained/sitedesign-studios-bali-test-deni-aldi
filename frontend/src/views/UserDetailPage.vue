<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserDetailPage",
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const userId = this.$route.params.id;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${userId}`
      );
      this.user = response.data.data; // jika pakai resource Laravel
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
