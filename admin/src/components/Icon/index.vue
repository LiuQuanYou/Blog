<template>
    <component :is="Icon" />
</template>

<script lang="ts" setup>
const props = defineProps({
    Icon: {
        default: '',
        type: String,
    },

});
</script>
