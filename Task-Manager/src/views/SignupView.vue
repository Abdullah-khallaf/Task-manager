<template>
    <div>
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your e-mail"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('https://your-backend-server.com/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password
            })
          });
  
          if (!response.ok) {
            throw new Error('Signup failed.');
          }
  
          const data = await response.json();
  
          // Perform further actions, like displaying a success message to the user, navigating to another page, etc.
          // For now, let's just log the response for successful signup
          console.log('Signup Successful!', data);
        } catch (error) {
          // Handle signup error, display error message to the user, etc.
          console.error('Signup Failed:', error.message);
        }
      }
    }
  };
  </script>
  