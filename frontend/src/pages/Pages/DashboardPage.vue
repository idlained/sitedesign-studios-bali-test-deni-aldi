<!-- eslint-disable prettier/prettier -->
 <template>
    <div class="container mt-5">
      <h3>Total Users: {{ total }}</h3>
    </div>
  </template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      total: 0,
    };
  },
  async created() {
    const res = await api.get("/users");
    this.total = res.data.length;
  },
};
</script>
