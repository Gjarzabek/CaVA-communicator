<template>
    <div class="notification" :class="{new: data.new === true}">
        <div class="alertInfo" :data-tool-tip="data.fromId">{{data.info}}</div>
        <div class="exitBtn" @click="$emit('deleteAlert')">X</div>
        <div v-if="()=>{data.topic === 'Zaprosznie do znajomych'}">
            <div class="btns">
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
            this.$emit('acceptFriend', {fromId: this.data.fromId, alertId: this.data.id});
        },
        reject(): void {
            this.$emit('rejectFriend', {fromId: this.data.fromId, alertId: this.data.id});
        }
  }
})
</script>

<style scoped>
.btns {
    position: relative;
    height: 3vh;
}

.exitBtn {
    position: absolute;
    top: 0.5vh;
    right: 0.5vh;
    height: 1.5vh;
    width: 1.5vh;
    display: none;
}

.alertInfo {
    margin: 0;
    padding: 1vh;
}

/*
.alertInfo::after {
    margin: 0;
    padding: 0;
    content: '';
    color: rgb(255, 255, 255);
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
*/
button {
    position:absolute;
    height: 3vh;
    outline: none;
    margin-right: 0.2vw;
    border-radius: 0.4vh;
    font-family: Sen;
    font-size: 1vh;
}

.accept {
    background-color: lightgreen;
    bottom: 0.2vh;
    right: 4vw;
}

.reject {
    background-color: lightcoral;
    bottom: 0.2vh;
    right: 1vw;
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

.notification:hover .exitBtn {
    display: block;
}

.new {
    color: black;
    background-color: rgb(177, 177, 177);
}

.new:hover {
    background-color: rgb(233, 233, 233);
}

</style>