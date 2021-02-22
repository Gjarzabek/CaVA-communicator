<template>
  <!--
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/main">Main</router-link>
  </div>-->
  <router-view />
</template>

<style>

@font-face {
    font-family: NovaFlat;
    src: url(assets/NovaFlat-Regular.ttf);
}

@font-face {
    font-family: NovaCut;
    src: url(assets/NovaCut-Regular.ttf);
}

@font-face {
    font-family: NovaScript;
    src: url(assets/NovaScript-Regular.ttf);
}

@font-face {
    font-family: NovaSquare;
    src: url(assets/NovaSquare-Regular.ttf);
}

body {
    background-color: #242222;
}

.online {
    background-color: #83DF5E;
}

.offline {
    background-color: #D94444;
}

.brb {
    background-color: #E1A244;
}

#app {
  font-family: NovaFlat, NovaCut, NovaScript, NovaSquare;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
}
</style>
