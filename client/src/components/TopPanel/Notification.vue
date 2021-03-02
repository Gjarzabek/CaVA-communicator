<template>
    <div class="notofication">
        <h2>{{data.from}}</h2>
        <p>{{data.info}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["data"],
  components: {},
})
</script>

<style scoped>

.notofication {
    position: relative;
    margin: 0.5vh;
    line-height: 5vh;
    border-radius: 1vh;
    color: white;
    font-family: Sen;
    text-indent: 0vw;
    text-align: center;
}

.notofication:hover {
    background-color: rgb(56, 56, 56);
}

</style>