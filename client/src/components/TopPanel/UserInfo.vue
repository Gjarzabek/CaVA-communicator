<template>
    <div id="user">
        <div id="iconBg">
            <img src="../../assets/fsociety.png" alt=".." id='fsocietyIcon'>
        </div>
        <div id="userInfo">
            <div id="statusDot" :class="user.status"></div>
            <div id="nick">{{user.name}}</div>
            <div id="id">id:{{user.id}}</div>
            <div id="desc">{{user.desc}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ["user"],
  components: {}
})
</script>

<style scoped>

#iconBg {
    position: absolute;
    border-radius: 100%;
    top: 1.24vh;
    left: 5%;
    width: 6.5vh;
    height: 6.5vh;
    background-color: #f9f7f77e;
}

#fsocietyIcon {
    position: absolute;
    left: 10%;
    top: 10%;
    height: 80%;
}

#user {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 15%;
    height: 100%;
    background-color: #8290909d;
    border-right: ridge 3px #242222;
}

#userInfo {
    text-align: left;
    box-sizing: content-box;
    position: absolute;
    top: 10%;
    left: 30%;
    width: 65%;
    height: 80%;
}

#nick {
    font: 130% NovaSquare;
    position: absolute;
    top: 0%;
    left: 9%;
}

#status {   
    border: none;
}

#id {
    position: absolute;
    top: 35%;
    font: 95% Courier;
    color: rgb(47, 46, 46);
}

#desc {
    position: absolute;
    top: 65%;
    font: 95% NovaFlat;
    border: none;
    width: 100%;
}

#statusDot {
    position: absolute;
    left: 0%;
    top: 8%;
    border-radius: 100%;
    width: 1.2vh;
    height: 1.2vh;
}

</style>