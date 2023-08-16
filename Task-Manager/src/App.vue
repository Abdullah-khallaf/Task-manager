<template>
  <div class="App">
    <h1>
      Todo list 
    </h1>
    <SideBar/>
  </div>
</template>


<script setup>
import SideBar from './components/SideBar.vue'
 //import Home from './views/Home.vue';

  
</script>



<style scoped>
  h1{
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    font-weight: bold;
    }
    .App{
      padding: 20px;
      background-color: red;
    }

</style> 