<template>
  <ol class="tasksList">
    <li> That is an initial li</li>
      <li v-for="task in tasks " :key="task.id">

          <span :class="{ important: task.isImportant, checked:task.isChecked }">{{ task.title }}</span>
          <button @click="editTask(task.id)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button> 
          <button @click="toggleImportant(task.id)">Toggle Important</button>
          <button @click="toggleCheck(task.id)"> Check </button>

      </li>
 </ol>
</template>

<script>
export default {
    props:{
        tasks: {
            type: Array,
            required: true,
        }
    },
    methods:{
    editTask(id){
      const taskToedit = this.tasks.find((task)=> task.id ===id);

      if(taskToedit){ // if the task is found 
        const newTitle = prompt('Enter new title', taskToedit.title);
        taskToedit.title = newTitle;
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    // deleteTask(id){
    //   const updatedTasks = this.tasks.filter(task => task.id !== id); // filter is making a new array called updated tasks with all tasks except the one that equal to the id
    //   this.tasks = updatedTasks; // filter is immutable function
      
    //   localStorage.setItem('tasks',JSON.stringify(this.tasks));
    // },

    deleteTask(id){
        const index = this.tasks.findIndex((task)=> task.id ===id);
        if(index !== -1){
            this.tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    },
    toggleImportant(id){
      const task = this.tasks.find((task) => task.id === id);
      task.isImportant = !task.isImportant;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    toggleCheck(id){
      const task = this.tasks.find((task) => task.id === id);
      
        task.isChecked = !task.isChecked;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        console.log("Task Checked");
      
    }
    }
}
</script>

<style>
    .tasksList{
        background-color: #f1f4ff;
        color: #9b9ca3;
    }
    .important{
    color: red;
    font-weight: bold;
  }
  .checked{
    text-decoration: line-through;
  }
</style>