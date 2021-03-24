<template>
    <div id="main">
        <div v-for="params in ListParams" v-bind:key="params.header" class="list">
          <HiddenList
          :header="params.header"
          :ItemList="params.payload"
          :type="params.type"
          @newChat="ForwardNewChat"
          @openChat="ForwardChatOpen"
          @joinPublic="Forwardjoin"
          @userClicked="userClickHandler"
          @openPrivateTalk="ForwardOpenPrivate"
          />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HiddenList from "@/components/LeftPanel/HiddenList.vue";

export default defineComponent({
  props: ["friends", "chats", "publicRooms", "privateGroups"],
  components: {HiddenList},
  computed: {
    ListParams: function(): any { 
        return [
          {header: "Rozmowy", type:"chat", payload: this.chats},
          {header: "Znajomi", type:"friend", payload: this.friends},
          {header: "Prywatne Grupy", type: "privateRoom", payload: this.privateGroups},
          {header: "Publiczne Dyskusje", type: "publicTalk", payload: this.publicRooms}
        ];
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
    Forwardjoin(event: any): void {
      this.$emit('joinPublic', event);
    },
    ForwardOpenPrivate(event: any): void {
      this.$emit('openPrivateTalk', event);
    }
  }
})
</script>

<style scoped>

.list {
  width: 13vw;
}

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