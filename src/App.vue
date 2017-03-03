<style scoped>
  @import "css/app.css";
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', 'Hiragino Sans GB', Helvetica, Arial, 'Lucida Grande', sans-serif;
    width: 6.4rem;
    margin: 0 auto;
    padding: 0;
    font-size: 0.24rem;
    -webkit-tap-highlight-color: transparent;
    background-color: white;
    color: #404040;
  }
</style>
