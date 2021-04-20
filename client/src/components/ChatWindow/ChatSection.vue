<template>
    <div class="ChatSection">
        <div class="openedChats">
            <div 
            v-for="chat in openedChats" v-bind:key="chat.id"
            class="chatBarItem" 
            :class="{ 'active' : chat._id === activeChatId}">
                <ChatBar 
                :chatInfo="chat"
                :friend="inChatFriend"
                @signalActive="changeActiveChat"
                @closeBar="forwardCloseEvent"/>                
            </div>
        </div>
        <div id="messages">
            <Message v-for="message in activeChatPayload" :key="message.id" :message="message" :friend="inChatFriend" :user="user"/>
        </div>
        <MessageInput @sendMessage="SendMessageForward" :style="{width: `${inputWidth}%`, left: `${inputLeftPos}%`}"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageInput from "@/components/ChatWindow/MessageInput.vue";
import ChatBar from "@/components/ChatWindow/ChatBar.vue";
import Message from "@/components/ChatWindow/Message.vue";
import NodeRSA from 'node-rsa';

export default defineComponent({
    props: ["openedChats", "activeChatId", "inChatFriend", "user"],
    components: {MessageInput, ChatBar, Message},
    computed: {
        activeChatPayload: function(): any {
            if (this.openedChats.length > 0) {
                const idmatch = (chat:any) => {
                    return chat._id === this.activeChatId;
                };

                const returnValue = this.openedChats.find(idmatch).messages;
                
                console.log('returnValue', returnValue)

                return returnValue;
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
        SendMessageForward(messageData: any): void {
            const rsaCrypto = new NodeRSA();
            // TODO: encrypt message with own public key also to further history read
            rsaCrypto.importKey(this.inChatFriend.public, 'public');
            console.log('SendMessageForward', messageData);
            this.$emit('sendMessage', {
                friendData: rsaCrypto.encrypt(messageData, 'base64'),
                content: messageData,
                chatId: this.activeChatId,
                timestamp: (new Date()).getTime(),
                id: undefined,
                inProgress: true,
                authorId: this.user.id
            });
        },
        changeActiveChat(chatId: string): void {
            this.$emit('changeActiveChat', chatId);
        },
        forwardCloseEvent(chatId: string): void {
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
    border-bottom: 2px solid rgba(221, 221, 221, 0);
}

.openedChats .chatBarItem:hover {
    background-color: #6b6b6b;
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
    border-bottom-color: rgb(94, 216, 216);
    border-width: 1px;
}

#messages {
    position: absolute;
    top: 5%;
    left: 0;
    height: 85%;
    width: 100%;
    overflow-y: auto;
}

</style>
