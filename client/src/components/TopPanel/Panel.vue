<template>
    <div id="topPanel">
      <UserInfo v-bind:user="user" @statusChange="this.$emit($event)"/>
      <button id="addFriend">Dodaj Znajomego</button>
      <img src="../../assets/notify.png" alt="..." id="notification">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
import UserInfo from '@/components/TopPanel/UserInfo.vue';

export default defineComponent({
  props: ["user"],
  components: {UserInfo},
  methods: {}
})
</script>

<style scoped>

#addFriend {
  text-align: center;
  position: absolute;
  width: 14%;
  height: 46%;
  top: 27%;
  right: 9%;
  box-sizing: border-box;
  background-color: #242222;
  border: none;
  border-radius: 5px;
  color: #EAEAEA;
  font: 2vh NovaScript;
  outline: none;
  transform: scale(1);
  cursor: pointer;
  transition: 0.1s;
}

#addFriend:active {
  transform: scale(0.98);
}

#notification {
  position: absolute;
  right: 3%;
  top: 30%;
  height: 40%;
}

#topPanel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 9%;
    background-color: #96C5CD;
}


</style>