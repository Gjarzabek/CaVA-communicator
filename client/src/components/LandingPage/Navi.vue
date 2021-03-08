<template>
    <div>
        <img id="logoimg" src="../../assets/crow.png">
        <div id="logo" @click="goHome">NiezależnyChat.pl</div>
        <div id="features" class="navilink" @click="goFeatures">Funkcje</div>
        <div id="how" class="navilink" @click="goInfo">Jak to działa ?</div>
        <div id="about" class="navilink" @click="goAbout">O nas</div>
        <button id="openapp" class="openAppBtn" @click="openLogin">Zaloguj</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
    props: [],
    components: {},
    methods: {
        goHome() {
            this.$router.push('/');
        },
        goAbout() {
            this.$router.push('/onas');
        },
        goInfo() {
            this.$router.push('/info');
        },
        goApp() {
            this.$router.push('/app');
        },
        goFeatures() {
            this.$router.push('/features');
        },
        openLogin() {
            this.$emit('login', 'open');
        }
    }
})
</script>

<style scoped>

#about {
    left: 80vw;
    width: 6vw;
}

#how {
    left: 70.4vw;
}

.navilink {
    position: absolute;
    top: 3vh;
    color: #05C6C6;
    font: 2.4vh Sen;
    width: 9vw;
}

.navilink:hover {
    text-decoration: underline;
}

#logo {
    position: absolute;
    top: 3vh;
    left: 5vw;
    color: #ffffff;
    font: 3vh NovaFlat;
    cursor: pointer;
}

#logoimg {
    position: absolute;
    width: 3vw;
    left: 1.8vw;
    top: 1.4vh;
}

#features {
    left: 63vw;
    width: 6vw;
}

#openapp {
    top: 2.8vh;
    left: 87vw;
    width: 9vw;
    height: 4vh;
    font: 1.7vh NovaFlat;
    background-color: rgb(255, 255, 255);
    border: none;
    color: black;
}

.openAppBtn {
    position: absolute;
    height: 11vh;
    width: 20vw;
    left: 40vw;
    bottom: 17vh;
    border-radius: 20vh;
    outline: none;
    font: 3vh NovaFlat;
    border: 2px solid white;
    color: white;
    background-color: #05C6C6;
    transform: scale(1);
    transition: 0.4s;
}

#openapp:hover {
    cursor: pointer;
    background-color: rgba(192, 56, 56, 0);
    border: 2px solid #05C6C6;
    transform: scale(1.05);
    color: whitesmoke;
}

</style>
