<template>
    <div>
        <Navi />
        <div class="info">
            <h2>Funkcje Aplikacji</h2>
            <div class="plain">
                Istnieje możliwość komunikacji na 3 sposoby
                <ol>
                    <li>Chat ze znajomym</li>
                        <ul>
                            <li>
                                <b>Tajny</b>
                            </li>
                            Ten typ zachowuje poufność chatu w 100%. Treści wiadomości nie są widoczne nawet dla nas.
                            Przed wysłaniem do internetu treść twojej wiadomości jest szyfrowana za pomocą podanego hasła.
                            Odbiorca następnie by odszyfrować chat musi wprowadzić to hasło.
                            Hasło służy jedynie do szyfrowania i odszyfrowania wiadomości - nie jest nigdzie przez nas zapisywane.
                            Istnieje możliwość przechowywania historii chatu na serwerach ale w postaci zaszyfrowanej
                            zatem nie mamy dostępu do treści chatu.
                            <li>
                                <b>Unikalna Sesja</b>
                            </li>
                            Podobnie jak chat Tajny zachowuje poufność chatu w 100%. 
                            Różnica polega na tym że wiadomości szyfrowane są z pomocą specjalnie wygenerowanych jednorazowych kluczy.
                            Zatem nie musisz za każdym razem wpisywać hasła.
                            Sesje można utworzyć jedynie ze znajomym który jest online(dostępny). Nie ma możliwości zapisania historii chatu.
                            Sesja wygasa po rozłączeniu się jednego z użytkowników
                            <li>
                                <b>Zwykły</b>
                            </li>
                            Bez dodatkowego szyfrowania treści chatu. Tak jak w innych komunikatorach Facebook/discord itp.
                            Z wyjątkiem że możesz ustawić czas po którym wiadomości będą usuwane z historii i bazy danych.
                            W razie naruszenia prawa mamy możliwość wglądu w treść wiadomości grupy
                        </ul>
                    <li>Prywatne grupy</li>
                    <div class="opistypu">
                        Każdy zalogowany użytkownik może stworzyć grupę i zaprosić do niej innego użytkownika wpisując jego ID
                        Wiadomości w grupie są widoczne tylko dla użytkowników do niej należących
                        Prywatne Grupy dzielimy na:
                        <ul>
                            <li>
                                <b>Tajne</b>
                            </li>
                            Ten typ zachowuje poufność chatu grupy w 100%. Treści wiadomości nie są widoczne nawet dla nas.
                            Przed wysłaniem do internetu treść twojej wiadomości jest szyfrowana za pomocą podanego hasła.
                            Hasło to musi być znane dla każdego uczestnika chatu i zawsze identyczne by odbiorca mógł odczytać wiadomość.
                            Hasło służy jedynie do szyfrowania i odszyfrowania wiadomości - nie jest nigdzie przez nas zapisywane.
                            Istnieje możliwość przechowywania historii chatu grupy na serwerach ale w postaci zaszyfrowanej za pomocą "waszego hasła" zatem nie mamy dostępu do treści chatu.
                            Hasło radzimy ustalić w poufny sposób najlepiej poza internetem.
                            <li>
                                <b>Zwykłe</b>
                            </li>
                            Bez dodatkowego szyfrowania treści chatu. Tak jak w innych komunikatorach Facebook/discord itp.
                            Z wyjątkiem że możesz ustawić czas po którym wiadomości będą usuwane z historii i bazy danych.
                            W razie naruszenia prawa mamy możliwość wglądu w treść wiadomości grupy
                        </ul>
                    </div>
                    <li>Kanały publiczne</li>
                    <div class="opistypu">
                        Są to publiczne pokoje z ograniczoną liczbą miejsc, do których
                        może dołączyć każdy zalogowany użytkownik. Wiadomosci w kanałach publicznych nie są dodatkowo szyfrowane.
                        Czyli tak jak w każdym innym komunikatorze serwer(czyli my :]) ma możliwość podejrzenia treści chatu.
                        Wiadomości są usuwane z historii po 12 godzinach.
                    </div>
                </ol>
                Gdy wybierzesz opcje "chatuj jako gość" uzyskasz dostęp tylko do Chatu ze znajomym
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

<style>
.info {
    position: absolute;
    top: 9vh;
    margin: 6vh;
    width: 88vw;
    text-align: left;
    color: whitesmoke;
    font-family: Sen;
}

.info p {
    font: 2.4vh Sen;
    margin: 8vh;
    margin-bottom: 15vh;
}

.info h2 {
    margin: 2vh;
    margin-top: 10vh;
    font-size: 3vh;
}

.opistypu {
    margin-left: 3vh;
}

.plain {
    font: 2.4vh Sen;
    margin: 8vh;
    margin-bottom: 15vh; 
}

li {
    margin-top: 3vh;
    margin-bottom: 3vh;
}


</style>