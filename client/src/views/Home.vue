<template>
    <div>
        <Navi />
        <h1 id="hdr">Tutaj Twoja prywatność ma znaczenie</h1>
        <p id="opis">
        Jeśli masz dość ciągłego śledzenia w internecie, szukasz pewnego kanału komunikacji lub
        tak jak My poprostu chciałbyś odzyskać kontrolę nad swoją prywatnością.
        </p>
        <button class="openAppBtn">Otwórz Aplikacje</button>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import Navi from "@/components/LandingPage/Navi.vue";

@Options({
    components: {Navi},
    data() {
        return {
            home: 0
        };
    },
    methods: {
        goApp() {
            this.$router.push('/app');
        }
    }
})

export default class Main extends Vue {}
</script>

<style>

.openAppBtn {
    position: absolute;
    height: 11vh;
    width: 20vw;
    left: 40vw;
    bottom: 17vh;
    border-radius: 20vh;
    outline: none;
    font: 3vh NovaFlat;
    color: white;
    background-color: #05C6C6;
    transform: scale(1);
    transition: 0.2s;
}

.openAppBtn:hover {
    cursor: pointer;
    transform: scale(1.05);
}

#hdr {
    color: white;
    font-family: Sen;
    position: absolute;
    top: 25vh;
    width: 99%;
}

#opis {
    position: absolute;
    left: 16vw;
    top: 39vh;
    text-align: center;
    width: 68vw;
    font: 2.7vh Sen;
    color: rgb(236, 236, 236);
}
</style>