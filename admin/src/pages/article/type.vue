<template>
    <div>
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="query" @finish="onFinish">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item name="title" label="标题">
                        <a-input v-model:value="query.title" placeholder="标题"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8" />
                <a-col :span="8" style="text-align: right;">
                    <a-button type="primary" @click="addArticle" style="margin-right: 8px;">添加</a-button>
                    <a-button type="primary" html-type="submit">搜索</a-button>
                    <a-button style="margin: 0 8px" @click="() => formRef?.resetFields()">重置</a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="search-result-list">
            <a-table :columns="columns" :data-source="tableData" :pagination="pagination" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'preview_img'">
                        <a-image :width="60" :src="'/' + record.preview_img" :previewMask="false" />
                    </template>
                    <template v-if="column.key === 'status'">
                        <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="0" disabled />
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

        <typeDetail ref="articleRef" @refresh="getListData" />
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, h } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { DownOutlined, UpOutlined, DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons-vue';
import typeDetail from './components/typeDetail.vue'
import { paginationMixin } from '@/mixin/base'
import { getTypeList, remove } from '@/api/article';

var pagination = paginationMixin.data()
const query = ref({
    title: '',
    status: null,
    pageSize: 10,
    pageNo: 1,
})

const articleRef = ref()
const formRef = ref<FormInstance>();

const onFinish = (values: any) => {
    getListData()
};

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '30%'
    },
    {
        title: '创建日期',
        dataIndex: 'createAt',
        key: 'createAt',
    },
    {
        title: '排序',
        dataIndex: 'order_by',
        key: 'order_by',
        width: '70px'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '160px'
    },
];

const tableData = ref(null)

const getListData = async () => {
    var res = await getTypeList(query.value)
    if (res.code == 200) {
        tableData.value = res.data.articles
        pagination.total = res.data.total
    }
}

//添加
const addArticle = () => {
    articleRef.value.showModal()
}

/**
 * 根据Id删除菜单
 * @param id 
 */
const deleteMenu = (async (id: string) => {
    var res = await remove(id)
    if (res.code == 200) {
        message.success("删除成功");
        getListData()
    }
})

/**
 * 编辑文章内容
 * @param record 
 */
const editMenu = ((record: any) => {
    articleRef.value.showModal(record.id, 2)
})

onMounted(() => {
    getListData()
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
  