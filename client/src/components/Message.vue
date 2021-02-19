<template>
    <div class="message">{{Message}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ["Message"],
  components: {},
})
</script>

<style scoped>

.message {
    box-sizing: border-box;
    border: solid dimgray 15px;
    margin-left: 40px;
    border-radius: 20px;
    margin-top: 10px;
    background-color: dimgray;
    display: table;
}

</style>