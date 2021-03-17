<template>
    <div class="inputbox">
        <div class="inputdesc">{{info}}</div>
        <div class="mess" v-if="!isMessEmpty" @mouseover="showInfo" @mouseout="hideInfo">{{message}}</div>
        <input v-if="isTextType" type="text" v-model="InputData">
        <input v-else type="password" v-model="InputData">
        <div class="info" v-if="isInfoShown">
            <div>Liczba znaków od {{minChars}} do {{maxChars}}.</div>
            <div>Niedozwolone znaki: {{displayChars}}</div>
        </div>
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
            message: "",
            changed: false,
            notAllowedChars: [
                ']', '[', '}', '{', ')',
                '(', '/', '<', '>', ' ', ';', ':'
            ],
            isInfoShown: false,
            good: false,
        }
    },
    watch: {
        good: function(): void {
            if (!this.good) {
                this.$emit('bad');
            }
        },
        InputData: function(): void {
            const charTyped = this.InputData.slice(-1);
            if (this.notAllowedChars.includes(charTyped)) {
                this.message = `Napis nie może zawierać ${charTyped}`;
                this.InputData = this.InputData.substring(0, this.InputData.length-1);
                this.changed = true;
            }
            else if (this.InputData.length > this.maxChars) {
                this.InputData = this.InputData.substring(0, this.maxChars);
                this.message = `Maksymalnie ${this.maxChars} znaków`;
                this.changed = true;
            }
            else if (this.InputData.length < this.minChars) {
                this.good = false;
                this.message = `Conajmniej ${this.minChars} znaki`;
            }
            else {
                if (!this.changed) {
                    if (this.InputData != "")
                        this.good = true;
                    this.message = "";
                }
                else this.changed = false;
            }
            if (this.good) {
                this.$emit('good', this.InputData);
            }
        }
    },
    methods: {
        showInfo() {
            this.isInfoShown = true;
        },
        hideInfo() {
            this.isInfoShown = false;
        }
    },
    computed: {
        isMessEmpty: function(): boolean {
            return this.message === "";
        },
        displayChars: function(): string {
            let result = "";
            for (const char of this.notAllowedChars) {
                if (char === ' ')
                    result += "spacja "
                result += char + " ";
            }
            return result;
        }
    }
})
</script>

<style scoped>

.info {
    position: absolute;
    left: 80%;
    top: -10vh;
    width: 55%;
    background-color: rgb(32, 100, 100);
    padding: 1vh;
    border-radius: 1vh;
    z-index: 2;
}

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
    position: absolute;
    right: 0;
    top:1vh;
    margin-top: 1vh;
    text-align: right;
    font-size: 0.8vw;
    color: rgb(255, 0, 0);
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