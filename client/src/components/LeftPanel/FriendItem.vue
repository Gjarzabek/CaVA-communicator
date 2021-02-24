<template>
    <div class="friend">
        <div class="statusDot" :class="friend.status"></div>
        <div class='name'>
            {{friend.name}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["friend"],
  components: {}
})
</script>

<style scoped>
.statusDot {
    position: relative;
    border-radius: 100%;
    margin-left: 2vw;
    top: 1.3vh;
    width: 1.4vh;
    height: 1.4vh;
}

.name {
    position: absolute;
    top: 1vh;
    left: 3.4vw;
    color: #C6BDBD;
    font: 1.8vh NovaFlat;
}
</style>
