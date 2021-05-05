<template>
    <div id="FriendMenu" :style="{top: `${position}px`, width: `${currentSize.w}`, height: `${currentSize.h}`, border: `${currentBorder}`}">
        <div class="iconBg">
            <img v-if="isBird" src="../../assets/freedomBird.png" alt=".." class='profileIcon'>
            <img v-else src="../../assets/fsociety.png" alt=".." class='profileIcon'>
        </div>
        <b class="info nick" :style="{color: friend.color}">{{friend.name}}</b>
        <div class="info date" :style="{color: darker}">dołączył {{friend.joinTime}}</div>
        <div class="dot" :class="friend.status"></div>
        <div class="info desc" :style="{color: ligher}">{{Desc}}</div>
        <p class="info notePara">Notatka</p>
        <textarea :placeholder="currentNote" class="info notePayload" maxlength="40" spellcheck="false" v-model="note"></textarea>
        <button class="chatBtn" @click="writeMessage">Napisz Wiadomość</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import colorManipulate from '@/ts_classes/colorManipulate';
/*
<button class="cypherChatBtn">Czat podwójnie szyfrowany hasłem</button>
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
  props: ["friend", "position", "isShown"],
  components: {},
  data() {
        return {
            note: '',
            width: '0vw'
        }
  },
  mounted() {
      this.note = this.friend.note;
  },
  watch: {
        note: function(): void {
            if (this.note.includes('\n'))
                this.note = this.note.replace('\n', '');
            console.log(this.note);
            this.$emit('noteChange', this.note);
        }
  },
  computed: {
      isBird(): boolean {
          return this.friend.icon === "bird";
      },
      Desc(): string {
            if (this.friend.desc === "")
                return "---";
            else
                return this.friend.desc;
      },
      currentSize(): {h: string, w: string} {
            if (this.isShown) {
                return {h: '35vh', w: '14vw'};
            }
            else {
                return {h: '35vh', w: '0vw'};
            }
      },
      currentBorder(): string {
            return this.isShown ? '0.1vh solid rgb(65, 65, 65)' : 'transparent';
      },
      currentNote(): string {
          return this.friend != undefined ? this.friend.note : '' ;
      },
      darker(): string {
        return colorManipulate(this.friend.color, -20);
      },
      ligher(): string {
        return colorManipulate(this.friend.color, 70);
      }      
  },
  methods: {
      writeMessage: function(): void {
            this.$emit('openChat', this.friend);
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

.notePara {
    position: absolute;
    left: 6%;
    top: 35%;
    width: 88%;
    font-size: 1.25vh;
    color: rgb(97, 97, 97);
}

.chatBtn {
    position: absolute;
    bottom: 2vh;
    left: 5%;
    width: 90%;
    height: 4vh;
    background-color: rgba(255, 255, 255, 0.116);
    border: 2px solid rgba(128, 128, 128, 0.521);
}

.chatBtn:hover {
    background-color: transparent;
    border: 2px solid grey;
}

.cypherChatBtn {
    position: absolute;
    bottom: 1vh;
    width: 90%;
    left: 5%;
}

.notePayload {
    position: absolute;
    top: 40%;
    left: 5%;
    width: 90%;
    height: 15%;
    text-align: left;
    border-radius: 0.6vh;
    font: 1.6vh Sen;
    color: rgb(149, 149, 149);
    resize: none;
    outline: none;
    border: none;
    margin: 0;
    background-color: transparent;
}

.notePayload:focus {
    background-color: rgb(46, 46, 46);
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
    left: 26%;
    top: 1vh;
    width: 10vw;
    color: rgb(58, 186, 190);
    font: 2vh NovaSquare;
}

.date {
    position:absolute;
    width: 10vw;
    left: 26%;
    top: 4vh;
    font: 1.3vh NovaFlat;
    color: rgb(111, 137, 138);
}

.profileIcon {
    position: absolute;
    top: 12%;
    left: 15%;
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

.desc {
    position:absolute;
    width: 12.5vw;
    left: 5%;
    top: 21%;
    font: 1.5vh Courier;
    color: rgb(58, 186, 190);
}

#FriendMenu {
    position:absolute;
    left: 15vw;
    z-index: 3;
    height: 35vh;
    width: 14vw;
    background-color: rgb(31,31,31);
    border-radius: 0.6vh;
    transition: width 40ms;
}
</style>
