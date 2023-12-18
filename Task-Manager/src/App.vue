<template>
  <div class="App">
    <side-bar></side-bar>

    <router-view>
    </router-view>

  </div>
</template>


<script setup>
import SideBar from './components/SideBar.vue'
</script>



<style scoped>
.App{
  display:flex;
  flex-direction: row;  
}
main{
  background-color: black;
}
</style> 