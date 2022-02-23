<template>
  <div v-if="currentStudent != null" class="edit-form">
    <h4>Student</h4>
    <form id="edit-form" @submit.prevent="updateStudent">
      <div class="form-group Student-form">
        <label for="description">Name</label>
        <input
          class="form-control"
          id="name"
          required
          v-model="currentStudent.name"
          name="name"
        />
      </div>

      <div class="form-group Student-form">
        <label for="description">Class</label> <br>
        <select class="form-select" v-model="selectedClazzId" @change="changeClazz($event)" required>
          <option disabled value="">Please select one</option>
          <option v-for="clazz in clazzes"  v-bind:value="clazz.id" v-bind:key="clazz.name">{{ clazz.name }}</option> 
        </select>
      </div>

      <div class="form-group Student-form edit-form-button">
        <button class="badge btn-danger mr-2 custom-btn"
          @click="deleteStudent"
        >
          Delete
        </button>
        <button type="submit" class="badge btn-success custom-btn" style="margin-left:3px">
          Update
        </button>
      </div>
    </form>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Student...</p>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
import ClazzService from "../services/ClazzService";

export default {
  name: "Student",
  data() {
    return {
      currentStudent: null,
      message: '',
      selectedClazzId: null,
      clazzes: null,
    };
  },
  mounted() {
    this.message = '';
    this.getAllClass();
    this.getStudent(this.$route.params.id);
  },

  methods: {
    getStudent(id) {
      StudentService.getStudentById(id)
        .then(response => {
          this.currentStudent = response.data.data.studentDto;
          console.log("currentStudent" + JSON.stringify(this.currentStudent))
          this.selectedClazzId = this.currentStudent.clazz.id;
          console.log("selectedClazzId" + this.selectedClazzId);
        })
        .catch(e => {
          console.log(e);
        });
    },

    getAllClass() {
      ClazzService.getAll()
        .then(response => {
          let responseData = response.data;
          if (responseData !== null && responseData.data != null) {
            this.clazzes = responseData.data;
          }
          console.log("clazzes" + this.clazzes);
        })
        .catch(e => {
          console.log(e);
        });
    },

    changeClazz(event) {
      this.selectedClazzId = event.target.value;
    },

    updateStudent() {
      this.currentStudent.commune_id = this.selectedCommuneCode;
      StudentService.update(this.currentStudent.id, this.currentStudent)
        .then(response => {
          console.log(response.data);
          this.message = 'The Student was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStudent() {
      StudentService.delete(this.currentStudent.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Students" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

#edit-form {
  margin-bottom: 15px;
}

.Student-form {
  margin-bottom: 2px;
}

.custom-btn {
  font-size: 14px;
}

.edit-form-button {
  margin-top: 15px;
}
</style>
