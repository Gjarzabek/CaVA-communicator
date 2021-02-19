<template>
    <div>
        <ChatsSection v-bind:activeChats="activeChats"/>
        <UsersOnline v-bind:Users="filteredUsers" @search="changeSearch" @openChat="openNewChat"/>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";
import UsersOnline from "@/components/UsersOnline.vue";
import ChatsSection from "@/components/ChatsSection.vue";

@Options({
  data() {
      return {
          users: [{id:2, nick:"Bacha"}, {id:42, nick:"Jaca"}, {id:442, nick:"Sjergiej"}, {id:56, nick:"Daro"}, {id:75, nick:"Gocha"}],
          activeChats: [{id:0, nick:"room"}],
          search: ""
      }
  },
  components: {
    UsersOnline,
    ChatsSection
  },
  computed: {
      filteredUsers: function(): any {
          return this.users.filter((user: any) => {
              return user.nick.match(this.search);
          });
      }
  },
  methods: {
      changeSearch(newSearch: string) {
          this.search = newSearch;
      },
      openNewChat(user: any) {
          if (this.activeChats.find((el: any, index: number, arr: any) => {return el.id === user.id}) === undefined) {
              this.activeChats.push(user);
          }
      }
  }
})
export default class Main extends Vue {}
</script>
