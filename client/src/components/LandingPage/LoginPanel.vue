<template>
    <div id="loginbg" :style="{width: bgWidth}">
        <img v-if="show" src="../../assets/arrow.png" @click="hideLogin">
        <div id="loginPanel" :style="{width: loginWidth, left: loginX, height: loginHeigh}">
            <div v-if="show" class="menu">
                <div class="menubtn loginbtn" :class="{active: isLogin}" @click="state='login'">Login</div>
                <div class="menubtn registerbtn" :class="{active: isRegister}" @click="state='register'">Rejestracja</div>
            </div>
            <div v-if="isLogin && show">
                <Input :isTextType="true" :info="'Email:'" :maxChars="30" :minChars="3" @good="(event) => {loginInput(event, 'email')}" @bad="deleteLoginInput('email')"/>
                <Input :isTextType="false" :info="'Hasło:'" :maxChars="30" :minChars="3" @good="(event) => {loginInput(event, 'pass')}" @bad="deleteLoginInput('pass')"/>
                <button class="openAppBtn" @click="login">Zaloguj</button>
            </div>
            <div v-else-if="isRegister && show">
                <Input :isTextType="true" :info="'Nazwa:'" :maxChars="30" :minChars="3" @good="(event) => {registerValid(event, 'nazwa')}" @bad="deleteRegisterInput('nazwa')"/>
                <Input :isTextType="true" :info="'Email:'" :maxChars="30" :minChars="3" @good="(event) => {registerValid(event, 'email')}" @bad="deleteRegisterInput('email')"/>
                <Input :isTextType="false" :info="'Hasło:'" :maxChars="30" :minChars="3" @good="(event) => {registerValid(event, 'pass')}" @bad="deleteRegisterInput('pass')"/>
                <Input :isTextType="false" :info="'Powtórz Hasło:'" :maxChars="30" :minChars="3" @good="(event) => {registerValid(event, 'pass2')}" @bad="deleteRegisterInput('pass2')"/>
                <div v-if="()=>{return this.message != ''}" class="alert">{{message}}</div>
                <div v-if="()=>{return this.registerMessage != ''}" :class="{loaded: registerState === 'succeed', blue: registerState === '', alert: registerState === 'failed'}">{{registerMessage}}</div>
                <div class="dot" :class="`${registerState}`"></div>
                <button class="openAppBtn" @click="register">Zarejestruj</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from "@/components/LandingPage/Input.vue";

export default defineComponent({
    props: ["show", "registerState", "loginState"],
    components: {Input},
    methods: {
        hideLogin(): void {
            this.$emit('hideLogin');
        },
        login(): void {
            if (this.isLoginAllowed) {
                this.$emit('login', this.loginInputs);
            }
            else {
                console.log("login not allowed");
            }
        },
        register(): void {
            if (this.isRegisterAllowed) {
                this.$emit('register', this.registerInputs);
            }
            else {
                console.log("register not allowed");
            }
        },
        loginInput(event: any, inputId: string): void {
            console.log(`Inputvalid(${event},${inputId})`);
            this.loginInputs.set(inputId, event);
        },
        registerValid(event: any, inputId: string): void {
            console.log(`Inputvalid(${event},${inputId})`);
            this.registerInputs.set(inputId, event);
        },
        deleteLoginInput(id: string): void {
            this.loginInputs.delete(id);
        },
        deleteRegisterInput(id: string): void {
            this.registerInputs.delete(id);
        },
        passwordsMatch(): boolean {
            if (this.registerInputs.has('pass') && this.registerInputs.has('pass2')) {
                const same = this.registerInputs.get('pass') === this.registerInputs.get('pass2');
                if (same) {
                    this.message = "";
                    return true;
                }
                this.message = "Hasła muszą być takie same";
            }
            else {
                this.message = "Uzupełnij brakujące pola";
            }
            return false;
        }
    },
    data() {
        return {
            state: "login",
            loginInputs: new Map(),
            registerInputs: new Map(),
            message: "",
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
        },
        isRegisterAllowed: function(): boolean {
            return this.isRegister && this.passwordsMatch() && this.registerInputs.size === 4;
        },
        isLoginAllowed: function(): boolean {
            return this.isLogin && this.loginInputs.size === 2;
        },
        registerMessage: function(): string {
            switch (this.registerState) {
                case 'loading':
                    return "Wysyłanie danych..";
                case 'succeed':
                    return "Zarejestrowano"
                case 'failed':
                    return "Email zajęty";
                default:
                    return '';
            }
        }
    },
    watch: {
        registerState: function() {
            if (this.registerState === "succeed") {
                setTimeout(()=>{this.state="login"}, 1100);
            }
        }
    }
})
</script>

<style scoped>

.dot {
    position: absolute;
    height: 2vw;
    width: 2vw;
    left: 9vw;
    bottom: 15vh;
    border-radius: 50%;
    background-color: rgba(11, 226, 241, 0.376);
    z-index: 2000;
    transition: 1s;
    transform: scale(0.7);
}

.blue {
    color: rgb(21, 200, 255);
}

.alert {
    color:red;
}

.loading {
    animation: pulse 2s;
    animation-iteration-count: infinite;
}

.loading:hover {
    left: 7vw;
}

@keyframes pulse {
    0% {
        transform: scale(0.1);
    }
    50% {
        background-color: rgb(11, 226, 241);
        transform: scale(1);
    }
    100% {
        transform: scale(0.1);
    }
}

.succeed {
    background-color: rgb(37, 255, 55);
    transition: 2s;
}

.loaded {
    color: greenyellow;
}

.failed {
    background-color: red;
}

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
