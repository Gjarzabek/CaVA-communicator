<template>
    <div class="room">
        <img src='../../assets/publicroom.png' alt="..." class="infoIcon">
        <div class='name'>
            {{room.name}}
        </div>
        <div class="capacity">
            {{room.currentPpl}}/{{room.capacity}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ["room"],
  components: {}
})
</script>

<style scoped>

.capacity {
    position: absolute;
    right: 1vh;
    font: 1.3vh NovaFlat;
    height: 100%;
    line-height: 4vh;
    color: rgb(165, 165, 165);
}

.infoIcon {
    position: absolute;
    top: 0.7vh;
    left: 1.5vw;
    width: 2.6vh;
}

.name {
    position: absolute;
    top: 1vh;
    left: 3.4vw;
    color: #C6BDBD;
    font: 1.8vh NovaFlat;
}

.room {
    position: relative;
    height: 4vh;
    border-radius: 8px;
}

</style>
