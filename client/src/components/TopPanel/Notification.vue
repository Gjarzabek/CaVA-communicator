<template>
    <div class="notification" :class="{new: data.new === true}">
        <div v-if="data.new" class="dot"></div>
        <div class="exitBtn" @click="$emit('deleteAlert')">X</div>
        <div v-if="isInvite">
            <div class="alertInfo invInfo" :data-tool-tip="data.fromId">
                <img src="../../assets/friendInvite.png" class="msgIcon">
                <div class="msgInfo">{{data.info}}</div>
            </div>
            <button class="accept" @click="accept">akceptuj</button>
            <button class="reject" @click="reject">odrzuć</button>
        </div>
        <div v-else-if="isMessage" class="alertInfo" @click="openChat">
            <img src="../../assets/message.png" class="msgIcon">
            <div class="msgInfo">Nowa wiadomość od {{friend.name}}</div>
        </div>
        <div class="timeInfo">{{timeAgo}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["data", "friend"],
  components: {},
  methods: {
        accept(): void {
            this.$emit('acceptFriend', {fromId: this.data.fromId, alertId: this.data.id});
        },
        reject(): void {
            this.$emit('rejectFriend', {fromId: this.data.fromId, alertId: this.data.id});
        },
        openChat: function(): void {
            this.$emit('openChat');
        }
  },
  computed: {
        isInvite: function(): boolean {
            return this.data.topic === 'Zaprosznie do znajomych';
        },
        isMessage: function(): boolean {
            return this.data.topic === 'Message';
        },
        timeAgo: function(): string {
            const now = (new Date).getTime();
            const messTime = this.data.timestamp;
            const hourAgo = Math.floor((now - messTime) / 1000 / 60 / 60);
            if (hourAgo > 0)
                return `${hourAgo} h temu`;
            const minutesAgo = Math.floor((now - messTime) / 1000 / 60);
            return `${minutesAgo} min temu`;
        }
  }
})
</script>

<style scoped>
.exitBtn {
    position: absolute;
    top: 0.5vh;
    right: 0.5vh;
    height: 1.5vh;
    width: 1.5vh;
    display: none;
}

.alertInfo {
    margin: 0;
    padding: 1vh;
    width: 14vw;
    display: flex;
    align-items: center;
    padding-right: 5vw;
}

/*
.alertInfo::after {
    margin: 0;
    padding: 0;
    content: '';
    color: rgb(255, 255, 255);
    transform: scale(1);
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.8s;
    opacity: 0;
}
.alertInfo:hover::after {
    opacity: 1;
    top: 0;
    content: 'id: ' attr(data-tool-tip);
}
*/
button {
    position:absolute;
    height: 3vh;
    outline: none;
    margin-right: 0.2vw;
    border-radius: 0.4vh;
    font-family: Sen;
    font-size: 1vh;
}

.accept {
    background-color: rgb(101, 240, 101);
    bottom: 0.5vh;
    right: 4vw;
}

.reject {
    background-color: rgb(0, 0, 0);
    color:white;
    bottom: 0.5vh;
    right: 1vw;
}

.notification {
    position: relative;
    margin: 1vh;
    padding: 1vh;
    border-radius: 1vh;
    color: white;
    font-family: Sen;
    text-indent: 0vw;
    text-align: left;
    border: 3px solid rgb(80, 80, 80);
}

.notification:hover {
    background-color: rgba(56, 56, 56, 0.616);
}

.notification:hover .exitBtn {
    display: block;
}

.dot {
    position: absolute;
    top: 1vh;
    left: 1vh;
    border-radius: 50%;
    width: 1vh;
    height: 1vh;
    background-color: rgb(15, 156, 199);
}

.timeInfo {
    position: absolute;
    right: 2vw;
    top: 0.6vh;
    font: 0.7em Sen;
    color: rgba(255, 255, 255, 0.466);
}

.msgInfo {
    margin-left: 1vh;
}

.msgIcon {
    height: 2.5vh;
}

.invInfo {
    align-items: flex-start;
}

</style>