<template>
    <input type="text" id="messageInput" placeholder="Napisz Wiadomość" v-model="inputData" @keypress="inputKeyPressed" autocomplete="off">
</template>

<script lang="ts">
import { defineComponent } from 'vue' 


export default defineComponent({
    props: [],
    components: {},
    data() {
        return {
            inputData: "",
            maxMessageLength: 250
        }
    },
    watch: {
        inputData: function(): void {
            if (this.inputData.length > this.maxMessageLength) {
                this.inputData = this.inputData.substring(0, this.maxMessageLength);
            }
        }
    },
    methods: {
        inputKeyPressed(event: any): void {
            if (event.key === "Enter") {
                this.sendMessage();
            }
        },
        sendMessage(): void {
            if (this.inputData.length > 0)
                this.$emit("sendMessage", this.inputData);
            this.inputData = "";
        }
    }
})
</script>

<style scoped>

#messageInput {
    box-sizing: border-box;
    position: absolute;
    bottom: 2.5%;
    left: 2.5%;
    width: 95%;
    height: 5%;
    background-color: rgba(189, 189, 189, 0.06);
    border: none;
    border-radius: 0.2vh;
    outline: none;
    font: 2.2vh NovaFlat;
    color: #ffffffde;
    text-indent: 1vw;
    transition: 0.3s;
}

#messageInput::placeholder {
    color: #ffffff38;
}

#messageInput:focus {
    background-color: rgba(189, 189, 189, 0.07);
}

#messageInput:focus::placeholder {
    color: #ffffff50;
}

</style>
