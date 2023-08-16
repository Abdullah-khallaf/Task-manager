<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username or E-mail</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username or e-mail"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <div>
      <a href="#">Forgot Password?</a>
      <a href="#" @click="goToSignup">Sign Up</a>
    </div>
  </div>
</template>






<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch(
          "https://your-backend-server.com/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed.");
        }

        const data = await response.json();

        // Assuming the backend responds with a token upon successful login
        const token = data.token;

        // Perform further actions, like storing the token in localStorage or Vuex store
        // For now, let's just log the response for successful login
        console.log("Login Successful!", data);
      } catch (error) {
        // Handle login error, display error message to the user, etc.
        console.error("Login Failed:", error.message);
      }
    },
    goToSignup() {
      // Emit an event to the parent component or use Vue Router to navigate to the Signup view
      // For now, let's just log the message
      console.log("Go to Signup page");
    },
  },
};
</script>
