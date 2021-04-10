<template>
    <div @click="signalActive">
        <img src="../../assets/commonChat.png" alt="..." class="chatIcon smaller">
        <!--
        <div v-if="isLockedChat" alt="..." class="chatIcon">
            <img src="../../assets/lockedChat.png" alt="..." class="chatIcon">
        </div>
        <div v-if="isDataTransfer" alt="..." class="chatIcon">
            <img src="../../assets/dataTransfer.png" alt="..." class="chatIcon">
        </div>
        -->
        <div class="username">{{inChatFriend.name}}</div>
        <div class="closeBtn" @click="Close">x</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["chatInfo", "friend"],
    components: {},
    methods: {
        signalActive(): void {
            if (!this.closed) {
                this.$emit('signalActive', this.chatInfo._id);
            }
        },
        showCloseBtn(): void {
            this.closeBtnVisable = true;
        },
        hideCloseBtn(): void {
            if (!this.overChild)
                this.closeBtnVisable = false;
        },
        Close() :void {
            this.closed = true;
            this.$emit('closeBar', this.chatInfo._id);
        },
        overCloseBtn(): void {
            this.overChild = true;
            this.closeBtnVisable = true;
        }
    },
    computed: {
        isCommonChat: function(): boolean {
                return this.chatInfo.chatType === 'Zwykły';
        },
        isLockedChat: function(): boolean {
                return this.chatInfo.chatType === 'SzyfrowanyHasłem';
        },
        isDataTransfer: function(): boolean {
                return this.chatInfo.chatType === 'Szyfrowany';
        }
    },
    data() {
        return {
            closeBtnVisable: false,
            closed: false,
            overChild: true,
            inChatFriend: undefined
        };
    },
    created() {
        this.inChatFriend = this.friend;
    }
})
</script>

<style scoped>

.username {
    position: absolute;
    width: 60%;
    right: 20%;
    text-align: center;
    top: 1%;
}

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

.closeBtn {
    border-radius: 100%;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    width: 1.8vh;
    height: 1.8vh;
    background-color: rgba(255, 255, 255, 0.041);
    font: 1.3vh NovaSquare;
    color: black;
}

.closeBtn:hover {
    background-color: rgba(32, 161, 155, 0.733);
}

</style>
