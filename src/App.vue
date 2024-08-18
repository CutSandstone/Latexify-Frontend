<template>
    <div id="app">
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    async beforeMount() {
      await new Promise(resolve => setTimeout(resolve,1000));
    }
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