<template>
    <div>
        <UserInfo v-bind:user="user" @statusChange="changeUserStatus" @descChange="changeUserDesc" @iconChange="changeUserIcon"/>
        <TopPanel :notifications="notifications"/>
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch"/>
        <ChatSection 
        :openedChats="openedChats"
        :activeChatId="activeChatId"
        @sendMessage="sendMessage"
        @changeActiveChat="changeActive"
        @closeBar="closeBar"
        />
        <FriendsNRooms
        :friends="sortedFriends"
        :chats="chats"
        :publicRooms="publicRooms"
        :privateGroups="privateGroups"
        @newChat="newChatRequest"
        @openChat="openChatReq"
        @userClick="userClickHandler"
        @joinPublic="joinPublicRoom"
        @openPrivateTalk="openPrivateTalk"
        />
        <div v-if="chatSelect">
            <ChatSelect @signalClose="chatSelect=false"/>
        </div>
        <div id="userMenu">
            <UserMenu
            :user="UserMenu.user"
            @newChatRequest="newChatRequest"/>
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
import ChatSelect from "@/components/PopUps/ChatSelect.vue";
import UserMenu from "@/components/PopUps/UserMenu.vue";

import {getStatusPoint} from "@/ts_classes/User.ts";
import WsHandler from "@/ts_classes/WsClient.ts";

const statusOrder = (a: any, b: any): number => {
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
  props: ["userCredits"],
  beforeUnmount() {
    this.connection.close("appClosed");
  },
  data() {
      return {
            chatUsers: [].sort(statusOrder),
            user: {id:"", name:"", status:"", desc:"", icon:""},
            search: "",
            friends: [
                {id:'234gsf', name:"Bob", status:"dostępny", desc:"Hejcia"},
                {id:'sdh24g', name:"Daro", status:"zaraz-wracam", desc:"Pozdrawiam!"},
                {id:'15D442', name:"Kacper", status:"niedostępny", desc:"Status.."},
                {id:'g24GSF', name:"Jaca",status:"dostępny", desc:"SiemankoOoo :)"},
                {id:'g09875', name:"Alice", status:"zajęty", desc:"Status.."}
            ],
            openedChats: [],
            chats: [
                {id:'15D442', receiver: "Kacper", chatType: "SzyfrowanyHasłem", payload:[{who:"ty",timestamp:0.2, data:"hi"}, {who:"oni", timestamp:1, data:"no Hej"}]},
                {id:'g09875', receiver: "Alice", chatType: "Szyfrowany", payload:[{who:"ty",timestamp:1432, data:"Co tam ?"}, {who:"oni", timestamp:334, data:"..."}]},
                {id:'g09875', receiver: "Alice", chatType: "Zwykły", payload:[{who:"ty",timestamp:1, data:"czesc"}, {who:"oni", timestamp:3, data:"hej"}]}
            ],
            chatSelect: false,
            userSelected: undefined,
            activeChatId: undefined,
            UserMenu: {
                show: false,
                user: undefined
            },
            notifications: [
                {id:1, info: "Tajna wiadomość", from:"Bob", type:"secretMess"},
                {id:2, info: "Zaproszenie do Unikalnego Chatu", from: "sjergiej", type:"uniqueMess"}
            ],
            privateGroups: [
                {id:1, name:"Spotkania-Szachy", isSecret: false},
                {id:2, name:"Grupa3", isSecret: false},
                {id:3, name:"GrupaZadaniowa", isSecret: true},
            ],
            publicRooms: [
                {id:1, name:"Wiadomości", capacity: 500, currentPpl: 0},
                {id:2, name:"Kupie-Sprzedam", capacity: 500, currentPpl: 0},
                {id:3, name:"JednoczymySię", capacity: 250, currentPpl: 0},
                {id:4, name:"Lokalnie", capacity: 100, currentPpl: 0},
            ],
            connection: undefined
      }
  },
  components: {
    UsersOnline,
    TopPanel,
    FriendsNRooms,
    ChatSection,
    ChatSelect,
    UserInfo,
    UserMenu
  },
  computed: {
    filteredUsers: function(): any {
        return this.chatUsers.filter((user: any) => {
            return user.name.match(this.search);
        });
    },
    sortedFriends: function(): any {
        return this.friends.sort(statusOrder);
    },
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
        changeUserDesc(newDesc: string): void {
            this.user.desc = newDesc;
        },
        changeUserIcon(newIconName: string): void {
            this.user.icon = newIconName;
        },
        sendMessage(message: string): void {
            //websocket message send
            console.log(message);
        },
        newChatRequest(event: any): void {
            this.chatSelect = true;
            this.userSelected = this.UserMenu.user;

            const menuDiv = document.getElementById("userMenu");
            menuDiv!.style.display = "none";
            this.UserMenu.show = false;

            console.log('UserSelected', this.userSelected);
        },
        openChatReq(chatId: number): void {
            const id: number = this.openedChats.find((chat: any)=> chat.id === chatId);
            if (id === undefined) {
                const chat = this.chats.find((chat: any) => chat.id === chatId);
                if (chat === undefined)
                    return;
                this.openedChats.push(chat);
            }
            this.changeActive(chatId);
        },
        changeActive(chatId: number): void {
            this.activeChatId = chatId;
        },
        closeBar(chatId: any): void {
            this.openedChats = this.openedChats.filter((el:any) => {
                return el.id !== chatId;
            });
            if (chatId === this.activeChatId) {
                if (this.openedChats.length === 0) {
                    this.activeChatId = undefined;
                }
                else {
                    this.activeChatId = this.openedChats[0].id;
                }
            }
        },
        addChatBar(): void {
            return; // TODO refactor - add public/private rooms conversations to openChats
        },
        userClickHandler(event: any): void {
            const eventData = event[0];
            const userData = event[1];
            const menuDiv = document.getElementById("userMenu");
            if (!this.UserMenu.show ) {
                menuDiv!.style.display = "table";
                menuDiv!.style.top = `${eventData.y}px`;
                this.UserMenu.show = true;
                this.UserMenu.user = userData;
            }
            else if (userData.id === this.UserMenu.user.id ){
                menuDiv!.style.display = "none";
                this.UserMenu.show = false;
            }
            else {
                this.UserMenu.user = userData;
                menuDiv!.style.top = `${eventData.y}px`;
            }
        },
        joinPublicRoom(room: any): void {
            console.log("Join public room:", room.name);
        },
        openPrivateTalk(room: any): void {
            if (room.isSecret === true) {
                console.log("Secret group:", room.name);
                // TODO - input password to encrypt and then open chat window
                return;
            }
            else {
                // TODO - open chat window
                console.log("Common group:", room.name);
                return;
            }

        }
  },
  created: function() {
      this.connection = new WsHandler(this.userCredits);
  }
})
export default class Main extends Vue {}
</script>

<style scoped>

#userMenu {
  display: none;
  position:absolute;
  left: 12vw;
  width: 10vw;
}

</style>