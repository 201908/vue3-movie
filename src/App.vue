<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
.disabled .weui-input {
  text-fill-color: #888;
  -webkit-text-fill-color: #888;
  /* Override iOS / Android font color change */
  opacity: 1;
  /* Override iOS opacity change affecting text & background color */
}
#app{
  font-size: 14px;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
