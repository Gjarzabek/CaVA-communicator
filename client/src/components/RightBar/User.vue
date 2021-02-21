<template>
    <div class="user" @click="$emit('openChat')">
        <div id='infodot' :class="user.status"></div>
        <div class='userName'>{{user.nick}}</div>
    </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["user"],
  components: {}
})
</script>

<style scoped>


.user {
    position: relative;
    box-sizing: border-box;
    margin-top: 5px;
}

.user:hover {
    background-color: #262525;
}

.userName {
    margin-left: 15%;
    text-align: left;
    color: #C6BDBD;
    font: 2vh NovaFlat;
}

#infodot {
    position: absolute;
    left: 8%;
    top: 6.2px;
    border-radius: 100%;
    width: 10px;
    height: 10px;}

.online {
    background-color: #83DF5E;
}

.offline {
    background-color: #D94444;
}

.brb {
    background-color: #E1A244;
}

</style>