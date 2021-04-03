<template>
    <div id="topPanel">
      <button v-if="!addFriendActive" id="addFriend" @click="addFriend">Dodaj Znajomego</button>
      <div id="friendAddWindow" :style="{width: `${addDivWidth}vw`, height: `${addDivHeight}vh`}">
        <div v-if="addFriendActive">
          <div class="closeBtn" @click="closeAddDiv"></div>
          <input type="text" class="FriendCodeInput" placeholder="ID Użytkownika" v-model="inputData">
          <button @click="submitFriendCode" class="submitFriend">Dodaj</button>
        </div>
      </div>
      <img src="../../assets/notify.png" alt="..." id="notification" @click=toogleNotifications>
      <div v-if="isAnyNewAlert" class="alertCount"></div>
      <div v-if="showNotifications" class="notificationMain">
        <h2>Powiadomienia</h2>
        <Notification v-for="notify in notifications"
        v-bind:key="notify.id"
        :data="notify"
        @acceptFriend="(event)=>{$emit('acceptFriend', event)}"
        @rejectFriend="(event)=>{$emit('rejectFriend', event)}"
        @deleteAlert="$emit('deleteAlert', notify.id)"
        />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
import Notification from '@/components/TopPanel/Notification.vue';

export default defineComponent({
  props: ["notifications"],
  components: {Notification},
  data() {
    return {
      showNotifications: false,
      addFriendActive: false,
      inputData: "",
      maxIDLength: 6,
      seen: true
    }
  },
  watch: {
    inputData: function(): void {
        if (this.inputData.length > this.maxIDLength) {
            this.inputData = this.inputData.substring(0, this.maxIDLength);
        }
    }
  },
  methods: {
    toogleNotifications() {
      if (!this.showNotifications && this.isAnyNewAlert)
        this.checkNewAlerts();
      this.showNotifications = !this.showNotifications;
    },
    checkNewAlerts(): void {
      const checkedAlerts = [];
      for (const alert of this.notifications) {
        if (alert.new)
          checkedAlerts.push(alert.id);
      }
      if (checkedAlerts.length === 0)
        return;
      this.$emit('checkedAlerts', checkedAlerts);
    },
    addFriend(): void {
      this.addFriendActive = true;
    },
    closeAddDiv(): void {
      this.addFriendActive = false;
      this.inputData = "";
    },
    submitFriendCode(): void {
      if (this.inputData.length === this.maxIDLength) {
        this.$emit('addFriend', this.inputData);
        this.inputData = "Wysłano";
      }
      else {
        this.inputData = "Błąd";
      }
      setTimeout(()=>{this.closeAddDiv();}, 200);
    }
  },
  computed: {
    addDivWidth: function(): number {
      return this.addFriendActive ? 20 : 0;
    },
    addDivHeight: function(): number {
      return this.addFriendActive ? 6 : 0;
    },
    isAnyNewAlert: function(): boolean {
      for (const alert of this.notifications) {
        if (!alert) continue;
        else if (alert.new) return true;
      }
      return false;
    }
  }
})
</script>

<style scoped>

.alertCount {
  position: absolute;
  top: 1.2vh;
  right: 2.2vw;
  width: 0.8vw;
  height: 0.8vw;
  border-radius: 50%;
  background-color: rgb(212, 24, 24);
  color: whitesmoke;
}

.submitFriend {
  position: absolute;
  top: 25%;
  right: 13%;
  width: 15%;
  height: 50%;
  background-color: rgb(77, 77, 77);
  color: #62FFE7;
  font: 1.4vh NovaFlat;
  text-align: center;
  border:none;
  outline: none;
  border-radius: 2vh;
}

.FriendCodeInput {
  outline:none;
  position: absolute;
  top: 10%;
  left: 1vw;
  height: 70%;
  width: 60%;
  border-radius: 1vh;
  border: none;
  font: 2vh NovaFlat;
  text-align: center;
  color: black;
}

.FriendCodeInput::placeholder {
  color: rgba(0, 0, 0, 0.507);
}

.notificationMain {
  position:absolute;
  width: 23vw;
  right: 1vh;
  top: 5vh;
  z-index: 2;
  background-color: #1d1d1d;
  border: 0.1px rgb(236, 236, 236) dotted;
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 2vh;
  text-align: left;
  text-indent: 2vw;
  color: rgb(235, 235, 235);
}

#addFriend {
  text-align: center;
  position: absolute;
  width: 12%;
  height: 44%;
  top: 28%;
  right: 11%;
  box-sizing: border-box;
  background-color: #242222;
  border: none;
  border-radius: 5px;
  color: #EAEAEA;
  font: 1.9vh NovaScript;
  outline: none;
  transform: scale(1);
  cursor: pointer;
  transition: 0.1s;
}

#addFriend:active {
  transform: scale(0.98);
}

#friendAddWindow {
  position: absolute;
  top: 0;
  right: 11%;
  background-color: #dadada;
  z-index: 1;
  transition: 0.4s;
}

#notification {
  transform: scale(1);
  position: absolute;
  right: 3%;
  top: 30%;
  cursor: pointer;
  height: 40%;
}

#notification:active {
  transform: scale(0.9);
}

#topPanel {
    position: absolute;
    top: 0%;
    left: 15%;
    width: 85%;
    height: 6%;
    background-color: #96C5CD;
}

.closeBtn {
  position:absolute;
  right: 1vh;
  top: 0.5vh;
  height: 2vh;
  width: 2vh;
  background-color: rgb(27, 27, 27);
  border-radius: 100%;
  transform: scale(1);
  transition: 20ms;
}

.closeBtn:hover {
  transform: scale(1.1);
}

</style>