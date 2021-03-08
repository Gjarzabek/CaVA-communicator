<template>
    <div>
        <h1>ERROR 404 - nieistniejąca strona :)</h1>
    </div>
</template>

<script lang="ts">  
import { Options, Vue } from "vue-class-component";

@Options({
    components: {Navi},
})

export default class Main extends Vue {}
</script>

<style scoped>

</style>