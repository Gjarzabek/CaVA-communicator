<template>
    <div id="activeChat">
        <div id='messageList'>
            <div v-for="messData in messages" v-bind:key="messData.id">
                <Message v-bind:Message="messData"/>
            </div>
        </div>
        <input type="text" class="messageInput" placeholder="message:">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Message from "@/components/Message.vue";

export default defineComponent({
  props: ["chatData"],
  components: {Message},
  data() {
      return {
          messages: [{id:2, data:"mess"}, {id:5, data:"gew"}, {id:3, data:"nvc"}, {id:1, data:"trt"}]
      }
  }
})
</script>

<style scoped>

#activeChat {
    position: absolute;
    top: 8%;
    left: 11%;
    width: 73%;
    height: 92.5%;
}


#messageList {
    height: 95%;
    overflow-y: auto;
}

.messageInput {
    position: absolute;
    left: 2%;
    width: 40%;
    height: 3%;
    font-size: 1vw;
    transition: 0.3s;
    outline: none;
    border-radius: 10px;
    outline: none;
    border: none;
}

.messageInput:focus {
    width: 90%;
    box-shadow: 0 0 0.6em #3D5D6E;
}

</style>