<template>
    <div class="MessageBody">
        <img v-if="author.icon === 'fsociety'" class="bgEllipse" src="../../assets/fsociety.png">
        <img v-else-if="author.icon === 'bird'" class="bgEllipse" src="../../assets/freedomBird.png">
        <div v-else class="bgEllipse"></div>
        <div class="userName">{{author.name}}</div>
        <div class="messageData" :class="{inProgress : message.inProgress}">{{message.content}}</div>
        <div class="time">{{getDateString}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["message", "friend", "user"],
    components: {},
    computed: {
        getDateString: function(): string {
            const date = new Date(this.message.timestamp)
            const currentDate = (new Date()).getTime();
            const msDiff = currentDate - this.message.timestamp;
            return `${this.datePrefix(msDiff)} o ${date.toLocaleString().substring(12)}`;
        },
        author: function(): any {
            if (this.message.authorId === this.user.id) return this.user;
            return this.friend;
        }
    },
    methods: {
        datePrefix(msDiff: number): string {
            const daysDiff = msDiff / 1000 / 60 / 60 / 24;
            if (daysDiff < 1)
                return "Dziś";
            if (daysDiff < 2)
                return "Wczoraj";
            if (daysDiff < 3)
                return "PrzedWczoraj";
            return `${Math.floor(daysDiff)} dni temu`;
        }
    }
})
</script>

<style scoped>

.MessageBody {
    position: relative;
    top: 4vh;
    left: 1vh;
    width: 67vw;
    border-top: solid 1px #3b393978;
    border-bottom: solid 1px #3b393978;
    word-wrap: break-word;
    margin-bottom: 1vh;
    padding: 1.5vh;
    transition: 0.5s;
}

.MessageBody:hover {
    border-top: solid 1px #3B3939;
    border-bottom: solid 1px #3B3939;
}

.bgEllipse {
    position: relative;
    width: 5vh;
    height: 5vh;
    left: 2vh;
    background-color: rgba(82, 82, 82, 0.329);
    border-radius: 100%;
    margin: 0;
    padding: 0;
}

.userName {
    text-align: left;
    color: rgb(121, 176, 190);
    position: absolute;
    top: 1vh;
    left: 9.5vh;
    font: 2vh NovaSquare;
}

.messageData {
    font: 2vh NovaFlat;
    color: whitesmoke;
    text-align: left;
    width: 60vw;
    position: relative;
    bottom: 1.4vh;
    left: 8vh;
}

.time {
    font: 1.5vh NovaSquare;
    color: #595757;
    position: absolute;
    top: 1.3vh;
    left: 12vw;
}

.inProgress {
    color: rgb(92, 146, 151);
}

</style>
