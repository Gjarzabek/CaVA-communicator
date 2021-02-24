<template>
    <div class="ChatSection">
        <div class="openedChats">
            <div v-for="chat in openedChats" v-bind:key="chat.id" class="chatBarItem" :class="{ 'active' : chat.id === this.activeChat.id}">
                <ChatBar :chatInfo="chat" @signalActive="changeActiveChat"/>                
            </div>
        </div>
        <Messages :messages="activeChatPayload"/>
        <MessageInput @sendMessage="SendMessageForward"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageInput from "@/components/ChatWindow/MessageInput.vue";
import ChatBar from "@/components/ChatWindow/ChatBar.vue";
import Messages from "@/components/ChatWindow/Messages.vue";

export default defineComponent({
    props: ["openedChats"],
    components: {MessageInput, ChatBar, Messages},
    data() {
        return {
            activeChat: this.openedChats[0]
        }
    },
    computed: {
        activeChatPayload: function(): any {
            if (this.openedChats.length > 0)
                return this.activeChat.payload;
            else return undefined;
        }
    } ,
    methods: {
        SendMessageForward(eventData: any): void {
            this.$emit('sendMessage', eventData);
        },
        changeActiveChat(chat: any): void {
            this.activeChat = chat;
        }
    }
})
</script>

<style>

.openedChats {
    position: absolute;
    width: 100%;
    max-height: 5vh;
    top: 0;
    left: 0;
    display: flex;
    overflow-x: auto;
}


.openedChats .chatBarItem {
    box-sizing: border-box;
    border-right: 2px solid #242222;
    position: relative;
    background-color: #4F4F4F;
    min-width: 8vw;
    height: 3vh;
    line-height: 3vh;
    text-align: center;
}

.openedChats::-webkit-scrollbar {
    width: 0;
}

.ChatSection {
    position: absolute;
    top: 9%;
    left:15%;
    height: 91%;
    width: 70%;
}

.openedChats .active {
    background-color: #ebebebe5;
}

</style>
