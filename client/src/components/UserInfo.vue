<template>
    <div id="user">
        <div id="iconBg">
            <img v-if="fsocietyChosen" src="../assets/fsociety.png" alt=".." id='fsocietyIcon' @click="changeIcon">
            <img v-else src="../assets/freedomBird.png" alt=".." id='fsocietyIcon' @click="changeIcon">
        </div>
        <div id="userInfo">
            <div id="statusDot" :class="user.status"></div>
            <div id="nick" @click="toogleStatusMenu">{{userCredits.name}}</div>
            <div id="id">id: {{userCredits.id}}</div>
            <div id="desc" @click="changeDesc">{{descDemo}}</div>
        </div>
        <div v-if="showStatusPanel">
            <div id="statusMenu">
                <div v-for="status in possibleStatusList" v-bind:key="status.name">
                    <div class="statusOption" @click="changeStatus(status.name)">
                        <div class="MenuDot" :class="status.name"></div>
                        <div class="statusName">{{status.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="iconChoiceShow" id="IconChoice">
            <img src="../assets/fsociety.png" alt=".." class="iconToChose" @click="signalIconChange('fsociety')">
            <img src="../assets/freedomBird.png" alt=".." class="iconToChose" @click="signalIconChange('bird')">
        </div>
        <input v-if="showChangeDescDiv" v-model="descInputData" class="descInput" @keypress="submitDesc">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["userCredits", "user"],
    components: {},
    data() {
        return {
            showStatusPanel: false,
            showChangeDescDiv: false,
            iconChoiceShow: false,
            descInputData: this.user.desc,
            maxDescLen: 50,
            maxDescShowLen: 11,
            possibleStatusList: [{name: "dostępny"}, {name:"zaraz-wracam"}, {name:"zajęty"}],
            currentIcon: this.user.icon
        }
    },
    computed: {
        descDemo: function(): string {
            if (this.user.desc.length > this.maxDescShowLen) {
                return this.user.desc.substr(0, this.maxDescShowLen) + "...";
            }
            else if (!this.user.desc)
                return "opis";
            else return this.user.desc;
        },
        fsocietyChosen: function(): boolean {
            return this.user.icon === 'fsociety';
        }
    },
    methods: {
        toogleStatusMenu() {
            this.showStatusPanel = !this.showStatusPanel;
        },
        changeStatus(newStatus: string): void {
            this.$emit('statusChange', newStatus);
            this.toogleStatusMenu();
        },
        changeDesc(): void {
            if (this.showChangeDescDiv) {
                this.$emit('descChange', this.descInputData);
            }
            this.showChangeDescDiv = !this.showChangeDescDiv;
        },
        submitDesc(event: any): void {
            if (event.key === "Enter" && this.showChangeDescDiv) {
                this.changeDesc();
            }
        },
        changeIcon(): void {
            this.iconChoiceShow = !this.iconChoiceShow;
        },
        signalIconChange(name:string): void {
            this.currentIcon = name;
            this.$emit('iconChange', name);
            this.changeIcon();
        }
    },
    watch: {
        descInputData: function(): void {
            if (this.descInputData.length > this.maxDescLen) {
                this.descInputData = this.descInputData.substring(0, this.maxDescLen);
            }
        }
    },
})
</script>

<style scoped>

.descInput {
    position: absolute;
    top: 8vh;
    left: 5vw;
    z-index: 2;
    font: 1.8vh NovaFlat;
    outline: none;
    color: rgb(46, 46, 46);
    height: 3vh;
    width: 30vw;
}

#iconBg {
    position: absolute;
    border-radius: 100%;
    top: 1.24vh;
    left: 5%;
    width: 6.5vh;
    height: 6.5vh;
    background-color: #ffffff1f;
}

#iconBg:hover {
    background-color: #353535;
    
}

#fsocietyIcon {
    position: absolute;
    left: 10%;
    top: 10%;
    height: 80%;
    cursor: pointer;
}

#user {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 15vw;
    height: 9vh;
    background-color: #242222;
    border-right: solid 0.2vw #3B3939;
}

#userInfo {
    text-align: left;
    box-sizing: content-box;
    position: absolute;
    top: 11%;
    left: 34%;
    width: 65%;
    height: 80%;
}

#nick {
    font: 2vh NovaSquare;
    position: absolute;
    width: 9vw;
    top: 0%;
    left: 9%;
    color: rgb(182, 182, 182);
    cursor: pointer;
}

#nick:hover {
    background-color: #353535;
}

#nick:active {
    background-color: #979797;
}

#status {   
    border: none;
}

#id {
    position: absolute;
    top: 36%;
    font: 1.8vh Courier;
    color: rgb(182, 182, 182);
}

#desc {
    position: absolute;
    top: 68%;
    font: 1.6vh NovaFlat;
    border: none;
    color: rgb(182, 182, 182);
    cursor: pointer;
    width: 100%;
}

#desc:hover {
    background-color: #353535;
}

#statusDot {
    position: absolute;
    left: 0%;
    top: 8%;
    border-radius: 100%;
    width: 1.2vh;
    height: 1.2vh;
}

#statusMenu {
    position: relative;
    background-color: #EBEBEB;
    top: 3.5vh;
    left: 4.5vw;
    width: 10vw;
    z-index: 10;
    border-radius: 3px;
}

.MenuDot {
    position: relative;
    left: 0.5vw;
    top: 1vh;
    border-radius: 100%;
    width: 1.8vh;
    height: 1.8vh;  
}

.statusOption {
    box-sizing: border-box;
    position: relative;
    height: 4vh;
    width:10vw;
    cursor: pointer;
}

.statusOption:hover {
    background-color: #dbdbdb96;
}

.statusName {
    position: absolute;
    top: 0.7vh;
    left: 2vw;
    font: 1.7vh NovaSquare;
}

#IconChoice {
    position: absolute;
    top: 2vh;
    left: 5vw;
    padding: 1vh;
    background-color: rgb(93, 93, 93);
    z-index: 2;
    border-radius: 2vh;
}

.iconToChose {
    margin: 1vh;
    height: 6vh;
}

</style>