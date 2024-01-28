<template>
  <main>
    <h2>Today Tasks</h2>
    <section class="Todo">
      <task-form @task-added="handleTaskAdded"></task-form>
      <tasks-view :tasks="tasks"></tasks-view>
    </section>
  </main>
</template>
<script>
import taskForm from '../components/formsComponents/taskForm.vue'
import tasksView from '../components/formsComponents/tasksView.vue'

export default{
  components:{
    taskForm,
    tasksView
  },
  data(){
    return{
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  methods:{
    handleTaskAdded(newTask){
      this.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
  
}

</script>
<style scoped>
     main{
      width: calc(100% - 10rem);
      padding: 2rem;
      
    } 
  
</style>