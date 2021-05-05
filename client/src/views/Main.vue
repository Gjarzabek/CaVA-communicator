<template>
    <div>
        <UserInfo
        :userCredits="{id: userCredits.id, name: userCredits.name}"
        v-bind:user="user"
        @statusChange="changeUserStatus"
        @descChange="changeUserDesc"
        @iconChange="changeUserIcon"
        @colorChange="changeUserColor"
        />
        <TopPanel
        :notifications="sortedNotifications"
        :friends="friends"
        @checkedAlerts="markAlertsOld"
        @addFriend="inviteFriend"
        @acceptFriend="acceptFriend"
        @rejectFriend="rejectFriend"
        @deleteAlert="deleteAlert"
        @openChat="openExistingChat"
        />
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch"/>
        <ChatSection 
        :openedChats="openedChats"
        :activeChatId="activeChatId"
        :inChatFriend="userSelected"
        :user="user"
        @sendMessage="sendMessage"
        @changeActiveChat="changeActive"
        @closeBar="closeBar"
        />
        <FriendsNRooms
        :friends="sortedFriends"
        :chats="chats"
        :publicRooms="publicRooms"
        :privateGroups="privateGroups"
        :user="user"
        @userClick="userClickHandler"
        @joinPublic="joinPublicRoom"
        @openPrivateTalk="openPrivateTalk"
        @openChat="openExistingChat"
        />
        <FriendMenu v-if="FriendMenuPayload.show" :isShown="FriendMenuPayload.show" :position="FriendMenuPayload.position" :friend="FriendMenuPayload.user" @openChat="openChatWithFriend" @noteChange="updateNote"/>
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
import NodeRSA from "node-rsa";

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
            newChatRequest: undefined,
            user: {id:"", name:"", status:"", desc:"", icon:"", joinTime: "", publicKey: ""},
            search: "",
            friends: [],
            openedChatsIds: [],
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
            newNotes: new Map(),
            secretReader: new NodeRSA()
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
    },
    openedChats: function(): any {
        const resultList = [];
        for (const chat of this.chats) {
            for (const openedId of this.openedChatsIds) {
                if (chat._id === openedId) {
                    resultList.push(chat);
                }
            }
        }
        return resultList;
    },
    sortedNotifications: function(): any {
        return this.notifications.sort((a: any, b: any) => {
                    if (a.timestamp < b.timestamp)
                        return 1;
                    else
                        return -1;
        });
    }
  },
  methods: {
        addChatMessage(chatId: any, message: any) {
            const chat = this.chats.find((chat: any) => {return chat._id === chatId});
            chat.messages.push(message);
            setTimeout( ()=>{
                const objDiv: any = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
            }, 30);
        },
        addTempMessage(messInfo: any): number | null {
            const chat = this.chats.find((chat: any) => {return chat._id === messInfo.chatId});
            if (!chat) {
                console.error("WRONG messInfo", messInfo);
                return null;
            }
            if (chat.inProccessMessages ===  undefined) {
                messInfo.id = 0;
                chat.inProccessMessages = [messInfo];
                this.addChatMessage(messInfo.chatId, messInfo);
                return 0;
            }
            else {
                chat.inProccessMessages.push(messInfo);
                const id = -1 * (chat.inProccessMessages.length - 1);
                messInfo.id = id;
                this.addChatMessage(messInfo.chatId, messInfo);
                return id;
            }
        },
        openChatWithFriend(event: any) {
            this.userSelected = event;
            this.hideFriendMenu();
            const friendId: string = event.id ? event.id : event._id;
            for(const chatObj of this.chats) {
                if (chatObj.users[0] === friendId || chatObj.users[1] === friendId) {
                    this.openExistingChat(chatObj._id);
                    return;
                }
            }
            console.log("event", event);
            this.createNewChat(friendId);
        },
        hideFriendMenu(): void {
            this.FriendMenuPayload.show = false;
            if (this.newNotes.size > 0) {
                this.connection.send({
                    method: 'notesChange',
                    id: this.userCredits.id,
                    newNotes: Array.from(this.newNotes.entries()),
                });
                this.newNotes.clear();
            }
        },
        createNewChat(fId: string): void {
            this.connection.send({
                method: 'friendChatCreate',
                userId: this.userCredits.id,
                friendId: fId,
            });
            return;
        },
        decryptMessage(mess: string): string {
            return this.secretReader.decrypt(mess, 'utf8');
        },
        encryptMessage(mess: string, key: string): string {
            const encryptor = new NodeRSA();
            encryptor.importKey(key, 'public');
            return encryptor.encrypt(mess, 'base64');
        },
        updateNote(note: string) {
            for (const friend of this.friends) {
                if (friend._id === this.FriendMenuPayload.user._id) {
                    if (friend.note === note) return;
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
        changeUserColor(newColorHex: string): void {
            if (!newColorHex || this.user.color === newColorHex) return;
            this.connection.send({
                method: 'userChange',
                id: this.userCredits.id,
                color: newColorHex
            });
            this.user.color = newColorHex; 
        },
        sendMessage(messInfo: any): void {
            console.log('sendMessage');
            const rsaCrypto = new NodeRSA();
            rsaCrypto.importKey(this.user.publicKey, 'public');
            messInfo.id = this.addTempMessage(messInfo);
            if (messInfo.id === null) return;
            console.log(messInfo);
            this.connection.send({
                method: 'message',
                userId: this.userCredits.id,
                chatId: messInfo.chatId,
                friendData: messInfo.friendData,
                authorData: rsaCrypto.encrypt(messInfo.content, 'base64'),
                timestamp: messInfo.timestamp,
                tempMessageId: messInfo.id 
            });
        },
        openExistingChat(chatId: number): void {
            const id: number = this.openedChatsIds.find((id: any)=> {return id === chatId});
            const chat = this.chats.find((chat: any) => {return chat._id === chatId});
            if (chat === undefined)
                return;
            this.changeActive(chat);
            if (id === undefined) {
                this.openedChatsIds.push(chatId);
            }
        },
        changeActive(chat: any): void {
            if (!chat) {
                return;
            }
            this.activeChatId = chat._id;
            const friendId = chat.users[0] === this.user.id ? chat.users[1] : chat.users[0];
            this.userSelected = this.friends.find((friend: any) => {return friend._id === friendId});
            if (!this.userSelected) this.userSelected = this.friends.find((friend: any) => {return friend.id === friendId});
            setTimeout( ()=>{
                const objDiv: any = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
            }, 300);
        },
        closeBar(chatId: any): void {
            this.openedChatsIds = this.openedChatsIds.filter((el:any) => {
                return el !== chatId;
            });
            if (chatId === this.activeChatId) {
                if (this.openedChatsIds.length === 0) {
                    this.activeChatId = undefined;
                }
                else {
                    this.activeChatId = this.openedChatsIds[0];
                }
            }
        },
        addChatBar(): void {
            return; // TODO refactor - add public/private rooms conversations to openChats
        },
        userClickHandler(event: any): void {
            if (this.FriendMenuPayload.show && this.FriendMenuPayload.user && this.FriendMenuPayload.user._id === event[1]._id) {
                this.hideFriendMenu();
            }
            else if (this.FriendMenuPayload.show) {
                this.hideFriendMenu();
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
            this.user.desc = userPayload.desc;
            this.friends = userPayload.friends;
            this.privateGroups = userPayload.groups;
            this.chats = userPayload.chats;
            this.notifications = userPayload.notifications;
            this.user.icon = userPayload.icon;
            this.user.joinTime = userPayload.joinTime;
            this.user.color = userPayload.color;
            this.user.name = userPayload.name;
            this.user.status = userPayload.status;
            this.user.publicKey = userPayload.public;
            this.user.id = this.userCredits.id;
            this.readMessages();
        },
        async readMessages(): Promise<void> {
            for (const chat of this.chats) {
                for (const message of chat.messages) {
                    message.content = this.secretReader.decrypt(message.content, 'utf8');
                }
            }
        }
  },
  created: function() {
        this.secretReader.importKey(this.userCredits.secret, 'private');
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
                        if (el._id === friendInfo.id || el.id === friendInfo.id) {
                            el.status = friendInfo.status;    
                        }
                        return el;
                    });
                },
                friendInfoUpdate: (friendInfo: any) => {
                    this.friends = this.friends.map((el: any) => {
                        if (el._id === friendInfo.id || el.id === friendInfo.id) {
                            if (friendInfo.status) el.status = friendInfo.status;    
                            if (friendInfo.desc) el.desc = friendInfo.desc;    
                            if (friendInfo.icon) el.icon = friendInfo.icon;
                            if (friendInfo.color) el.color = friendInfo.color;
                        }
                        return el;
                    });
                },
                newChat: (chatDoc: any) => {
                    console.log('new chat Doc body', chatDoc);
                    for (const chat of this.chats) {
                        if (chat._id === chatDoc._id)
                            return;
                    }

                    this.chats.push(chatDoc);
                    this.openExistingChat(chatDoc._id);
                },
                messageConfirm: (payload: any) => {
                    const chat = this.chats.find((chat: any) => {return chat._id === payload.chatId});     
                    chat.inProccessMessages = chat.inProccessMessages.filter((element:any)=>{return element.id != payload.tempId});
                    for (const message of chat.messages) {
                        if (message.id === payload.tempId) {
                            message.inProgress = false;
                            message.id = payload.messageId;
                        }
                    }
                    setTimeout( ()=>{
                        const objDiv: any = document.getElementById("messages");
                        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
                    }, 10);
                },
                newMessage: (payload: any) => {
                    this.addChatMessage(payload.chatId, {
                        authorId: payload.friendId,
                        id: payload.msgId,
                        timestamp: payload.timestamp,
                        content: this.secretReader.decrypt(payload.friendData, 'utf8')
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