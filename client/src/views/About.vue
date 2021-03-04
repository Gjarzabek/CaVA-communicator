<template>
    <div>
        <Navi />
        <div class="info">
            <h2>Motywacja</h2>
            <p>NiezależnyChat.pl powstal w odpowiedzi na postępujące ograniczanie prywatności ludzi w internecie.
                Chyba każdy z nas już zdążył się spotkać z reklamami które "czytają" nam w myślach ;).
                Tym którzy nie chcą ułatwiać dostępu do swoich prywatnych wiadomości i
                chatować w internecie bez obecności "osób trzecich ;)" oferujemy naszą aplikacje.
                Polecamy również korzystanie z przeglądarek dbających o prywatność takich jak
                <a href="https://duckduckgo.com/">duckduckgo</a>
                lub
                <a href="https://brave.com/">brave</a>
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
.about {
    position: absolute;
    top: 10vh;
    margin: 5vh;
    color: white;
    font: 2vh Sen;
}

.info a {
    color:rgb(50, 156, 205)
}
</style>