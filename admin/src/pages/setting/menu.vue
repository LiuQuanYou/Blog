<template>
    <div>
        <div class="search-result-list">
            <div class="table-title flex space-between">
                <span class="base-table-title">菜单列表</span>
                <div class="base-table-toolbar">
                    <a-button type="primary" @click="addMenu">新增菜单</a-button>
                </div>
            </div>
            <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
                <template #bodyCell="{ column, record }">
                    <!--  状态  -->
                    <template v-if="column.key === 'status'">
                        <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="0" disabled />
                    </template>
                    <!--  图标  -->
                    <template v-if="column.key === 'iconClass'">
                        <component v-if="record.iconClass" :is="record.iconClass" />
                    </template>
                    <!--  操作  -->
                    <template v-else-if="column.dataIndex === 'operation'">
                        <a-button type="primary" shape="circle" :icon="h(EditFilled)" @click="editMenu(record)"
                            style="margin-right: 10px;" />
                        <a-popconfirm title="确定删除?" @confirm="deleteMenu(record.id)" okText="确定" cancelText="取消">
                            <a-button type="primary" danger shape="circle" :icon="h(DeleteFilled)" />
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </div>
    </div>

    <!--  新增、编辑菜单  -->
    <operateMenu ref="MenuCom" />
</template>
<script lang="ts" setup>
import { reactive, ref, h } from 'vue';
import { DownOutlined, UpOutlined, DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons-vue';
import { FormInstance, message } from 'ant-design-vue';
import { useStore } from '@/store/index'
import { MenuItem } from '@/models/Sidebar'
import { removeMenu } from '@/api/menu'
import { config } from '@/utils'
import operateMenu from './components/menu.vue'

const IndexStor = useStore()
const MenuCom = ref()
const columns = [
    {
        title: '菜单名称',
        dataIndex: 'label',
        key: 'label',
    },
    {
        title: '页面路由',
        dataIndex: 'path',
        key: 'path',
        width: '20%',
    },
    {
        title: '页面类型',
        dataIndex: 'page_type',
        key: 'page_type',
    },
    {
        title: '菜单状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '排序',
        dataIndex: 'order_by',
        key: 'order_by',
        width: '70px'
    },
    {
        title: '图标',
        dataIndex: 'iconClass',
        key: 'iconClass',
        width: '80px'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '160px'
    },
];

const tableData = computed(() => {
    return IndexStor.SliderMenu
})

/**
 * 添加菜单
 * @param record 当前点击菜单
 */
const addMenu = ((record: MenuItem) => {
    MenuCom?.value.showDrawer(1)
})

const editMenu = ((record: MenuItem) => {
    MenuCom?.value.showDrawer(2, record)
})

/**
 * 根据Id删除菜单
 * @param id 
 */
const deleteMenu = (async (id: number) => {
    var res = await removeMenu(id)
    if (res.code == 200) {
        message.success("删除成功")
        IndexStor.setMenu(res.data)
    }
})

onMounted(() => {
})
</script>



<style scoped>
#components-form-demo-advanced-search .ant-form {
    max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
}

[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
    border: 1px dashed #434343;
    background: rgba(255, 255, 255, 0.04);
}
</style>