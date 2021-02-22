<template>
    <div>
        <TopPanel v-bind:user="user" @statusChange="console.log('koko')"/>
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch"/>
        <FriendsNRooms />
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import UsersOnline from "@/components/RightBar/UsersOnline.vue";
import TopPanel from "@/components/TopPanel/Panel.vue";
import FriendsNRooms from "@/components/LeftPanel/MainDiv.vue";
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
          user: {id:1, name:"Grzesiek", status:"dostępny", desc:"Slawa Bracia!"}
      }
  },
  components: {
    UsersOnline,
    TopPanel,
    FriendsNRooms
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
      changeStatus(newStatus: string): void {
          this.user.status = newStatus;
      }
  }
})
export default class Main extends Vue {}
</script>
