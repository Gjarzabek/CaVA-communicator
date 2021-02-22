<template>
    <div id="topPanel">
      <UserInfo v-bind:user="user"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
import UserInfo from '@/components/TopPanel/UserInfo.vue';

export default defineComponent({
  props: ["user"],
  components: {UserInfo}
})
</script>

<style scoped>


#topPanel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 9%;
    background-color: #96C5CD;
}
</style>