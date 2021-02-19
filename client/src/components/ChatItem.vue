<template>
    <div class="ChatItem">
      {{user.nick}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ["user"],
  components: {},
})
</script>

<style scoped>

.ChatItem {
    transform: scale(1);
    box-sizing: border-box;
    height: 4.5%;
    border-radius: 10px;
    margin-top: 5px;
    background-color: #3D5D6E;
    border: solid 8px #3D5D6E;
    color: rgba(255, 255, 255, 0.514);
    transition: 0.2s;
}

.ChatItem:hover {
    transform: scale(0.98);
}

</style>