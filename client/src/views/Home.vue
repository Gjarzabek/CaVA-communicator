<template>
    <div>
        <Navi />
        <div class="payload">
            <h1 id="hdr">Tutaj Twoja prywatność ma znaczenie</h1>
            <p id="opis">
            Jeśli masz dość ciągłego śledzenia w internecie, szukasz pewnego kanału komunikacji lub
            tak jak My poprostu chciałbyś odzyskać kontrolę nad swoją prywatnością.
            </p>
            <button class="openAppBtn" @click="openLogin">Otwórz Aplikacje</button>
        </div>
        <LoginPanel :show="loginVisable"/>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import Navi from "@/components/LandingPage/Navi.vue";
import LoginPanel from "@/components/LandingPage/LoginPanel.vue";

@Options({
    components: {Navi, LoginPanel},
    data() {
        return {
            loginVisable: false
        };
    },
    methods: {
        goApp() {
            this.$router.push('/app');
        },
        openLogin() {
            this.loginVisable = true;
        }
    },

})

export default class Main extends Vue {}
</script>

<style scoped>

.payload {
    position: relative;
    top: 7vh;
    background-color: rgba(0, 0, 0, 0);
}

.openAppBtn {
    position: relative;
    height: 11vh;
    width: 20vw;
    border-radius: 20vh;
    outline: none;
    font: 3vh NovaFlat;
    color: white;
    background-color: #05C6C6;
    transform: scale(1);
    transition: 0.2s;
    margin-top: 7vh;
    margin-bottom: 4vh;
}

.openAppBtn:hover {
    cursor: pointer;
    transform: scale(1.05);
}

#hdr {
    position: relative;
    padding-top: 15vh;
    width: 99%;
    font-family: Sen;
    color: white;
}

#opis {
    position: relative;
    text-align: center;
    margin-top: 10vh;
    margin-bottom: 10vh;
    left: 16vw;
    width: 68vw;
    font: 2.7vh Sen;
    color: rgb(236, 236, 236);
}
</style>