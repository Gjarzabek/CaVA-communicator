<template>
    <div>
        <div class="messages">
            <div v-for="message in messages" v-bind:key="message.timestamp" class="MessageBody">
                <div class="bgEllipse"></div>
                <div class="userName">{{message.who}}</div>
                <div class="messageData" :class="{inProccess : message.isNotSend}">{{message.data}}</div>
                <div class="time">{{message.timestamp}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["messages"],
    components: {},
})
</script>

<style scoped>

.messages {
    position: absolute;
    top: 5%;
    left: 0;
    height: 85%;
    width: 100%;
    overflow-y: auto;
}

.MessageBody {
    position: relative;
    top: 4vh;
    left: 1vh;
    width: 67vw;
    border-top: solid 1px #3b393978;
    border-bottom: solid 1px #3b393978;
    margin-bottom: 1vh;
    padding: 1.5vh;
    transition: 0.5s;
}

.MessageBody:hover {
    border-top: solid 1px #3B3939;
    border-bottom: solid 1px #3B3939;
}

.bgEllipse {
    position: relative;
    width: 5vh;
    height: 5vh;
    left: 2vh;
    background-color: yellowgreen;
    border-radius: 100%;
}

.userName {
    text-align: left;
    color: yellowgreen;
    position: absolute;
    top: 1vh;
    left: 9.5vh;
    font: 2vh NovaSquare;
}

.messageData {
    font: 2vh NovaSquare;
    color: whitesmoke;
    text-align: left;
    width: 60vw;
    position: relative;
    bottom: 1.4vh;
    left: 8vh;
}

.time {
    font: 1.5vh NovaSquare;
    color: #595757;
    position: absolute;
    top: 1.2vh;
    left: 12vw;
}

.inProccess {
    color: rgb(92, 146, 151);
}

</style>
