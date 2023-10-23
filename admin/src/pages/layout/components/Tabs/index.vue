<template>
    <div class="flex hedaer-tabs-box">
        <div class="header-tabs">
            <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @tabClick="tabClick" @edit="removeTab">
                <a-tab-pane v-for="(pane, index) in panes" :key="index" :tab="pane.title" />
            </a-tabs>
        </div>
        <!--  tabs按钮  -->
        <div class="flex">
            <span class="tabs-btn"><sync-outlined /></span>
            <a-dropdown>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1">
                            <sync-outlined />
                            重新加载
                        </a-menu-item>
                        <a-menu-item key="2">
                            <CloseOutlined />
                            关闭标签页
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3">
                            <ArrowLeftOutlined />
                            关闭左侧标签页
                        </a-menu-item>
                        <a-menu-item key="4">
                            <ArrowRightOutlined />
                            关闭右侧标签页
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="5">
                            <PicCenterOutlined />
                            关闭其他标签页
                        </a-menu-item>
                        <a-menu-item key="6">
                            <MinusOutlined />
                            关闭全部标签页
                        </a-menu-item>
                    </a-menu>
                </template>
                <span class="tabs-btn">
                    <DownOutlined />
                </span>
            </a-dropdown>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { SyncOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/index'
import router from '@/router';

const IndexStore = useStore()
const panes = computed(() => {
    return IndexStore.MenuTabs
})

const activeKey = computed(() => {
    return IndexStore.TabsIndex
})

const tabClick = (e: number) => {
    var row = IndexStore.MenuTabs[e]
    router.push({
        path: row.path
    })
    IndexStore.TabsIndex = e
}

//删除tab-item  --未开发完成
const removeTab = (e: number) => {
    var tabs = IndexStore.MenuTabs;
    if (tabs.length > 1) {
        tabs.splice(e, 1)
        if (IndexStore.TabsIndex - 1) {
            IndexStore.TabsIndex -= 1
            router.push({
                path: tabs[IndexStore.TabsIndex].path
            })
        }
        IndexStore.setMenuTabs(tabs)
    }
}
</script>
  
   
<style scoped lang="scss">
.hedaer-tabs-box {
    padding: 0 10px;
    height: 34px;
    align-items: center;
    margin-top: 5px;

    ::v-deep(.ant-tabs-tab) {
        padding: 4px 8px;
        margin-left: 10px !important;
    }

    ::v-deep(.ant-tabs-nav) {
        margin-bottom: 0;
    }

    ::v-deep(.ant-tabs-nav::before) {
        display: none;
    }

    .header-tabs {
        flex: 1;
    }

    .tabs-btn {
        display: flex;
        height: 32px;
        border: 1px solid #ddd;
        align-items: center;
        width: 32px;
        justify-content: center;
        margin-left: -1px;
        cursor: pointer;
    }
}
</style>