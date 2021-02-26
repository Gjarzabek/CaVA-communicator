<template>
    <div class="chatItem">
        <div v-if="isCommonChat">
            <img src="../../assets/commonChat.png" alt="..." class="chatIcon">
            <div class="lastMessage">
                {{chatData.payload[0].data}}
            </div>
        </div>
        <div v-else>
            <img src="../../assets/lockedChat.png" alt="..." class="chatIcon">
            <img src="../../assets/locked.png" alt="..." class="lockedIcon">
            <div class="encrypted">
                Zaszyfrowane
            </div>
        </div>
        <div class="receiver">
            {{chatData.receiver}}
        </div>
        <div class="timestamp">
            {{chatData.payload[0].timestamp}} godz temu
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["chatData"],
  components: {},
  computed: {
      isCommonChat: function(): boolean {
          return this.chatData.chatType === 'Zwykły';
      }
  }
})
</script>

<style scoped>

.encrypted {
    position:absolute;
    bottom: 24%;
    left: 30%;
    text-align: left;
    font: 1.5vh NovaSquare;
    color: black;  
}

.lockedIcon {
    position: absolute;
    bottom: 24%;
    left: 24%;
    height: 1.7vh;
}

.timestamp {
    text-align: right;
    position: absolute;
    top: 15%;
    right: 5%;
}

.lastMessage {
    position:absolute;
    bottom: 25%;
    left: 23%;
    text-align: left;
    font: 1.7vh NovaSquare;
    color: black;
}

.chatItem {
    border-radius: 6px;
    position: relative;
    height: 8vh;
    background-color: #EBEBEB;
}

.chatItem:hover {
    background-color: #96C5CD;
}

.receiver {
    position:absolute;
    top: 15%;
    left: 23%;
    text-align: left;
    font: 1.9vh NovaSquare;
    color: black;
}

.chatIcon {
    position: absolute;
    left: 5%;
    top: 15%;
    height: 70%;
}

</style>
