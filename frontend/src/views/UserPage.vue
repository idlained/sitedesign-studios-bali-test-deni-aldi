<template>
  <div class="user-page">
    <h2 class="title">User List</h2>

    <!-- Tombol Add -->
    <button class="btn btn-add" @click="openAddForm">Add User</button>

    <!-- Modal Form -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditMode ? "Edit User" : "Add New User" }}</h3>
        <form @submit.prevent="submitForm">
          <input v-model="form.name" type="text" placeholder="Name" required />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            :required="!isEditMode"
          />
          <div class="modal-actions">
            <button type="submit" class="btn btn-save">
              {{ isEditMode ? "Update" : "Save" }}
            </button>
            <button type="button" class="btn btn-cancel" @click="closeForm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal" class="modal-overlay">
      <div class="modal-content">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {{ selectedUser.name }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Status:</strong> {{ selectedUser.status || "Active" }}</p>
        <div class="modal-actions">
          <button class="btn btn-cancel" @click="showViewModal = false">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user._id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status || "Active" }}</td>
            <td>
              <button class="btn btn-view" @click="viewUser(user)">View</button>
              <button class="btn btn-update" @click="openEditForm(user)">
                Update
              </button>
              <button class="btn btn-delete" @click="deleteUser(user._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      socket: io("http://localhost:3000"),
      selectedUser: null,
      showViewModal: false,
      users: [],
      showForm: false,
      isEditMode: false,
      selectedUserId: null,
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    fetchUsers() {
      axios
        .get("http://localhost:3000/api/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.users = res.data;
        });
    },
    openAddForm() {
      this.resetForm();
      this.isEditMode = false;
      this.showForm = true;
    },
    openEditForm(user) {
      this.isEditMode = true;
      this.selectedUserId = user._id;
      this.form = {
        name: user.name,
        email: user.email,
        password: "", // Kosongkan password agar tidak overwrite kecuali diisi
      };
      this.showForm = true;
    },
    viewUser(user) {
      this.selectedUser = user;
      this.showViewModal = true;
    },
    closeForm() {
      this.showForm = false;
      this.resetForm();
    },
    resetForm() {
      this.form = { name: "", email: "", password: "" };
      this.selectedUserId = null;
    },
    submitForm() {
      const url = this.isEditMode
        ? `http://localhost:3000/api/users/${this.selectedUserId}`
        : "http://localhost:3000/api/users";

      const method = this.isEditMode ? "put" : "post";

      // Jika edit dan password kosong, hapus dari payload agar tidak ter-reset
      const payload = { ...this.form };
      if (this.isEditMode && !payload.password) {
        delete payload.password;
      }

      axios({
        method,
        url,
        data: payload,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(() => {
          this.fetchUsers();
          this.closeForm();
        })
        .catch((err) => {
          alert("Error: " + err.response?.data?.message || err.message);
        });
    },
    deleteUser(id) {
      if (confirm("Are you sure?")) {
        axios
          .delete(`http://localhost:3000/api/users/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.fetchUsers();
          })
          .catch((err) => {
            alert(
              "Failed to delete user: " +
                (err.response?.data?.message || err.message)
            );
            console.error(err);
          });
      }
    },
  },
  created() {
    this.fetchUsers();

    this.socket.on("user:created", (user) => {
      this.users.push(user);
    });

    this.socket.on("user:updated", (updatedUser) => {
      const index = this.users.findIndex((u) => u._id === updatedUser._id);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
      }
    });

    this.socket.on("user:deleted", (deletedUser) => {
      this.users = this.users.filter((u) => u._id !== deletedUser._id);
    });
  },

  beforeUnmount() {
    this.socket.disconnect();
  },
};
</script>
<style scoped>
.user-page {
  padding: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #ddd;
}

.user-table th,
.user-table td {
  padding: 10px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f9f9f9;
  font-weight: 600;
}

.btn {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px;
  font-size: 14px;
}

.btn-update {
  background-color: #007bff;
  color: white;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-add {
  background-color: #28a745;
  color: white;
  margin-bottom: 15px;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  width: 400px;
}

.modal-content input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-save {
  background-color: #007bff;
  color: white;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  margin-left: 10px;
}

.btn-view {
  background-color: #17a2b8;
  color: white;
}
</style>
