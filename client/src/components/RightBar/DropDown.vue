<template>
    <div class="drop-down">
        <div>{{header}}</div>
        <div class="options">
            <div class="option chosenOption" @click="toogleshow">
                {{option.desc}}
                <div v-if="option.info" class="infoIconContainer" :data-tool-tip="option.info">
                    <img class="infotip" src="../../assets/info.png">
                </div>
            </div>
            <div v-if="showMenu" @click="toogleshow">
                <div class="option" v-for="option in optionList" :key="option.timeoffset" @click="changeOption(option)">{{option.desc}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['optionList', "header"],
  components: {},
    data() {
        return {
            showMenu: false,
            chosenOptionId: 0
        }
    },
    methods: {
        toogleshow(): void {
            this.showMenu = !this.showMenu;
        },
        changeOption(option: any): void {
            for (let i = 0; i < this.optionList.length; ++i) {
                if (option.desc === this.optionList[i].desc) {
                    this.chosenOptionId = i;
                    return;
                }
            }
            this.chosenOptionId = 3;
        }
    },
    computed: {
        option: function(): string {
            return this.optionList[this.chosenOptionId];
        }
    }
})
</script>

<style scoped>

.drop-down {
    width: 100%;
    padding-bottom: 2vh;
    padding-top: 1vh;
    padding-left: 1vh;
    text-align: left;
}

.drop-down:hover {
    background-color: rgba(102, 102, 102, 0.26);
}


.option {
    max-width: 100%;
    min-height: 3.5vh;
    line-height: 3.5vh;
    padding-left: 1vh;
}

.option:hover {
    background-color: rgb(40, 59, 59);
}

.chosenOption {
    position: relative;
    box-sizing: border-box;
    border: 1px solid rgb(61, 118, 119);
}

.chosenOption:hover {
    background-color: rgb(34, 34, 34);
}

.infotip {
    position: absolute;
    top: 20%;
    left: 105%;
    height: 60%;
}

.infoIconContainer {
    position: absolute;
    top: 0%;
    left: 105%;
    height: 100%;
}

.infoIconContainer:hover::after {
    content: attr(data-tool-tip);
    top: 100%;
    right: -35px;
    position: absolute;
    width: 10vw;
    background-color: rgb(187, 212, 211);
    border-radius: 2px;
    color: rgb(47, 47, 47);
    line-height: 2vh;
    text-align: center;
    padding: 5px;
    z-index: 10;
}

.options {
    margin-top: 1vh;
    max-width: 84%;
    background-color: rgb(34, 34, 34);
}
</style>