<template>
    <div>
        <TopPanel />
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
          chatUsers: [{id:2, nick:"Bacha", status:"online"},
                      {id:56, nick:"Daro", status:"brb"},
                      {id:442, nick:"Sjergiej", status:"offline"},
                      {id:42, nick:"Jaca",status:"online"},
                      {id:75, nick:"Gocha", status:"offline"}].sort((a: any, b: any) => {
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
