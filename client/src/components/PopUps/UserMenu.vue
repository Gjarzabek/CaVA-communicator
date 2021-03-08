<template>
    <div class="popUpMain">
        <div class="opcja" @click="newChatRequest">Nowy Chat</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["user"],
  components: {},
  methods: {
      newChatRequest() {
          this.$emit('newChatRequest');
      }
  }
})
</script>

<style scoped>

.popUpMain {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5vh;
}

.opcja {
    box-sizing: border-box;
    position: relative;
    height: 2.5vh;
    background-color: #dfdfdf;
    color: rgb(34, 34, 34);
    border-radius: 2px;
    border: 2px solid rgb(126, 126, 126);
    font-size: 1.8vh;
}

.opcja:hover {
    background-color: #6ccde6;
}

</style>