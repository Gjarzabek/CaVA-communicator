<template>
    <div class="privGroup">
        <img v-if="!group.isSecret" src='../../assets/privateroom.png' alt="..." class="infoIcon">
        <img v-else src='../../assets/encryptedData.png' alt="..." class="infoIcon">
        <div class='name'>
            {{group.name}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ["group"],
  components: {}
})
</script>

<style scoped>

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

.privGroup {
    position: relative;
    height: 4vh;
    border-radius: 8px;
}

</style>
