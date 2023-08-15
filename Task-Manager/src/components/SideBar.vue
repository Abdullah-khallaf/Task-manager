<template>
    <!--<div class="sidebar">
        <div class="logo">
        <img src="../assets/logo.png" alt="logo" />
        </div>
        <div class="menu">
        <ul>
            <li>
            <router-link to="/">Home</router-link>
            </li>
            <li>
            <router-link to="/login">Login</router-link>
            </li>
            <li>
            <router-link to="/signup">Signup</router-link>
            </li>
        </ul>
        </div>
    </div>-->
    
    <div>
        <p>
            number Of Words = {{ numberOfWords }}
        </p>
    </div>
</template>

<script>
    export default{
        computed:{
            numberOfWords(){
                return 10
            }
        }
    }
</script>

<style>

</style>