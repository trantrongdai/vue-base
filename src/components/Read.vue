<template>

<div class="container">
  <h2>User List</h2>          
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Class</th>
        <th>Roll Number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in users" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.clazz.name}}</td>
         <td>{{item.rollNumber}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import CRUDService from "../services/CRUDService";

export default {
  name: "add-tutorial",
  data() {
    return {
      users: []
    };
  },
  mounted() {
      this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      let data = {};
      CRUDService.getUsers(data)
        .then(response => {
          let responseData = response.data;
          if (responseData !== null && responseData.data != null) {
            this.users = responseData.data.data;
          }
          console.log(this.users)
        })
        .catch(e => {
          console.error(e);
        });
    },
  }
};
</script>