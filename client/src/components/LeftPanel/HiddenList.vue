<template>
    <div>
        <div id="listName" @click="toogleMenu">
            <div :id="header" class="arrow right"></div>
            {{header}}
        </div>
        <div v-if="!hidden" class="list">
            <div v-for="item in ItemList" v-bind:key="item.id" class="item">
                <div v-if="isFriend" class="friend">
                    <div class="statusDot" :class="item.status"></div>
                </div>
                <div v-if="isPrivateRoom" class="privateRoom">
                    <img src='../../assets/privateroom.png' alt="..." class="infoIcon">
                </div>
                <div v-if="isPublicTalk" class="publicTalk">
                    <img src='../../assets/publicroom.png' alt="..." class="infoIcon">
                </div>
                <div class='name'>
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["header", "ItemList", "type"],
  components: {},
  data() {
      return {
          hidden: true
      }
  },
  methods: {
      toogleMenu() {
          const headerEl = document!.getElementById(this.header);
          if (this.hidden) {
              headerEl!.classList!.add("down");
              headerEl!.classList!.remove("right");
          }
          else {
              headerEl!.classList!.add("right");
              headerEl!.classList!.remove("down");

          }
          this.hidden = !this.hidden;
      }
  },
  computed: {
        isFriend: function(): boolean {
            return this.type === "friend";
        },
        isPrivateRoom: function(): boolean {
            return this.type === "privateRoom";
        },
        isPublicTalk: function(): boolean {
            return this.type === "publicTalk";
        }
  }
})
</script>

<style scoped>

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

.list {
    margin-top: 2.2vh;
    transition: 1s;
}

.friend {
    color: chocolate;
}

.privateRoom {
    color: darkgoldenrod;
}

.publicTalk {
    color:darkturquoise;
}

#listName {
    text-align: left;
    position: relative;
    color: #C6BDBD;
    font: 2.2vh NovaScript;
    margin-top: 5%;
    margin-left: 5%;
    cursor:default;
}

.statusDot {
    position: relative;
    border-radius: 100%;
    margin-left: 2vw;
    top: 0.3vh;
    width: 1.4vh;
    height: 1.4vh;
}

.name {
    position: absolute;
    top: 0%;
    left: 3.4vw;
    color: #C6BDBD;
    font: 1.8vh NovaFlat;
}

.item {
    position: relative;
    margin-top: 1.5vh;
    width: 15vw;
    height: 2.5vh;
}

.item:hover {
    background-color: #262525;
}

.infoIcon {
    position: absolute;
    left: 1.5vw;
    width: 2.6vh;
}

</style>
