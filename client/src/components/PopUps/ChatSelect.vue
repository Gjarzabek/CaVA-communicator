<template>
    <div class="popUpBg">
        <div class="popUpWindow" :class="{big: expand}">
            <h2 id="popUpHeader">Wybierz typ chatu</h2>
            <ul class="typesList">
                <li class="chatType" :class="{active: isActive(0)}" @click="activeId=0">
                    <img src="../../assets/lockShield.png" alt="..." class="chatIcon">
                    Tajny
                </li>
                <li class="chatType" :class="{active: isActive(1)}" @click="activeId=1">
                    <img src="../../assets/dataTransfer.png" alt="..." class="chatIcon">
                    Unikalny
                </li>
                <li class="chatType" :class="{active: isActive(2)}" @click="activeId=2">
                    <img src="../../assets/commonChat.png" alt="..." class="chatIcon">
                    Zwykły
                </li>
            </ul>
            <button class="descShow" @click="toogleDescShow">
                <div class="arrow down" :class="{up: expand}"></div>
                {{descShowText}}
            </button>
            <button class="exitBtn" @click=signalClose>X</button>
            <button class="pick">Wybierz</button>
            <div v-if="expand" class="desc">
                <ul>
                    <li v-for="phrase in currentDesc" v-bind:key="phrase.id">
                        {{phrase.data}}
                    </li>
                </ul>
                <div class='bardiv' id="firstBar">
                    <img src="../../assets/private.png" alt="..." class="barIcon">
                    <div class="infobar" id="Prywatność" :style="{width:`${privacyBarWidth}vw`}">Prywatność</div>
                </div>
                <div class='bardiv' id="secondBar">
                    <img src="../../assets/sheep.png" alt="..." class="barIcon">
                    <div class="infobar" id="Wygoda" :style="{width:`${comfortBarWidth}vw`}">Wygoda</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: [],
  components: {},
  data() {
      return {
          expand: false,
          activeId: 1,
          typeInfo: [
              {
                  sentences : [
                        {data:"Treść Wiadomości niewidoczna w sieci i na serwerze (Szyfrowanie End to End)", id:0},
                        {data:"Czat szyfrowany wcześniej ustalonym hasłem z rozmówcą, które NIE JEST zapisywane na serwerze", id:1},
                        {data:"Możliwość zapisywania historii chatu", id:2},
                        {data:"Jeśli wybierzesz chat z historią twoje wiadomości będą przechowywane na serwerze w postaci zaszyfrowanej. Hasłem które nie jest nigdzie zapisywane i które znasz tylko ty i twój rozmówca. Poznasz ich treść jedynie poprzez poprawne wprowadzenie hasła", id:3},
                    ],
                    privacy: 1,
                    comfort: 0.28
                },
                        {
                            sentences : [
                                {data:"Treść Wiadomości niewidoczna w sieci i na serwerze (Szyfrowanie End to End)", id:0},
                                {data:"Wiadomości szyfrowane jednorazowymi losowo wygenerowanymi kluczami", id:1},
                                {data:"Możliwość utworzenia sesji tylko ze znajmowym który jest online", id:2},
                                {data:"Historia Chatu nie jest zapisywana", id:3},
                                {data:"Chat wygasa po rozłączeniu się jednego z uczestników", id:4},
                                {data:"Osoba może dołączyć do chatu po otrzymaniu zaproszenia i wprowadzeniu kodu konwersacji", id:5},
                            ],
                            privacy: 1,
                            comfort: 0.45
                        },
                {
                    sentences : [
                        {data:"Wiadomości bez podwójnego szyfrowania End to End - wiadomości widoczne na serwerze tak jak w przypadku popularnych aplikacji", id:0},
                        {data:"Wciąż unikasz wysyłania swoich danych bezpośrednio na serwery dużych korporacji", id:1},
                        {data:"Możliwość zapisywania historii chatu", id:2},
                        {data:"Wysyłanie wiadomości do użytkowników offline", id:3},
                    ],
                    privacy: 0.45,
                    comfort: 1
                }
          ],
          maxInfoBarLen: 30
      }
  },
  computed: {
        descShowText: function(): string {
            return this.expand ? "Ukryj Opis" : "Pokaz Opis";
        },
        currentDesc: function(): any {
            return this.typeInfo[this.activeId].sentences;
        },
        privacyBarWidth: function(): number {
            return this.maxInfoBarLen * this.typeInfo[this.activeId].privacy;
        },
        comfortBarWidth: function(): number {
            return this.maxInfoBarLen * this.typeInfo[this.activeId].comfort;
        }
  },
  methods: {
      signalClose(): void {
          this.expand = false;
          this.$emit('signalClose');
      },
      toogleDescShow(): void {
          if(this.expand) {
              this.expand = false;
          }
          else {
              this.expand = true;
          }
      },
      isActive(id: number) {
          return id === this.activeId;
      }
  }
})
</script>

