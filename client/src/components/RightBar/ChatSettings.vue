<template>
    <div id="settings">
        <div class="container marginBottom">
            <div class="settingsInfo" v-if="defaultSettings">
                Domyślne ustawienia
            </div>
            <div class="settingsInfo" v-else :data-tooltip="chatName">
                Ustawienia czatu:
            </div>
        </div>
        <div class="container transparent">
            <DropDown :header="'Długość życia wiadomości'" :optionList="selfDestructionTimeOptions"/>
        </div>
        <div class="container transparent">
            <DropDown :header="'Powiadomienia'" :optionList="alertOptions"/>
        </div>
        <div class="container transparent paddding">
            <PasswordInput/>
        </div>
        <div class="container transparent">
            Usuwa cały czat
        </div>
        <div class="container transparent">
            Zablokuj - Zablokowanie uniemożliwia drugiej osobie wysyłanie wiadomosci do Ciebie
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from '@/components/RightBar/DropDown.vue';
import PasswordInput from '@/components/RightBar/PasswordInput.vue';

export default defineComponent({
    props: ['defaultSettings', "chatName"],
    components: {DropDown, PasswordInput},
    data() {
        return {
            selfDestructionTimeOptions: [{
                        timeoffset: 1/24,
                        desc: "1 h",
                        info: "Wiadomość zostanie usunięta z czatu po godzinie"

                    },{
                        timeoffset: 0.5,
                        desc: "12 h",
                        info: "Wiadomość zostanie usunięta z czatu po 12 godzinach"
                    },{
                        timeoffset: 1,
                        desc: "24 h",
                        info: "Wiadomość zostanie usunięta z czatu po 24 godzinach"
                    },{
                        timeoffset: 7,
                        desc: "1 tyg",
                        info: "Wiadomość zostanie usunięta z czatu po tygodniu"
                    },{
                        timeoffset: -1,
                        desc: "nie usuwaj",
                        info: "Wiadomość nie zostanie usunięta"
                    },{
                        timeoffset: 0,
                        desc: "nie zapisuj w historii",
                        info: "Dotrze do adresata tylko jeśli jest online."
                    }
            ],
            alertOptions: [
                {desc: 'Włącz'},
                {desc: 'Wyłącz'}
            ],
            visablePass: false
        }
    }
})
</script>

<style scoped>

.settingsInfo {
    color: #646363;
    text-align: left;
    padding-left: 1.5vh;
    font-size: 1vw;
}

.settingsInfo::after {
    content: attr(data-tooltip);
    color: rgba(107, 194, 197, 0.692);
}

.container {
    background-color: rgb(34, 34, 34);
    display: flex;
    width: 90%;
    margin-left: 5%;
    min-height: 3.5vh;
    align-items: center;
}

#settings {
    width: 100%;
    height: 92%;
    overflow: visible;
}

.transparent {
    background-color: transparent;
}

.Options {
    text-align: left;
    padding-left: 2vh;
}

.paddding {
    text-align: left;
    box-sizing: border-box;
}

.paddding:hover {
    background-color: rgba(102, 102, 102, 0.26);
}

.topdown {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

#secretPass {
    min-height: 2.5vh;
}

.marginBottom {
    margin-bottom: 0.5vh;
}

</style>