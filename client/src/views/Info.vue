<template>
    <div>
        <Navi />
        <div class="info" id="infoDiv">
            <h3>Jak to działa ? Czyli bezpieczeństwo</h3>
            <div class="benefit">
                <img src="../assets/e2eInfo.png" class="InfoGraphic">
                <div class="infoTextDiv">
                    <h1>Szyfrowanie End to End</h1>
                    <p>Wiadomości są zaszyfrowane przez cały czas.
                        Wiadomości są przechowywane na serwerach NiezależnyChat w zaszyfrowanym formacie. Są one również przesyłane w zaszyfrowanej formie pomiędzy naszymi serwerami a urządzeniami użytkowników. Szyfrowanie to znacznie zmniejsza ryzyko przechwycenia wiadomości.</p>
                </div>
            </div>
            <div class="benefit">
                <img src="../assets/safe.png" class="InfoGraphic" id="safeIcon">
                <div class="infoTextDiv">
                    <h1>Brak dostępu do danych użytkownika</h1>
                    <p>
                        Twoje zaszyfrowane dane nie są dla nas dostępne.
                        Architektura zerowego dostępu oznacza, że Twoje dane są zaszyfrowane w sposób, który czyni je dla nas niedostępnymi. Dane są szyfrowane po stronie klienta przy użyciu klucza szyfrowania, do którego nie mamy dostępu. Oznacza to, że nie mamy technicznej możliwości odszyfrowania Twoich wiadomości, a co za tym idzie, nie jesteśmy w stanie przekazać Twoich danych osobom trzecim.
                        Z NiezaleznymChatem, prywatność nie jest tylko obietnicą, jest to matematycznie zapewnione.
                        Z tego powodu nie jesteśmy również w stanie przeprowadzić odzyskiwania danych.
                        Jeśli zapomną Państwo hasła, nie możemy odzyskać Państwa danych.
                    </p>
                </div>
            </div>
            <div class="benefit">
                <img src="../assets/air.png" class="InfoGraphic small">
                <div class="infoTextDiv">
                    <h1>Wiadomości czasowe lub z autodestrukcją</h1>
                    <p>
                        NiezależnyChat daje Ci pełną kotnrolę nad swoimi wiadomościami i historią chatu.
                        Możesz podjąć decyzje o niszczeniu swoich wiadomości odrazu po odczytaniu przez adresata, ustawić wiadomości czasowe lub prowadzić chat z pełną historią.
                    </p>
                </div>
            </div>
            <div class="benefit">
                <img src="../assets/notrack.png" class="InfoGraphic small">
                <div class="infoTextDiv">
                    <h1>Brak mechanizmów śledzących Cię w internecie</h1>
                    <p>
                        Brak śledzenia lub rejestrowania informacji umożliwiających identyfikację osoby
                        W przeciwieństwie do konkurencyjnych, popularnych usług, nie zapisujemy żadnych informacji śledzących.
                        Domyślnie nie zapisujemy metadanych, takich jak adresy IP używane do logowania się na konta lub ciasteczka.
                        Ponieważ nie mamy możliwości odczytywania zaszyfrowanych wiadomości chatów, nie obsługujemy ukierunkowanych działań reklamowych Aby chronić prywatność użytkowników, NiezależnyChat.pl nie wymaga żadnych danych osobowych do rejestracji.
                        Ponadto udostępniamy możliwość korzystania z aplikacji użytkownikom niezarejestrowanym.

                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import Navi from "@/components/LandingPage/Navi.vue";

@Options({
    components: {Navi},
})
//font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
export default class Main extends Vue {}
</script>

<style scoped>

.InfoGraphic {
    position: absolute;
    height: 90%;
    top: 5%;
    right: 5%;
}

.small {
    right: 10%;
    top: 15%;
    height: 70%;
}
#safeIcon {
    top: 35%;
    height: 40%;
    right: 25%;
}

.infoTextDiv {
    position: absolute;
    width: 43%;
    left: 2%;
    text-align: left;
}

.infoTextDiv p {
    font: 2.8vh Sen;
    line-height: 3.5vh;
    color: rgb(180, 180, 180);
}

.benefit {
    position: relative;
    width: 92vw;
    height: 70vh;
    margin: 1vh;
    margin-top: 15vh;
    margin-bottom: 15vh;
}

#infoDiv {
    margin-top: 6vh;
    display: table;
    color: rgb(212, 212, 212);
}

</style>