<template>
    <div>
        <Navi />
        <div class="info">
            <h2>Motywacja</h2>
            <p class="p">NiezależnyChat.pl powstal w odpowiedzi na postępujące ograniczanie prywatności ludzi w internecie.
                Chyba każdy z nas już zdążył się spotkać z reklamami które "czytają" nam w myślach.
                Naszym celem jest zapewnienie możliwości prywatnych rozmów w internecie w łatwy i przystępny sposób.
                Jeśli chcesz chatować w internecie bez ryzyka wycieku treści rozmów oferujemy Ci naszą aplikacje.
                Polecamy również korzystanie z przeglądarek dbających o prywatność takich jak
                <a href="https://brave.com/">brave</a>
                lub
                <a href="https://duckduckgo.com/">duckduckgo</a>
                a dla wymagających
                <a href="https://www.torproject.org/">TOR</a>
                oraz
                <a href="https://protonvpn.com/">VPN</a>
            </p>
        </div>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import Navi from "@/components/LandingPage/Navi.vue";

@Options({
    components: {Navi},
})

export default class Main extends Vue {}
</script>

<style scoped>

.p {
    line-height: 4vh;
    color: rgb(211, 211, 211);
}

.about {
    position: absolute;
    top: 10vh;
    margin: 5vh;
    font: 2vh Sen;
}

.info a {
    color:rgb(50, 156, 205);
}

</style>