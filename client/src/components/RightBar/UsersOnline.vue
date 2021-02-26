<template>
    <div id="members">        
        <p id="titlePara">Uczestnicy Chatu</p>
        <div id="searchDiv">
            <img src="../../assets/search_icon.png" alt=".." class='searchIcon'>
            <input type="search" placeholder="Szukaj" id="usersSearch" @input="$emit('search', $event.target.value)">
        </div>
        <div id="usersScroll">
            <div v-for="user in Users" v-bind:key="user.id">
                <User v-bind:user="user" @openChat="$emit('openChat', user)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import User from '@/components/RightBar/User.vue';

/*
interface User {
    id: number,
    nick: string
};*/

export default defineComponent({
  props: ['Users'],
  components: { User },
})
</script>

<style scoped>
#members {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 6%;
    width: 15%;
    height: 94%;
    background-color: #3B3939;
}

#titlePara {
    margin-left: 12px;
    text-align: left;
    font: 2vh NovaScript;
    color: #C6BDBD;
}

#usersScroll {
    margin-top: 15px;
    width: 100%;
    height: 86%;
    overflow-y: auto;
}

#usersSearch {
    background-color: rgba(255, 255, 255, 0);
    font: 16px NovaFlat;
    color: rgba(255, 255, 255, 0.589);
    text-indent: 5px;
    border: none;
    outline: none;
    transition: 0.2s;
    border-radius: 2px;
    margin-left: 8%;
    margin-top: 2.2%;
    width: 73%;
    height: 70%;
}

#usersSearch::placeholder {
    color: #646363;
    font: 16px NovaFlat;
}


#searchDiv {
    height: 3.5vh;
    width: 90%;
    margin-left: 5%;
    background-color: #262525;
}

.searchIcon {
    position: absolute;
    left: 10%;
    margin-top: 2%;
    width: 7%;
}
</style>