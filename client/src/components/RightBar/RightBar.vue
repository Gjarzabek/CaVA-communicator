<template>
    <div id="rightBar">
        <div class="barMenu">
            <div class="barOption" :class="{active: displayInChatUsers}" @click="()=>displayOption='users'">
                Uczestnicy
            </div>
            <div class="barOption" :class="{active: displaySettings}" @click="()=>displayOption='settings'">
                Ustawienia
            </div>
        </div>
        <UsersOnline v-if="displayInChatUsers" :Users="Users" @search="forward"/>
        <ChatSettings v-else-if="displaySettings" :chatName="chatName" :defaultSettings="areDefault"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UsersOnline from '@/components/RightBar/UsersOnline.vue';
import ChatSettings from '@/components/RightBar/ChatSettings.vue';

export default defineComponent({
    props: ['Users', 'activeChat', 'chatName'],
    data() {
        return {
            displayOption: 'settings'
        }
    },
    components: { UsersOnline, ChatSettings },
    computed: {
        displaySettings: function(): boolean {
            return this.displayOption === 'settings';
        },
        displayInChatUsers: function(): boolean {
            return this.displayOption === 'users';
        },
        areDefault: function(): boolean {
            return this.activeChat === undefined;
        }
    },
    methods: {
        forward: function(val: any): void {
            this.$emit('search', val);
        }
    }
})
</script>

<style scoped>
#rightBar {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 6%;
    width: 15%;
    height: 94%;
    background-color: #3B3939;
    color: #C6BDBD;
    font-family: Sen;
}

.active {
    border-bottom: 2px solid rgba(107, 194, 197, 0.692);
}

.barMenu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 15vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
    font-size: 16px;
}

</style>
