<template>
  <div>
    <h1>Main Page View</h1>
    <div>
      <input type="text" v-model="newTask" placeholder="Enter a new task" />
      <button @click="addTask()">Add Task</button>
    </div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ important: task.important }">{{ task.title }}</span>
        <button @click="editTask(task.id)">Edit</button>
        <button @click="deleteTask(task.id)">Delete</button>
        <button @click="markImportant(task.id)">Mark Important</button>
      </li>
    </ul>
  </div>

           
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  async mounted() {
    // Fetch the tasks from the backend when the component is mounted
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('/link');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    },
    async addTask() {
      try {
        if (!this.newTask.trim()) {
          return; 
        }
        const response = await axios.post('link', {
          title: this.newTask,
          important: false
        });
        this.tasks.push(response.data);
        this.newTask = ''; 
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    },
    async editTask(id) {
      // Implement edit task functionality
      // You can use a dialog/modal to edit the task details
      console.log('Edit task with ID:', id);
    },
    async deleteTask(id) {
      try {
        await axios.delete(`https://your-backend-server.com/api/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error('Error deleting task:', error.message);
      }
    },
    async markImportant(id) {
      try {
        await axios.put(`https://your-backend-server.com/api/tasks/${id}/mark-important`);
        // Update the task importance locally
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].important = true;
        }
      } catch (error) {
        console.error('Error marking task as important:', error.message);
      }
    }
  }
};
</script>

<style scoped>
    .important {
      color: red;
      font-weight: bold;
}
</style>