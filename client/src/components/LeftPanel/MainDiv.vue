<template>
    <div id="main">
        <div v-for="params in ListParams" v-bind:key="params.header">
          <HiddenList :header="params.header" :ItemList="params.payload" :type="params.type"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HiddenList from "@/components/LeftPanel/HiddenList.vue";

export default defineComponent({
  props: [],
  components: {HiddenList},
  data() {
      return {
          ListParams: [
            {header: "Znajomi", type:"friend", payload: [{id:442, name:"Sjergiej", status:"offline", desc:"Status.."}, {id:42, name:"Jaca",status:"online", desc:"Slawa Bracia!"}]},
            {header: "Prywatne Pokoje", type: "privateRoom", payload: [{name:"Klub Szachowy", id:1}, {name:"Fight Club", id:2}]},
            {header: "Publiczne Dyskusje", type: "publicTalk", payload: [{name:"Białobrzegi", id:1}, {name:"KupieSprzedam", id:2}]}
          ]
      }
  }
})
</script>

<style scoped>

#main {
    position: absolute;
    left: 0%;
    top: 9%;
    width: 15%;
    height: 91%;
    background-color: #3B3939;
    overflow-y: auto;
}

</style>