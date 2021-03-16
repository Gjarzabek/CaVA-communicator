<template>
    <div id="loginbg" :style="{width: bgWidth}">
        <img v-if="show" src="../../assets/arrow.png" @click="hideLogin">
        <div id="loginPanel" :style="{width: loginWidth, left: loginX, height: loginHeigh}">
            <div v-if="show" class="menu">
                <div class="menubtn loginbtn" :class="{active: isLogin}" @click="state='login'">Login</div>
                <div class="menubtn registerbtn" :class="{active: isRegister}" @click="state='register'">Rejestracja</div>
            </div>
            <div v-if="isLogin && show">
                <Input :isTextType="true" :info="'Email:'" :maxChars="30" :minChars="3" @valid="inputValid"/>
                <Input :isTextType="false" :info="'Hasło:'" :maxChars="30" :minChars="3" @valid="inputValid"/>
                <button class="openAppBtn" @click="login">Zaloguj</button>
            </div>
            <div v-else-if="isRegister && show">
                <Input :isTextType="true" :info="'Nazwa:'" :maxChars="30" :minChars="3" @valid="inputValid"/>
                <Input :isTextType="true" :info="'Email:'" :maxChars="30" :minChars="3" @valid="inputValid"/>
                <Input :isTextType="false" :info="'Hasło:'" :maxChars="30" :minChars="3" @valid="inputValid"/>
                <Input :isTextType="false" :info="'Powtórz Hasło:'" :maxChars="30" :minChars="3" @valid="inputValid"/>
                <button class="openAppBtn" @click="register">Zarejestruj</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from "@/components/LandingPage/Input.vue";

export default defineComponent({
    props: ["show"],
    components: {Input},
    methods: {
        hideLogin(): void {
            this.$emit('hideLogin');
        },
        login(): void {
            console.log("login request");
        },
        register(): void {
            console.log("register request");
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
                return "-1vw";
            }
        },
        bgWidth: function(): string {
            if (this.show) {
                return "99vw";
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
        },
        loginHeigh: function(): string {
            if (this.isLogin) {
                return "50vh";
            }
            else return "70vh";
        }
    },
})
</script>

<style scoped>

.nameinput {
    top: 45vh;
}

.secondpass {
    top: 35vh;
}

#passRepeat {
    top: 31vh;
}

#name {
    top: 41vh;
}

.border {
    position: absolute;
    left: 5%;
    top: 55%;
    width: 90%;
    text-align: center;
    border-bottom: 0.2vh solid black;
    font-family: Courier;
}

#loginbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;  
    margin: 0;
    background: linear-gradient(0, rgb(0, 0, 0), #000000);
    transition: 0.45s;
}

#loginbg img {
    position: absolute;
    right: 5vh;
    top: 2vh;
    width: 3vw;
}

.menu {
    position: relative;
    font-size: 1.1vw;
    width: 20vw;
    height: 5vh;
    margin-bottom: 3vh;
}

.menubtn {
    position: absolute;
    top: 1vh;
    font-size: 1.1vw;
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
    border-bottom: 0.5vh solid #05C6C6;
}

#passText {
    top:21vh;
}

#nickText {
    top: 11vh;
}

.nickname {
    top: 15vh;
}

.pass {
    top: 25vh;
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
    border: 0.1vw solid white;
    background-color: rgb(231, 231, 231);
}

input:focus {
    background-color: rgba(231, 231, 231, 0);
    border: 0.1vw solid rgb(65, 217, 255);
}

#loginPanel {
    position: absolute;
    top: 20vh;
    height: 50vh;
    background-color: rgb(255, 255, 255);
    transition: 0.5s;
    border-radius: 4vh;
    display: table;
}

.openAppBtn {
    position: absolute;
    height: 4vh;
    width: 50%;
    left: 25%;
    bottom: 10vh;
    border-radius: 20vh;
    outline: none;
    font: 2vh NovaFlat;
    border: 2px solid white;
    color: white;
    background-color: #05C6C6;
    transform: scale(1);
    cursor: pointer;
    transition: 0.3s;
}

.openAppBtn:hover {
    cursor: pointer;
    border: 2px solid #05C6C6;
    color: whitesmoke;
    color: black;
}

</style>
