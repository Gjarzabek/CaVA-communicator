<template>
    <div id="topPanel">
      <button id="addFriend">Dodaj Znajomego</button>
      <img src="../../assets/notify.png" alt="..." id="notification">
      <img src="../../assets/chaticon.png" alt="..." id="chatIcon" @click="toogleChatMenu">
      <div v-if="showChatMenu" class="chatMenu">
        <div id="chatMenuTitle">Historia Rozmów</div>
          <div v-for="chat in chats" v-bind:key="chat.id" class="chatsList">
            <ChatItem v-bind:chatData="chat"/>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
import ChatItem from '@/components/TopPanel/ChatItem.vue';

export default defineComponent({
  props: ["chats"],
  components: {ChatItem},
  data() {
    return {
      showChatMenu: false
    }
  },
  methods: {
    toogleChatMenu() {
      this.showChatMenu = !this.showChatMenu;
    }
  }
})
</script>

<style scoped>

#chatMenuTitle {
  position: relative;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 2vh;
  font: 2vh NovaScript;
  color: black;
  text-align: left;
  text-indent: 1vh;
  border-left: solid 5px black;
}

.chatList {
  position: relative;
}

.chatMenu {
  position: absolute;
  top: 7vh;
  right: 0;
  width: 18vw;
  height: 40vh;
  background-color: #EBEBEB;
  z-index: 11;
  border-radius: 6px;
  overflow-y: auto;
}

#chatIcon {
  transform: scale(1);
  position: absolute;
  right: 7%;
  top: 30%;
  height: 40%;
  cursor: pointer;
}

#chatIcon:active {
  transform: scale(0.9);
}

#addFriend {
  text-align: center;
  position: absolute;
  width: 12%;
  height: 44%;
  top: 28%;
  right: 11%;
  box-sizing: border-box;
  background-color: #242222;
  border: none;
  border-radius: 5px;
  color: #EAEAEA;
  font: 1.9vh NovaScript;
  outline: none;
  transform: scale(1);
  cursor: pointer;
  transition: 0.1s;
}

#addFriend:active {
  transform: scale(0.98);
}

#notification {
  transform: scale(1);
  position: absolute;
  right: 3%;
  top: 30%;
  cursor: pointer;
  height: 40%;
}

#notification:active {
  transform: scale(0.9);
}

#topPanel {
    position: absolute;
    top: 0%;
    left: 15%;
    width: 85%;
    height: 6%;
    background-color: #96C5CD;
}

</style>