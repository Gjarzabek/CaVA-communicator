<template>
    <div class="chat" @click=mainClicked>
        <img src="../../assets/commonChat.png" alt="..." class="chatIcon smaller">
        <div class="name">
            {{friend.name}}
        </div>
        <div class="time">
            {{timeAgo}}
        </div>
        <div class="messData">
            {{demoMess}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["chat", "friend"],
    components: {},
    computed: {
        demoMess: function(): string {
            const lastMess = this.chat.messages[this.chat.messages.length-1];
            const prefix = lastMess.authorId === this.friend._id ? `${this.friend.name}: ` : "Ty: ";
            return prefix + lastMess.content.substring(0, 20);
        },
        timeAgo: function(): string {
            const now = (new Date).getTime();
            const messTime = this.chat.messages[this.chat.messages.length-1].timestamp;
            const hourAgo = Math.floor((now - messTime) / 1000 / 60 / 60);
            if (hourAgo > 0)
                return `${hourAgo} h temu`;
            const minutesAgo = Math.floor((now - messTime) / 1000 / 60);
            return `${minutesAgo} min temu`;
        }
    },
    methods: {
        mainClicked(): void {
            this.$emit('openChat', this.chat._id);
        }
    }
})
</script>

<style scoped>

.chatIcon {
    position: absolute;
    left: 5%;
    top: 15%;
    height: 70%;
}

.smaller {
    top: 17%;
    height: 56%;
}

.name {
    position: absolute;
    top: 0.25vh;
    left: 20%;
    color: #C6BDBD;
    font: 1.7vh NovaFlat;
}

.chat {
    margin-top: 1px;
    box-sizing: border-box;
    position: relative;
    left: 0.5vh;
    width: 14.5vw;
    height: 5vh;
    border-radius: 4px;
}

.chat:hover {
    background-color: #262525;
}

.messData {
    position: absolute;
    bottom: 0.55vh;
    left: 20%;
    color: #54aec5f3;
    font: 1.5vh NovaFlat;
}

.time {
    text-align: right;
    position: absolute;
    top: 0.2vh;
    right: 5%;
    font: 1.2vh NovaFlat;
    color: #818181;
}

</style>
