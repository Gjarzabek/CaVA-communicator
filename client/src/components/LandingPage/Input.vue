<template>
    <div class="inputbox">
        <div class="inputdesc">{{info}}</div>
        <div class="mess">min. {{minChars}} znaków</div>
        <input v-if="isTextType" type="text" v-model="InputData">
        <input v-else type="password" v-model="InputData">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["isTextType", "info", "maxChars", "minChars"],
    components: {},
    data() {
        return {
            InputData: "",
            message: ""
        }
    },
    watch: {
        InputData: function(): void {
            if (this.InputData.length > this.maxChars) {
                this.InputData = this.InputData.substring(0, this.maxChars);
            }
        }
    },
})
</script>

<style scoped>

.inputdesc {
    font: 1.8vh NovaFlat;
    position: absolute;
    text-align: left;
    text-indent: 0.6vw;
    margin: 1vh;
}

.inputbox {
    position: relative;
    height: 9vh;
    width: 20vw;
    margin-bottom: 1vh;
}

.mess {
    text-align: right;
    font-size: 1.5vh;
    color: red;
    padding-top: 1vh;
    padding-right: 2vh;
}

input {
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 4vh;
    border-radius: 1vh;
    border:none;
    outline:none;
    font: 1.8vh Sen;
    text-indent: 1vh;
    border: 0.12vw solid white;
    background-color: rgb(226, 226, 226);
}

input:focus {
    background-color: rgba(231, 231, 231, 0);
    border: 0.12vw solid rgb(65, 217, 255);
}

</style>