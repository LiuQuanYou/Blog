<template>
    <div>
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="searchState"
            @finish="onFinish">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item name="title" label="标题">
                        <a-input v-model:value="searchState.title" placeholder="文章标题"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="status" label="状态">
                        <a-input v-model:value="searchState.status" placeholder="文章状态"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8" style="text-align: right;">
                    <a-button type="primary" @click="addArticle" style="margin-right: 8px;">添加</a-button>
                    <a-button type="primary" html-type="submit">搜索</a-button>
                    <a-button style="margin: 0 8px" @click="() => formRef?.resetFields()">重置</a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="search-result-list">
            <a-table :columns="columns" :data-source="tableData" bordered>

            </a-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
const expand = ref(false);
const formRef = ref<FormInstance>();
const searchState = reactive({
    title: '',
    status: ''
});
const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    console.log('formState: ', searchState);
};

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '缩略图',
        dataIndex: 'preview_img',
        key: 'preview_img',
    },
    {
        title: '摘要',
        dataIndex: 'abstract',
        key: 'abstract',
        width: '20%',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '创建日期',
        dataIndex: 'create_date',
        key: 'create_date',
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

//添加
const addArticle = () => {

}

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
  