<template>
    <div class="chat" @click=mainClicked>
        <div v-if="isCommonChat">
            <img src="../../assets/commonChat.png" alt="..." class="chatIcon smaller">
        </div>
        <div v-if="isLockedChat" alt="..." class="chatIcon">
            <img src="../../assets/lockedChat.png" alt="..." class="chatIcon">
        </div>
        <div v-if="isDataTransfer" alt="..." class="chatIcon">
            <img src="../../assets/dataTransfer.png" alt="..." class="chatIcon">
        </div>
        <div class="name">
            {{chat.receiver}}
        </div>
        <div class="time">
            {{chat.payload[0].timestamp}} godz temu
        </div>
        <div v-if="!isLockedChat" class="messData">
            {{demoMess}}
        </div>
        <div v-else class="messData">
            zaszyfrowane
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["chat"],
    components: {},
    computed: {
        isCommonChat: function(): boolean {
                return this.chat.chatType === 'Zwykły';
        },
        isLockedChat: function(): boolean {
                return this.chat.chatType === 'SzyfrowanyHasłem';
        },
        isDataTransfer: function(): boolean {
                return this.chat.chatType === 'Szyfrowany';
        },
        demoMess: function(): string {
            return this.chat.payload[0].data.substring(0, 20);
        }
    },
    methods: {
        mainClicked(): void {
            this.$emit('openChat', this.chat.id);
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
