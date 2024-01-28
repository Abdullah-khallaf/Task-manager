<template>
  <nav class="navbar">

    <!--user info styling-->
    <div class="user-info">
      <img class="user-image" src="src/assets/person.jpg" alt="user-image" />
      <span class="user-name">User Name</span>
    </div>

    <!--nav items styling-->
    <ul class="nav-items">
      <li class="nav-item">
        <router-link :to="{name: 'todaytasks'}" class="nav-link">
          <i class="bi bi-check-square-fill"></i
          ><span class="link-text">Today Tasks</span></router-link>
      </li>
      <li class="nav-item">
        <router-link to="Calendar" class="nav-link"
          ><i class="bi bi-calendar3"></i
          ><span class="link-text">Calendar</span></router-link>
        
      </li>
      <li class="nav-item">
        <router-link to="Habits" class="nav-link"
          ><i class="bi bi-alarm-fill"></i
          ><span class="link-text">Habits</span></router-link>
        
      </li>
      <li class="nav-item">
        <router-link to="Lists" class="nav-link"
          ><i class="bi bi-list-ul"></i><span class="link-text">Lists</span></router-link>
        
      </li>
      
    </ul>
    <!--nav last-items styling-->
  <ul class="nav-items last-Items">
    <li class="nav-item">
        <router-link to="#" class="nav-link"
          ><i class="bi bi-moon-stars-fill"></i
          ><span class="link-text">Dark</span></router-link>
        
      </li>
      <li class="nav-item">
        <router-link to="#" class="nav-link"
          ><i class="bi bi-box-arrow-left"></i
          ><span class="link-text">Log Out</span></router-link>
      
      </li>
  </ul>
  </nav>
</template>

<script>
export default {
  
};
</script>

<style>

/* NavBar Main Style  */
.navbar {
  width: 10rem;
  height: 100vh;

  background-color: #f1f4ff;
  color: #9b9ca3;

  position: fixed;
  display: flex;
  flex-direction: column;
}

/* Nav-items (Ul) main style */
.nav-items {
  list-style: none;

  width: 100%;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;

}

.last-Items{
  margin-top: 60%;
}

/* Nav-item & elements Main Style */
.nav-item {
  width: 100%;
}

.nav-link {
  height: 3rem;
  display: flex;
  align-items: center;

  text-decoration: none;
  
}
.bi {
  font-size: 1.2rem;
  margin: 0rem 1.5rem;
}


/* Nav-item & elements Hover Style */

.nav-item:hover{
  background-color: #dadde7;
}

.nav-item:hover .bi, 
.nav-item:hover .link-text{
  color:#616163;
}

.nav-item:active .bi, 
.nav-item:active .link-text{
  color:#4772fa;
}

.nav-item:focus .bi, 
.nav-item:focus .link-text{
  color:#4772fa;
}

/* User Info Style */
.user-info {
  height: 2rem;
  padding: 0;
  margin: 2rem auto 0rem auto;
  
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-image {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
  border-radius: 10px;
}
.user-name {
  font-size: 1rem;
}

</style>