<style scoped>


.desc li {
    margin-left: 10px;
    margin-top: 1.4vh;
    font: 1.9vh Sen;
    color: black;
}

.desc h2 {
    margin-left: 10px;
    color: rgb(218, 218, 218);
}

.desc ul {
    height: 21vh;
    margin-top: 5vh;
}

.descShow {
    position:absolute;
    bottom: 2vh;
    left: 2vh;
    border-radius: 2vh;
    outline:none;
    border:none;
    background-color: rgba(0, 0, 0, 0.397);
    font: 2.2vh Sen;
    color: #C6BDBD;
}

.typename {
    position: absolute;
    width: 75%;
    height: 50%;
    left: 12.5%;
    top: 25%;
    font: 1.5vh NovaCut;
}

.exitBtn {
    position: absolute;
    top: 1vh;
    right: 1vh;
    text-align: center;
    font-size: 1.8vh;
    height: 4vh;
    width: 4vh;
    border-radius: 100%;
    outline: none;
    background-color: #EBEBEB;
}

.exitBtn:hover {
    background-color: #76d8c9;
}

.popUpBg {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(53, 53, 53, 0.534);
}

.popUpWindow {
    position: absolute;
    left: 25%;
    top: 15%;
    height: 20%;
    width: 50%;
    background-color: #eeeeee;
    text-align: left;
    border-radius: 8px;
    transition: 0.4s;
}

.big {
    height: 70%;
}

#popUpHeader {
    color: #444444;
    text-indent: 3vh;
    font-size: 1.8vh;
    margin-top: 2vh;
    margin-bottom: 1vh;
}

.chatType {
    position: relative;
    text-align: center;
    display: inline-block;
    text-align: center;
    margin-left: 15px;
    padding: 1.7vh;
    width: 11vw;
    background-color: rgba(0, 0, 0, 0.815);
    border-radius: 5vh;
    font: 0.9vw NovaSquare;
    border: 0.33vh rgba(0, 0, 0, 0) solid;
    color:  #CACECE;
    transition: 0.2s;
}

.typesList {
    float:left;
}

.chatIcon {
    position: absolute;
    left: 3%;
    top: 25%;
    height: 50%;
}

.desc {
    position: absolute;
    top: 15%;
    margin: 2vh;
    width: 96%;
    height: 73%;
}

.pick {
    position:absolute;
    width: 6vw;
    height: 5vh;
    bottom: 2vh;
    right: 2vh;
    background-color: rgb(77, 77, 77);
    border-radius: 5vh;
    border: none;
    color: #CACECE;
    font: 2vh NovaFlat;
    outline: none;
    transition: 0.1s;
}

.pick:hover {
    background-color: rgba(41, 41, 41, 0.794);
}

.active {
    background-color: rgba(0, 0, 0, 0.897);
    border: 0.33vh #1ebda59d solid;
    color: #62FFE7;
}

.barIcon {
    position: absolute;
    top: 40%;
    left: 3%;
    height: 45%;
}

.bardiv {
    position: relative;
    top: 0;
    width: 48vw;
    height: 10vh;
    margin-left: 5vh;
    font-family: Sen;
}

.infobar {
    position: relative;
    top: 2vh;
    left: 8vh;
    height: 5vh;
    background-color: #93c7c7;
    margin: 1vh;
    margin-top: 2vh;
    border-radius: 2vh;
    transition: 0.4s;
    text-align: center;
    color:white;
    vertical-align: middle;
    line-height: 5vh;
    font-size: 0.8vw;
}

#Wygoda {
    color:rgba(255, 255, 255, 0.925);
    background-color: rgba(0, 0, 0, 0.609);
}

#Prywatność {
    color:rgba(0, 0, 0, 0.836);
    background-color: rgb(118, 250, 255);
}

#firstBar {
    position: absolute;
    top: 62%;
}

#secondBar {
    position: absolute;
    top: 80%;
}

</style>