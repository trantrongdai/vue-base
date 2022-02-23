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
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in students" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.clazz.name}}</td>
         <td>{{item.rollNumber}}</td>
         <td>
          <router-link :to="'/student/' + item.id" class="m-3 btn btn-sm btn-info">Edit</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import StudentService from "../services/StudentService";

export default {
  name: "add-tutorial",
  data() {
    return {
      students: []
    };
  },
  mounted() {
      this.getAllStudents();
  },
  methods: {
    getAllStudents() {
      let data = {};
      StudentService.getStudents(data)
        .then(response => {
          let responseData = response.data;
          if (responseData !== null && responseData.data != null) {
            this.students = responseData.data.data;
          }
          console.log(this.students)
        })
        .catch(e => {
          console.error(e);
        });
    },
  }
};
</script>