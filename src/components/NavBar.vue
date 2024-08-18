<script setup>
    import { getAuth } from 'firebase/auth';
    const auth = getAuth();
    const user = auth.currentUser;
</script>
<template>
    <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/editor">Blank</router-link></li>
          <li><router-link to="/account">{{user === null || !user.emailVerified ? "Sign In" : "Account"}}</router-link></li>
          <li v-if="user !== null && user.emailVerified"><router-link to="/projects">My Projects</router-link></li>
        </ul>
    </nav>
</template>
<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: inline;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #42b983;
}

a.router-link-active {
  font-weight: bold;
}
</style>  