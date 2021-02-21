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

@Options({
  data() {
      return {
          chatUsers: [{id:2, nick:"Bacha", status:"online"},
                      {id:42, nick:"Jaca",status:"online"},
                      {id:56, nick:"Daro", status:"brb"},
                      {id:442, nick:"Sjergiej", status:"offline"},
                      {id:75, nick:"Gocha", status:"offline"}],
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
          this.search = newSearch;
      }
  }
})
export default class Main extends Vue {}
</script>
