<template>
    <div>
        <div class="menuItem">
            <div id="listName" @click="toogleMenu">
                <div :id="header" class="arrow right"></div>
                {{header}}
                <div v-if="isFriend" class="friendNumber">({{onlineUsersN}}/{{ItemList.length}})</div>
            </div>
            <div v-if="isPrivateRoom">
                <img src="../../assets/addIcon.png" alt="..." id="addIcon">
            </div>
        </div>
        <div v-if="!hidden" class="list">
            <div v-for="item in ItemList" v-bind:key="item.id" :class="{ item : !isChat}">
                <ChatItem v-if="isChat" :chat="item" @openChat="ForwardChatOpen"/>
                <FriendItem v-if="isFriend" :friend="item" @click="userClicked($event, item)"/>
                <div v-if="isPrivateRoom" class="privateRoom">
                    <img src='../../assets/privateroom.png' alt="..." class="infoIcon">
                </div>
                <div v-if="isPublicTalk" class="publicTalk">
                    <img src='../../assets/publicroom.png' alt="..." class="infoIcon">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FriendItem from '@/components/LeftPanel/FriendItem.vue';
import ChatItem from '@/components/LeftPanel/ChatItem.vue';

export default defineComponent({
  props: ["header", "ItemList", "type"],
  components: {FriendItem, ChatItem},
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
      },
      userClicked(event: any, item: any) {
        this.$emit('userClicked', [event, item]);
      },
      ForwardChatOpen(event: any): void {
        this.$emit('openChat', event);
      }
  },
  computed: {
        isChat: function(): boolean {
            return this.type === "chat";
        },
        isFriend: function(): boolean {
            return this.type === "friend";
        },
        isPrivateRoom: function(): boolean {
            return this.type === "privateRoom";
        },
        isPublicTalk: function(): boolean {
            return this.type === "publicTalk";
        },
        onlineUsersN: function(): number {
            let counter = 0;
            for (const item of this.ItemList) {
                if (item.status === "dostępny")
                    counter++;
            }   
            return counter; 
        }
  }
})
</script>

<style scoped>

.list {
    margin-top: 1.8vh;
    transition: 1s;
}

#listName {
    text-align: left;
    position: relative;
    color: #C6BDBD;
    font: 2.1vh NovaScript;
    margin-top: 8%;
    margin-left: 5%;
    cursor:default;
    width: 11.5vw;
}

.item {
    position: relative;
    margin-top: 0.5vh;
    width: 15vw;
    height: 4vh;
    border-radius: 10px;
}

.item:hover {
    background-color: #262525;
}

.infoIcon {
    position: absolute;
    top: 0.7vh;
    left: 1.5vw;
    width: 2.6vh;
}

.friendNumber {
    position: absolute;
    top: 0.5vh;
    left: 5.5vw;
    font: 1.5vh NovaFlat;
}

#addIcon {
    position: absolute;
    top: 0;
    right: 14%;
    transform: scale(1);
    transition: 0.2s;
    height: 2.4vh;
    cursor: pointer;
}

#addIcon:active {
    transform: scale(0.9);
}

.menuItem {
    position: relative;
}

</style>
