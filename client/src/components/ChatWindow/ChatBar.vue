<template>
    <div @click="signalActive">
        {{chatInfo.receiver}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["chatInfo"],
    components: {},
    methods: {
        signalActive(): void {
            this.$emit('signalActive', this.chatInfo);
        }
    }
})
</script>

<style scoped>

</style>
