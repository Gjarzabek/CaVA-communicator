<template>
    <div class="notification">
        <div>
            <div class="alertInfo" :data-tool-tip="data.fromId">{{data.info}}</div>
            <div v-if="()=>{data.topic === 'Zaprosznie do znajomych'}">
                <button class="accept" @click="accept">akceptuj</button>
                <button class="reject" @click="reject">odrzuć</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: ["data"],
  components: {},
  methods: {
        accept(): void {
            this.$emit('acceptFriend', this.data.fromId);
        },
        reject(): void {
            this.$emit('rejectFriend', this.data.fromId);
        }
  }
})
</script>

<style scoped>

.alertInfo {
    margin: 0;
    padding: 1vh;
}

.alertInfo::after {
    margin: 0;
    padding: 0;
    content: '';
    color: skyblue;
    transform: scale(1);
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.8s;
    opacity: 0;
}

.alertInfo:hover::after {
    opacity: 1;
    top: 0;
    content: 'id: ' attr(data-tool-tip);
}

button {
    height: 3vh;
    outline: none;
    margin-right: 1vw;
    border-radius: 0.4vh;
    font-family: Sen;
}

button:hover {
    background-color: skyblue;
}

.notification {
    position: relative;
    margin: 1vh;
    padding: 1vh;
    border-radius: 1vh;
    color: white;
    font-family: Sen;
    text-indent: 0vw;
    text-align: left;
}

.notification:hover {
    background-color: rgb(56, 56, 56);
}

</style>