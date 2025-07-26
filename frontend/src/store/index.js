import Vue from "vue";
import Vuex from "vuex";
import API from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await API.get("/users");
        commit("setUsers", response.data);
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    },
  },
});
