<template>
  <div>
    <Navi v-if="!appOpened" @login="showLogin"/>
    <router-view :user="user"/>
    <LoginPanel v-if="!appOpened"
    :show="loginVisable"
    :loginState="loginStatus"
    :registerState="registerStatus"
    @hideLogin="hideLogin"
    @login="loginRequest"
    @register="registerRequest"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from "@/components/LandingPage/LoginPanel.vue";
import Navi from "@/components/LandingPage/Navi.vue";
import {HttpClient} from "@/ts_classes/HttpClient";

export default defineComponent({
    props: [],
    components: {Navi, LoginPanel},
    data() {
      return {
        loginVisable:false,
        user: {id:'000000', name:"Grzesiek", status:"dostępny", desc:"Hej Wszystkim!", icon:"bird"},
        httpClient: new HttpClient(),
        loginStatus: 'out',
        registerStatus: ''
      };
    },
    methods: {
      showLogin() {
        this.loginVisable = true;
      },
      hideLogin() {
        this.loginVisable = false;
        console.log("Hide login:", this.loginVisable);
      },
      loginRequest(user: Map<string, string>) {
        this.httpClient.login(user);
      },
      registerRequest(user: Map<string, string>) {
        this.registerStatus = "loading";
        this.httpClient.register(user, ()=>{this.registerStatus="succeed"}, ()=>{this.registerStatus="failed"});
      }
    },
    computed: {
      appOpened: function() : boolean {
        console.log(this.$route.name);
        return this.$route.name === "Main";
      }
    }
})
</script>

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

@font-face {
    font-family: Sen;
    src: url(assets/Sen-Regular.ttf);
}

body {
  background-color: #1d1d1d;
}

.arrow {
  transition: 0.2s;
  border: solid #C6BDBD;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-bottom: 1%;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.down {
  transform: rotate(45deg);
  margin-bottom: 2%;
  -webkit-transform: rotate(45deg);
}
  
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.dostępny {
  background-color: #63dd33;
}

.niedostępny {
  background-color: #0f0f0f;
}

.zaraz-wracam {
  background-color: #ff9900;
}

.zajęty {
  background-color: #e64444;
}

#app {
  font-family: NovaFlat, NovaCut, NovaScript, NovaSquare;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  cursor:default;
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
