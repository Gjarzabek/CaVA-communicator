<template>
    <div id="chats">
        <div id="chatsHeader">Active Chats</div>
        <div id="openedChats">
            <div v-for="user in activeChats" v-bind:key="user.id">
                <ChatItem v-bind:user="user"/>
            </div>
        </div>
        <ActiveChat v-bind:chatData="activeChatMessages"/>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatItem from '@/components/ChatItem.vue';
import ActiveChat from "@/components/ActiveChat.vue";

class MessagesMap {

    private messages: Map<number, Array<string>>;

    constructor() {
        this.messages = new Map<number, Array<string>>();
    }

    update(userId: number, message: string) {
        const messages = this.messages.get(userId);
        if (messages === undefined) {
            this.messages.set(userId, [message]);
            return;
        }
            
        messages.push(message);    
    }

}

export default defineComponent({
  props: ["activeChats"],
  components: {
      ChatItem,
      ActiveChat
  },
  data() {
      return {
          activeUser: 0,
          activeChatMessages: [],
          messagesMap: new MessagesMap()      
      }
  }
})
</script>

<style scoped>
#chats {
    border-radius: 10px;
    position: absolute;
    margin-left: 4px;
    left: 0.5%;
    width: 83.5%;
    height: 98.5%;
    background-color: rgb(150, 155, 156);
}

#mainHeader {
    box-sizing: border-box;
    border-radius: 10px;
    text-indent: 15px;
    background-color: rgb(255, 255, 255);
    height: 8%;
}

#chatsHeader {
    color: white;
    box-sizing: border-box;
    margin-left: 5px;
    margin-top: 5px;
    width: 10%;
    height: 3%;
    border-radius: 10px;
    background-color: #204052;
    border: solid 5px #204052;
    text-align: center;
}

#openedChats {
    margin-left: 5px;
    position: absolute;
    width: 10%;
    height: 86%;
    overflow-y: auto;
}
</style>
