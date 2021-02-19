<template>
    <div class="user" @click="$emit('openChat')">
        {{user.nick}}
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
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 5px;
    margin-left: 5%;
    width: 90%;
    background-color: #1f2429;
    border: solid 8px #1f2429;
    color: blanchedalmond;
}
</style>