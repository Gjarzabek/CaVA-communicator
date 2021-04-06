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
        @openChat="openChatReq"
        @userClick="userClickHandler"
        @joinPublic="joinPublicRoom"
        @openPrivateTalk="openPrivateTalk"
        />
        <FriendMenu v-if="FriendMenuPayload.show" :position="FriendMenuPayload.position" :friend="FriendMenuPayload.user" @noteChange="updateNote"/>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import UserInfo from '@/components/UserInfo.vue';
import UsersOnline from "@/components/RightBar/UsersOnline.vue";
import TopPanel from "@/components/TopPanel/Panel.vue";
import FriendsNRooms from "@/components/LeftPanel/MainDiv.vue";
import FriendMenu from "@/components/LeftPanel/FriendMenu.vue";
import ChatSection from "@/components/ChatWindow/ChatSection.vue";

import {getStatusPoint} from "@/ts_classes/User";
import WsHandler from "@/ts_classes/WsClient";

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
    this.connection.send({
        method: 'notesChange',
        id: this.userCredits.id,
        newNotes: Array.from(this.newNotes.entries()),
    });
    this.connection.close("appClosed", this.userCredits.id);
  },
  data() {
      return {
            chatUsers: [].sort(statusOrder),
            newChatRequest: undefined,
            user: {id:"", name:"", status:"", desc:"", icon:"", joinTime: ""},
            search: "",
            friends: [],
            openedChats: [],
            chats: [],
            chatSelect: false,
            userSelected: undefined,
            activeChatId: undefined,
            FriendMenuPayload: {
                show: false,
                user: undefined,
                position: undefined
            },
            notifications: [],
            privateGroups: [],
            publicRooms: [],
            connection: undefined,
            newNotes: new Map()
      }
  },
  components: {
    UsersOnline,
    TopPanel,
    FriendsNRooms,
    ChatSection,
    FriendMenu,
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
    },
    reversedNotifications: function(): any {
        if (!this.notifications || this.notifications.length <= 0) return [];
        return this.notifications.reverse();
    }
  },
  methods: {
        updateNote(note: string) {
            for (const friend of this.friends) {
                if (friend._id === this.FriendMenuPayload.user._id) {
                    friend.note = note;
                }
            }
            this.newNotes.set(this.FriendMenuPayload.user._id, note);
            console.log(this.newNotes);
        },
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
            if (this.user.status != newStatus)
                this.connection.send({
                    method: 'userChange',
                    id: this.userCredits.id,
                    status: newStatus
                });
            this.user.status = newStatus;
        },
        changeUserDesc(newDesc: string): void {
            if (this.user.desc != newDesc)
                this.connection.send({
                    method: 'userChange',
                    id: this.userCredits.id,
                    desc: newDesc
                });
            this.user.desc = newDesc;
        },
        changeUserIcon(newIconName: string): void {
            if (this.user.icon != newIconName)
                this.connection.send({
                    method: 'userChange',
                    id: this.userCredits.id,
                    icon: newIconName
                });
            this.user.icon = newIconName;
        },
        sendMessage(message: string): void {
            //websocket message send
            console.log(message);
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
            if (this.FriendMenuPayload.show && this.FriendMenuPayload.user && this.FriendMenuPayload.user._id === event[1]._id) {
                this.FriendMenuPayload.show = false;
            }
            else if (this.FriendMenuPayload.show) {
                this.FriendMenuPayload.position = event[0].y;
                this.FriendMenuPayload.user = event[1];
            }
            else {
                console.log("userClick:", event);
                this.FriendMenuPayload.user = event[1];
                this.FriendMenuPayload.show = true; 
                this.FriendMenuPayload.position = event[0].y;
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
            // callbacks for Ws events
                setupUser: this.userSetup,
                newAlert: (Alert: any) => {this.notifications.push(Alert); this.newAlert=true;},
                newFriend: (FriendData: any) => {
                    this.friends.push(FriendData);
                    console.log("FriendData:", FriendData);
                    console.log("this.friends:", this.friends);
                },
                friendStatusUpdate: (friendInfo: any) => {
                    console.log("freindStatusUpdate:", friendInfo);
                    this.friends = this.friends.map((el: any) => {
                        if (el._id === friendInfo.id) {
                            el.status = friendInfo.status;    
                        }
                        return el;
                    });
                    console.log("after change:", this.friends);
                },
                friendInfoUpdate: (friendInfo: any) => {
                    this.friends = this.friends.map((el: any) => {
                        if (el._id === friendInfo.id) {
                            if (friendInfo.status) el.status = friendInfo.status;    
                            if (friendInfo.desc) el.desc = friendInfo.desc;    
                            if (friendInfo.icon) el.icon = friendInfo.icon;    
                        }
                        return el;
                    });
                }
            }
        );
  }
})
export default class Main extends Vue {}
</script>

<style scoped>

</style>