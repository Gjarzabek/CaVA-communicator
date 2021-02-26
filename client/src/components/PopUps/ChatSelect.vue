<template>
    <div class="popUpBg">
        <div class="popUpWindow">
            <h2 id="popUpHeader">Wybierz Rodzaj Chatu</h2>
            <ul class="typesList">
                <li class="chatType">
                    <div>Szyfrowany Hasłem</div>
                </li>
                <li class="chatType">
                    <div>Szyfrowany</div>
                </li>
                <li class="chatType">
                    <div>Zwykły</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  props: [],
  components: {},
})
</script>

<style scoped>

.popUpBg {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(53, 53, 53, 0.534);
}

.popUpWindow {
    position: absolute;
    left: 25%;
    top: 15%;
    height: 50%;
    width: 50%;
    background-color: #4b4949;
    text-align: left;
    border-radius: 8px;
}

#popUpHeader {
    color: #CACECE;
    text-indent: 3vh;
    font: 3vh NovaScript;
    margin-top: 2vh;
    margin-bottom: 1vh;
    border-left: chocolate 5px solid;
}

.chatType {
    position: relative;
    text-align: center;
    border: wheat dashed 1px;
    display: inline-block;
    margin-left: 15px;
    width: 10vw;
    height: 3vh;
    background-color: #EBEBEB;
    border-radius: 5px;
    padding-top: 0.7vh;
    font: 0.9vw NovaSquare;
    color:  black;
}

.typesList {
    float:left;
}

</style>