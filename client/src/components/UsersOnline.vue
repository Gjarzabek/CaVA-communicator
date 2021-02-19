<template>
    <div id="members">        
        <div id="memebrsTitle">
            <h3 id="titlePara">Users Online</h3>
        </div>
        <input type="search" placeholder="search" id="usersSearch" @input="$emit('search', $event.target.value)">
        <div id="usersScroll">
            <div v-for="user in Users" v-bind:key="user.id">
                <User v-bind:user="user" @openChat="$emit('openChat', user)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import User from '@/components/User.vue';

interface User {
    id: number,
    nick: string
};

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
    width: 15%;
    height: 98.5%;
    
    background-color: #3D5D6E;
    color: blanchedalmond;

    border-radius: 10px;
}

#memebrsTitle {
    margin-left: 10px;
    border-left: #88B6BF solid 10px;
}

#titlePara {
    margin-left: 10px;
    font-size: 2vh;
    text-align: left;
}

#usersScroll {
    margin-top: 15px;
    width: 100%;
    height: 89%;
    overflow-y: auto;
}

#usersSearch {
    background-color: rgba(245, 222, 179, 0.185);
    text-indent: 5px;
    color: black;
    border: none;
    outline: none;
    transition: 0.2s;
    border-radius: 2px;
    width: 50%;
}

#usersSearch::placeholder {
    color: rgba(255, 255, 255, 0.589);
}

#usersSearch:focus {
    box-shadow: 0 0 0.8em #88B6BF;
    border-radius: 10px;
}
</style>