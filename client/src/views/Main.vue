<template>
    <div>
        <TopPanel v-bind:user="chatUsers[0]"/>
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
          chatUsers: [{id:1, name:"Grzesiek", status:"online", desc:"Slawa Bracia!"},
                      {id:2, name:"Bacha", status:"online", desc:"Slawa Bracia!"},
                      {id:56, name:"Daro", status:"brb", desc:"Slawa Bracia!"},
                      {id:442, name:"Sjergiej", status:"offline", desc:"Status.."},
                      {id:42, name:"Jaca",status:"online", desc:"Slawa Bracia!"},
                      {id:75, name:"Gocha", status:"offline", desc:"Status.."}].sort((a: any, b: any) => {
                if (a === undefined)
                    return 1;
                if (b === undefined)
                    return -1;
                if (getStatusPoint(a.status) > getStatusPoint(b.status))
                    return 1;
                else
                    return -1;
          }),
          search: ""
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
      }
  }
})
export default class Main extends Vue {}
</script>
