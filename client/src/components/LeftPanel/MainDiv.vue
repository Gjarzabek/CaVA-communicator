<template>
    <div id="main">
        <div v-for="params in ListParams" v-bind:key="params.header">
          <HiddenList
          :header="params.header"
          :ItemList="params.payload"
          :type="params.type"
          @newChat="ForwardNewChat"
          @openChat="ForwardChatOpen"
          @userClicked="userClickHandler"
          />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HiddenList from "@/components/LeftPanel/HiddenList.vue";

export default defineComponent({
  props: ["friends", "chats"],
  components: {HiddenList},
  data() {
      return {
          ListParams: [
            {header: "Rozmowy", type:"chat", payload: this.chats},
            {header: "Znajomi", type:"friend", payload: this.friends},
            {header: "Prywatne Grupy", type: "privateRoom", payload: [{name:"Klub Szachowy", id:1}, {name:"Fight Club", id:2}]},
            {header: "Publiczne Dyskusje", type: "publicTalk", payload: [{name:"Białobrzegi", id:1}, {name:"KupieSprzedam", id:2}]}
          ]
      }
  },
  methods: {
    userClickHandler(event: any) :void {
      this.$emit('userClick', event);
    },
    ForwardNewChat(event: any): void {
      this.$emit('newChat', event);
    },
    ForwardChatOpen(event: any): void {
      this.$emit('openChat', event);
    },
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