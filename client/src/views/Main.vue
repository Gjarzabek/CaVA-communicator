<template>
    <div>
        <TopPanel v-bind:user="chatUsers[0]"/>
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch"/>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import UsersOnline from "@/components/RightBar/UsersOnline.vue";
import TopPanel from "@/components/TopPanel/Panel.vue";
import {getStatusPoint} from "@/DataTypes/User.ts";

@Options({
  data() {
      return {
          chatUsers: [{id:1, nick:"Grzesiek", status:"online", desc:"Slawa Bracia!"},
                      {id:2, nick:"Bacha", status:"online", desc:"Slawa Bracia!"},
                      {id:56, nick:"Daro", status:"brb", desc:"Slawa Bracia!"},
                      {id:442, nick:"Sjergiej", status:"offline", desc:"Status.."},
                      {id:42, nick:"Jaca",status:"online", desc:"Slawa Bracia!"},
                      {id:75, nick:"Gocha", status:"offline", desc:"Status.."}].sort((a: any, b: any) => {
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
    TopPanel
  },
  computed: {
      filteredUsers: function(): any {
          return this.chatUsers.filter((user: any) => {
              return user.nick.match(this.search);
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
