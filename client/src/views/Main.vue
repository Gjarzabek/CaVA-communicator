<template>
    <div>
        <UserInfo v-bind:user="user" @statusChange="changeUserStatus"/>
        <TopPanel v-bind:chats="chatHistory"/>
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch"/>
        <ChatSection v-bind:openedChats="openedChats" @sendMessage="sendMessage"/>
        <FriendsNRooms :friends="sortedFriends" :chats="chats" @newChat="newChatRequest"/>
        <div v-if="chatSelect">
            <ChatSelect/>
        </div>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import UserInfo from '@/components/UserInfo.vue';
import UsersOnline from "@/components/RightBar/UsersOnline.vue";
import TopPanel from "@/components/TopPanel/Panel.vue";
import FriendsNRooms from "@/components/LeftPanel/MainDiv.vue";
import ChatSection from "@/components/ChatWindow/ChatSection.vue";
import ChatSelect from "@/components/ChatSelect.vue";
import {getStatusPoint} from "@/DataTypes/User.ts";

const statusOrder = (a: any, b: any) => {
    if (a === undefined)
        return 1;
    if (b === undefined)
        return -1;
    if (getStatusPoint(a.status) > getStatusPoint(b.status))
        return 1;
    else
        return -1;
};

@Options({
  data() {
      return {
            chatUsers: [].sort(statusOrder),
            search: "",
            user: {id:1, name:"Grzesiek", status:"dostępny", desc:"Slawa Bracia!"},
            friends: [
                {id:2, name:"Bacha", status:"dostępny", desc:"Slawa Bracia!"},
                {id:56, name:"Daro", status:"zaraz-wracam", desc:"Slawa Bracia!"},
                {id:442, name:"Sjergiej", status:"niedostępny", desc:"Status.."},
                {id:42, name:"Jaca",status:"dostępny", desc:"Slawa Bracia!"},
                {id:75, name:"Gocha", status:"zajęty", desc:"Status.."}
            ],
            chatHistory: [
                {id:2, receiver: "Sjergiej", chatType: "SzyfrowanyHasłem", payload:[{who:"ty",timestamp:0.2, data:"hi"}, {who:"oni", timestamp:1, data:"okoFoko"}]},
                {id:4, receiver: "Gocha", chatType: "Zwykły", payload:[{who:"ty",timestamp:1, data:"czesc"}, {who:"oni", timestamp:3, data:"hej"}]},
            ],
            openedChats: [
                /*{id:4, receiver: "Gocha", chatType: "Zwykły", payload:[{who:"ty",timestamp:1, data:"czesc"}, {who:"oni", timestamp:3, data:"hej"}]},
                {id:2, receiver: "Sjergiej", chatType: "SzyfrowanyHasłem", payload:[{who:"ty",timestamp:0.2, data:"hi"}, {who:"oni", timestamp:1, data:"okoFoko"}]}*/
            ],
            chats: [
                {id:2, receiver: "Sjergiej", chatType: "SzyfrowanyHasłem", payload:[{who:"ty",timestamp:0.2, data:"hi"}, {who:"oni", timestamp:1, data:"okoFoko"}]},
                {id:4, receiver: "Gocha", chatType: "Szyfrowany", payload:[{who:"ty",timestamp:1432, data:"Co tam mordzia"}, {who:"oni", timestamp:334, data:"lalalal"}]},
                {id:4, receiver: "Gocha", chatType: "Zwykły", payload:[{who:"ty",timestamp:1, data:"czesc"}, {who:"oni", timestamp:3, data:"hej"}]}
            ],
            chatSelect: false,
            userSelected: undefined
      }
  },
  components: {
    UsersOnline,
    TopPanel,
    FriendsNRooms,
    ChatSection,
    ChatSelect,
    UserInfo
  },
  computed: {
    filteredUsers: function(): any {
        return this.chatUsers.filter((user: any) => {
            return user.name.match(this.search);
        });
    },
    sortedFriends: function(): any {
        return this.friends.sort(statusOrder);
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
          //websocket message send
          console.log(message);
      },
      newChatRequest(user: any): void {
          this.chatSelect = true;
          this.userSelected = user;
          console.log('UserSelected', this.userSelected);
      }
  }
})
export default class Main extends Vue {}
</script>
