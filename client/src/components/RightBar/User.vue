<template>
    <div class="user" @click="$emit('openChat')">
        <div id='infodot' :class="user.status"></div>
        <div class='userName'>{{user.name}}</div>
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
    top: 25%;
    border-radius: 100%;
    width: 1.2vh;
    height: 1.2vh;
}

</style>