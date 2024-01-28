<template>
  <div class="App">
    <side-bar></side-bar>

    <router-view>
    </router-view>

  </div>
</template>


<script setup>
import SideBar from './components/layout/SideBar.vue'
</script>



<style scoped>
.App{
  display: flex;
  /* flex-direction: row;   */
}
/* side-bar{
  width: 10rem;
  height: 100vh;
} */
</style> 