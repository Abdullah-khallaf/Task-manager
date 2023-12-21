<template>
  <main>
    <section class="Left-Logo">
      <img src="../assets/K-logo.png" alt="logo for Kh app your place to make todo easy">
    </section>
    <section class="right-login-form">
      <h1>Hi Let's Go Through Your Tasks</h1>
      <form>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Enter Your Email" v-model="userName">

        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Enter Your Password" v-model="password">

        <button type="submit">Login</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  data(){
    return{
      userName:" ",
      password:" ",
    }
  }
}
</script>

<style>
  body{
    background-color: #FFFFFF;
  }
  main{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
  }
  .left-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:red ;
    text-align: center;
    width: 50%;
  }
  .right-login-form{
    background-color:blue;
    text-align: center;
    width: 50%;
  }
</style>