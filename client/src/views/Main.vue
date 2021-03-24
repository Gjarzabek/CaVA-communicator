<template>
    <div>
        <UserInfo
        :userCredits="{id: userCredits.id, name: userCredits.name}"
        v-bind:user="user"
        @statusChange="changeUserStatus"
        @descChange="changeUserDesc"
        @iconChange="changeUserIcon"
        />
        <TopPanel
        :notifications="reversedNotifications"
        @checkedAlerts="markAlertsOld"
        @addFriend="inviteFriend"
        @acceptFriend="acceptFriend"
        @rejectFriend="rejectFriend"
        @deleteAlert="deleteAlert"
        />
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
    this.connection.close("appClosed", this.userCredits.id);
  },
  data() {
      return {
            chatUsers: [].sort(statusOrder),
            user: {id:"", name:"", status:"", desc:"", icon:"", joinTime: ""},
            search: "",
            friends: [],
            openedChats: [],
            chats: [],
            chatSelect: false,
            userSelected: undefined,
            activeChatId: undefined,
            UserMenu: {
                show: false,
                user: undefined
            },
            notifications: [],
            privateGroups: [],
            publicRooms: [],
            connection: undefined,
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
    reversedNotifications: function(): any {
        if (!this.notifications || this.notifications.length <= 0) return [];
        return this.notifications.reverse();
    }
  },
  methods: {
        deleteAlert(alertId: string) {
            this.connection.send({method:'deleteAlert', userId: this.userCredits.id, alertId:alertId});
            this.notifications = this.notifications.filter((element:any)=>{return element.id != alertId});
        },
        markAlertsOld(alertsIds: any) {
            setTimeout(() => {
                for (const alertId of alertsIds) {
                    for (const p of this.notifications) {
                        if (p.id === alertId)   p.new = false;
                    }
                }
            }, 5000);
            this.connection.send({
                method: 'markAlertsOld',
                who: this.userCredits.id,
                alerts: alertsIds
            })
        },
        acceptFriend(info: any) {
            if (info === undefined) return;

            this.deleteAlert(info.alertId);

            this.connection.send({
                method: 'acceptFriend',
                who: this.userCredits.id,
                fromId: info.fromId
            });
        },
        rejectFriend(info: any) {
            if (info === undefined) return;
            this.deleteAlert(info.alertId);
        },
        inviteFriend(friendId: string) {
            if (friendId === this.userCredits.id) return;

            this.connection.send({
                method: 'friendInvite',
                fromName: this.user.name,
                fromId: this.userCredits.id,
                toId: friendId
            });
        },
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

        },
        userSetup(userPayload: any) {
            console.log(userPayload);
            this.user.desc = userPayload.desc;
            this.friends = userPayload.friends;
            this.privateGroups = userPayload.groups;
            this.chats = userPayload.chats;
            this.notifications = userPayload.notifications;
            this.user.icon = userPayload.icon;
            this.user.joinTime = userPayload.joinTime;
            this.user.name = userPayload.name;
            this.user.status = userPayload.status;
        }
  },
  created: function() {
        this.connection = new WsHandler(this.userCredits, {
                setupUser: this.userSetup,
                newAlert: (Alert: any) => {this.notifications.push(Alert); this.newAlert=true;}
            }
        );
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