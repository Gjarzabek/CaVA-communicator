<template>
    <div id="settings">
        <div class="container">
            <div class="settingsInfo" v-if="defaultSettings">
                Domyślne ustawienia
            </div>
            <div class="settingsInfo" v-else :data-tooltip="chatName">
                Ustawienia czatu:
            </div>
        </div>
        <div class="container spacetop">
            <DropDown :header="'Długość życia wiadomości'" :optionList="selfDestructionTimeOptions"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from '@/components/RightBar/DropDown.vue';

export default defineComponent({
    props: ['defaultSettings', "chatName"],
    components: {DropDown},
    data() {
        return {
            selfDestructionTimeOptions: [{
                        timeoffset: 0,
                        desc: "nie zapisuj w historii",
                        info: "Dotrze do adresata tylko jeśli jest online."
                    },{
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
                        info: ""
                    }
                ]
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
    background-color: #262525;
    display: flex;
    width: 90%;
    margin-left: 5%;
    min-height: 3.5vh;
    align-items: center;
}

#settings {
    width: 100%;
    height: 92%;
    overflow-y: auto;
}

.spacetop {
    background-color: transparent;
}

.Options {
    text-align: left;
    padding-left: 2vh;
}

</style>