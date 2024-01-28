<template>
  <form>
    <input type="text" id="taskInput" v-model="newTask" placeholder="Add Task" @keyup.enter="addTask">
    <button @click="addTask()"> Add Task</button>
  </form> 
</template>

<script>


export default{
  data(){
    return{
      newTask : '',
      
    }
  },
  methods: {
    addTask(){
      event.preventDefault(); // to prevent any dafault behavior
      if(!this.newTask.trim()){  // we add this code to take only value and cancel the white input
        return;
      } 
      const newTaskOBJ = {
        id: Date.now(), // it is common to use the date of the new input as an Identifier.
        title: this.newTask, // the title of the new task is the value of the input
        isImportant: false,
        isChecked: false,
      };
    
      this.$emit('task-added', newTaskOBJ); //event to connect the task form with task view
      console.log("Task Added");

      this.newTask = ''; // to clear the input after adding the task
    }
  }
}
 </script>

 <style scoped>
 
</style>

