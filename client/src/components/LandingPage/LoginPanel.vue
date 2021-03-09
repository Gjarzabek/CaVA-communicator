<template>
    <div id="loginbg" :style="{width: bgWidth}">
        <img v-if="show" src="../../assets/arrow.png" @click="hideLogin">
        <div id="loginPanel" :style="{width: loginWidth, left: loginX}">
            <div v-if="show">
                <div class="menu loginbtn" :class="{active: isLogin}" @click="state='login'">Login</div>
                <div class="menu registerbtn" :class="{active: isRegister}" @click="state='register'">Rejestracja</div>
            </div>
            <div v-if="isLogin && show">
                <div class="inputdesc" id="nickText">Twoja Nazwa:</div>
                <input type="text" class="nickname">
                <div class="inputdesc" id="passText">Hasło:</div>
                <input type="password" class="pass">
            </div>
            <div v-else-if="isRegister && show">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
    props: ["show"],
    components: {},
    methods: {
        hideLogin(): void {
            this.$emit('hideLogin');
        }
    },
    data() {
        return {
            state: "login",
        }
    },
    computed: {
        loginWidth: function(): any {
            if (this.show) {
                return "20vw";
            }
            else {
                return "0vw";
            }
        },
        loginX: function(): any {
            if (this.show) {
                return "40vw";
            }
            else {
                return "0vw";
            }
        },
        bgWidth: function(): string {
            if (this.show) {
                return "100vw";
            }
            else return "0vw";
        },
        bgHeight: function(): string {
             return "100vh";
        },
        isLogin: function(): boolean {
            return this.state === "login";
        },
        isRegister: function(): boolean {
            return this.state === "register";
        }
    }
})
</script>

<style scoped>

#loginbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: #111111;
    transition: 0.45s;
}

#loginbg img {
    position: absolute;
    right: 5vh;
    top: 2vh;
    width: 3vw;
}

.menu {
    position: absolute;
    top: 1vh;
    font-size: 2vh;
    color: rgb(37, 37, 37);
    text-align: center;
}

.loginbtn {
    left: 4vw;
}

.registerbtn {
    right: 4vw;
}

.active {
    border-bottom: 4px solid #05C6C6;
}

#passText {
    top:31vh;
}

#nickText {
    top: 21vh;
}

.nickname {
    top: 25vh;
}

.pass {
    top: 35vh;
}

.inputdesc {
    font: 1.8vh NovaFlat;
    position: absolute;
    text-align: left;
    text-indent: 0.6vw;
    margin: 1vh;
}

input {
    position: absolute;
    text-indent: 1vh;
    left: 5%;
    width: 90%;
    height: 4vh;
    border-radius: 1vh;
    border:none;
    outline:none;
    font: 1.8vh Sen;
    border: 0.01vw solid white;
}

input:focus {
    border: 0.01vw solid rgb(65, 217, 255);
}

#loginPanel {
    position: absolute;
    top: 20vh;
    height: 65vh;
    background-color: rgb(207, 207, 207);
    transition: 0.5s;
    border-radius: 4vh;
    display: table;
}

</style>
