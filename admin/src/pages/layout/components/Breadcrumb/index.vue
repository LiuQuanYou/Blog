<template>
    <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in Breadcrumb" :key="index" href="">
            <a v-if="item.children">{{ item.title }}</a>
            <span v-else>{{ item.title }}</span>
            <template v-if="item.children" #overlay>
                <a-menu>
                    <a-menu-item v-for="(child, k) in item.children" :key="k">
                        <router-link :to="`${child.path}`">
                            {{ child.title }}
                        </router-link>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-breadcrumb-item>
    </a-breadcrumb>
    <br />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { useStore } from '@/store/index'

const IndexStore = useStore()

interface Route {
    path: string;
    breadcrumbName: string;
    children?: Array<{
        path: string;
        breadcrumbName: string;
    }>;
}

const Breadcrumb = computed(() => {
    return IndexStore.Breadcrumb
})
</script>

<style lang="scss" scoped>
.custom-breadcrumb {
    font-size: 16px;
}

.b-icon {
    position: relative;
    top: 2px;
}
</style>