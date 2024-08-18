<template>
    <div id="app">
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/editor">New Project</router-link></li>
        </ul>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
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