<template>
    <div id="FriendMenu" :style="{top: `${position}px`}">
        <div class="iconBg">
            <img v-if="isBird" src="../../assets/freedomBird.png" alt=".." class='profileIcon'>
            <img v-else src="../../assets/fsociety.png" alt=".." class='profileIcon'>
        </div>
        <b class="info nick">{{friend.name}}</b>
        <div class="info id">{{Desc}}</div>
        <div class="dot" :class="friend.status"></div>
        <div class="info notePayload">Twoja notatka..</div>
        <button class="chatBtn">Napisz Wiadomość</button>
        <button class="cypherChatBtn">Czat podwójnie szyfrowany hasłem</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
/*
Friend Menu:
{
"status": "niedostępny",
"icon": "bird",
"_id": "eoix6r",
"name": "sss",
"desc": "",
"joinTime": "2021-03-24"
}
*/
export default defineComponent({
  props: ["friend", "position"],
  components: {},
  computed: {
      isBird(): boolean {
          return this.friend.icon === "bird";
      },
      Desc(): string {
            if (this.friend.desc === "")
                return "To jest przykładowy komunikat użytkownika (opis)";
            else
                return this.friend.desc;
      }
  }
})
</script>

<style scoped>
.info {
    margin: 0;
    color: rgb(212, 212, 212);
}

button {
    background-color: #5a5a5a;
    outline: none;
    border: none;
    height: 5vh;
    border-radius: 0.6vh;
    color: rgba(255, 255, 255, 0.719);
    font-family: Sen;
}

button:hover {
    background-color: #626262ca;

}

.chatBtn {
    position: absolute;
    bottom: 7vh;
    width: 90%;
    left: 5%;
}

.cypherChatBtn {
    position: absolute;
    bottom: 1vh;
    width: 90%;
    left: 5%;
}

.notePayload {
    position: absolute;
    top: 33%;
    left: 5%;
    width: 90%;
    height: 15%;
    background-color: rgb(51, 51, 51);
    padding: 0.2vh;
    text-align: left;
    border-radius: 0.6vh;
    font: 1.5vh Sen;
    color: rgba(255, 255, 255, 0.315);
}

.dot {
    position: absolute;
    top: 4.7vh;
    left: 2.5vw;
    width: 1.2vh;
    height: 1.2vh;
    border-radius: 50%;
}

.note {
    position: absolute;
    top: 30%;
    left: 5%;
    width: 8vw;
    font-size: 1.2vh;
}

.nick {
    position: absolute;
    left: 25%;
    top: 4%;
    width: 10vw;
    font: 2vh NovaSquare;
}

.id {
    position:absolute;
    width: 10vw;
    left: 25%;
    top: 13%;
    font: 1.4vh Courier;
}

.profileIcon {
    position: absolute;
    top: 10%;
    left: 12%;
    width: 70%;
}

.iconBg {
    position: absolute;
    border-radius: 50%;
    top: 1.24vh;
    left: 5%;
    width: 4.5vh;
    height: 4.5vh;
    background-color: #ffffff1f;
}

#FriendMenu {
    position:absolute;
    left: 15vw;
    z-index: 3;
    width: 15vw;
    height: 30vh;
    background-color: rgb(31, 31, 31);
    border: 0.1vh solid rgb(66, 66, 66);
    border-radius: 0.6vh;
}
</style>
