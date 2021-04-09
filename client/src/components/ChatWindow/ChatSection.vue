<template>
    <div class="ChatSection">
        <div class="openedChats">
            <div 
            v-for="chat in openedChats" v-bind:key="chat.id"
            class="chatBarItem" 
            :class="{ 'active' : chat.id === activeChatId}"
            >
                <ChatBar 
                :chatInfo="chat"
                @signalActive="changeActiveChat"
                @closeBar="forwardCloseEvent"
                />                
            </div>
        </div>
        <Messages :messages="activeChatPayload"/>
        <MessageInput @sendMessage="SendMessageForward" :style="{width: `${inputWidth}%`, left: `${inputLeftPos}%`}"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageInput from "@/components/ChatWindow/MessageInput.vue";
import ChatBar from "@/components/ChatWindow/ChatBar.vue";
import Messages from "@/components/ChatWindow/Messages.vue";

export default defineComponent({
    props: ["openedChats", "activeChatId"],
    components: {MessageInput, ChatBar, Messages},
    computed: {
        activeChatPayload: function(): any {
            if (this.openedChats.length > 0) {
                const idmatch = (chat:any) => {
                    return chat._id === this.activeChatId;
                };

                const el = this.openedChats.find(idmatch);
                
                return el.messages;
            }
            else return undefined;
        },
        showInput: function(): boolean {
            return this.openedChats.length > 0;
        },
        inputWidth: function(): number {
            return this.showInput ? 95 : 0;
        },
        inputLeftPos: function(): number {
            return this.showInput ? 2.5 : -0.5;
        }
    } ,
    methods: {
        SendMessageForward(eventData: any): void {
            this.$emit('sendMessage', eventData);
        },
        changeActiveChat(chatId: number): void {
            this.$emit('changeActiveChat', chatId);
        },
        forwardCloseEvent(chatId: number): void {
            this.$emit('closeBar', chatId);
        }
    }
})
</script>

<style>

.openedChats {
    position: absolute;
    width: 100%;
    max-height: 5vh;
    top: 1px;
    left: 0;
    display: flex;
    overflow-x: auto;
}

.openedChats .chatBarItem {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-sizing: border-box;
    border-right: 2px solid #242222;
    position: relative;
    background-color: #4F4F4F;
    min-width: 8vw;
    height: 3vh;
    line-height: 3vh;
    text-align: center;
}

.openedChats .chatBarItem:hover {
    border-bottom: 2px solid #ddd;
}

.openedChats::-webkit-scrollbar {
    width: 0;
}

.ChatSection {
    position: absolute;
    top: 6%;
    left:15%;
    height: 94%;
    width: 70%;
}

.openedChats .active {
    background-color: #ddd;
}

</style>
