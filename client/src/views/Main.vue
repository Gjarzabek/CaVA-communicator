<template>
    <div>
        <TopPanel v-bind:user="user" v-bind:chats="chatHistory" @statusChange="changeUserStatus"/>
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch"/>
        <ChatSection v-bind:openedChats="openedChats" @sendMessage="sendMessage"/>
        <FriendsNRooms />
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import UsersOnline from "@/components/RightBar/UsersOnline.vue";
import TopPanel from "@/components/TopPanel/Panel.vue";
import FriendsNRooms from "@/components/LeftPanel/MainDiv.vue";
import ChatSection from "@/components/ChatWindow/ChatSection.vue";
import {getStatusPoint} from "@/DataTypes/User.ts";

@Options({
  data() {
      return {
          chatUsers: [{id:1, name:"Grzesiek", status:"dostępny", desc:"Slawa Bracia!"},
                      {id:2, name:"Bacha", status:"dostępny", desc:"Slawa Bracia!"},
                      {id:56, name:"Daro", status:"zaraz-wracam", desc:"Slawa Bracia!"},
                      {id:442, name:"Sjergiej", status:"niedostępny", desc:"Status.."},
                      {id:42, name:"Jaca",status:"dostępny", desc:"Slawa Bracia!"},
                      {id:75, name:"Gocha", status:"zajęty", desc:"Status.."}].sort((a: any, b: any) => {
                if (a === undefined)
                    return 1;
                if (b === undefined)
                    return -1;
                if (getStatusPoint(a.status) > getStatusPoint(b.status))
                    return 1;
                else
                    return -1;
          }),
          search: "",
          user: {id:1, name:"Grzesiek", status:"dostępny", desc:"Slawa Bracia!"},
          chatHistory: [
              {id:2, receiver: "Sjergiej", chatType: "SzyfrowanyHasłem", payload:[{who:"ty",timestamp:0.2, data:"hi"}, {who:"oni", timestamp:1, data:"okoFoko"}]},
              {id:4, receiver: "Gocha", chatType: "Zwykły", payload:[{who:"ty",timestamp:1, data:"czesc"}, {who:"oni", timestamp:3, data:"hej"}]},
          ],
          openedChats: [{id:4, receiver: "Gocha", chatType: "Zwykły", payload:[{who:"ty",timestamp:1, data:"czesc"}, {who:"oni", timestamp:3, data:"hej"}]},
                        {id:2, receiver: "Sjergiej", chatType: "SzyfrowanyHasłem", payload:[{who:"ty",timestamp:0.2, data:"hi"}, {who:"oni", timestamp:1, data:"okoFoko"}]}]
      }
  },
  components: {
    UsersOnline,
    TopPanel,
    FriendsNRooms,
    ChatSection
  },
  computed: {
      filteredUsers: function(): any {
          return this.chatUsers.filter((user: any) => {
              return user.name.match(this.search);
          });
      }
  },
  methods: {
      changeSearch(newSearch: string) {
          this.chatUsers.sort((a: any, b: any) => {
                if (getStatusPoint(a.status) > getStatusPoint(b.status))
                    return 1;
                else
                    return -1;
          });
          this.search = newSearch;
      },
      changeUserStatus(newStatus: string): void {
          this.user.status = newStatus;
      },
      sendMessage(message: string): void {
          //websocket messagesend
          console.log(message);
      }
  }
})
export default class Main extends Vue {}
</script>
