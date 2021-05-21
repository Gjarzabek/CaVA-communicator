<template>
    <div class="mainDiv">
        <div class="para" :data-tool-tip="passInfoTip">Hasło Czatu</div>
        <input v-if="visablePass" v-model="inputValue" type="text" :placeholder="info">
        <input v-else v-model="inputValue" type="password" :placeholder="info">
        <button @click="loadPass">Wczytaj</button>
        <div class="eye scale" @click="()=>{visablePass = !visablePass}">
            <div class="circle"></div>
            <div v-if="!visablePass" class="line"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: [],
    components: {},
    data() {
        return {
            visablePass: false,
            inputValue: "",
            info: "",
            passInfoTip: "Po wczytaniu hasła czatu zyskujesz możliwość wysyłania sekretnych wiadomości. Bedą one dodatkowo zaszyfrowane podanym przez Ciebie hasłem."
        }
    },
    methods: {
        loadPass(): void {
            if (this.inputValue === "") return;
            this.inputValue = "";
            this.info = "Wczytano"
            setTimeout(()=>{this.info = ""}, 2000);
        }
    }
})
</script>

<style scoped>
.mainDiv {
    width: 100%;
    padding-bottom: 1vh;
    padding-top: 1vh;
    padding-left: 1vh;
    text-align: left;
    position: relative;
}

input {
    --paddingLeft: 1vh;
    background-color: rgb(34, 34, 34);
    border: 1px solid rgb(61, 118, 119);
    outline: none;
    color: #C6BDBD;
    font-size: 1em;
    margin-top: 1vh;
    margin-bottom: 1vh;
    min-height: 3.5vh;
    padding-left: var(--paddingLeft);
    max-width: calc(90% - var(--paddingLeft));
}

input::placeholder {
    font-size: 1em;
}

.eye {
    width: 50px;
    height: 35px;
    background-color: transparent;
    border: 5px solid #C6BDBD;    
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 3.5vh;
    right: 0.7vw;
}

.circle {
    background-color: #C6BDBD;
    border-radius: 50%;
    height: 25px;
    width: 25px
}

.line {
    position:absolute;
    width: 70px;
    background-color: cyan;
    height: 5px;
    transform: rotate(-45deg);
}

.scale {
    transform: scale(0.3);
}

.para:hover::after {
    content: attr(data-tool-tip);
    top: 0px;
    right: 105%;
    position: absolute;
    width: 10vw;
    background-color: rgb(34, 34, 34);
    border: 4px solid rgb(59, 145, 146);
    border-radius: 1px;
    color: #C6BDBD;
    line-height: 2vh;
    text-align: center;
    padding: 5px;
    z-index: 10;
}
</style>