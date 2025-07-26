<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">LOGIN APP</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await api.post("/login", this.form);
        localStorage.setItem("token", res.data.token);
        this.$router.push("/dashboard"); // redirect to actual dashboard route
      } catch (err) {
        alert("Login gagal: " + (err.response?.data?.message || err.message));
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* border: 1px solid black; */
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px 20px;
  text-align: center;
}

.title {
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-form input {
  padding: 10px;
  border: 1px solid black;
  font-size: 14px;
}

.login-form button {
  padding: 8px 16px;
  font-size: 14px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
  margin-top: 10px;
  align-self: center;
}
</style>
