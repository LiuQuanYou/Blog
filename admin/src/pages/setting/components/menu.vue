<template>
    <a-drawer :title="title" :width="720" :open="open" :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }" @close="onClose">
        <a-form :model="form" ref="formRef" :rules="rules" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="菜单名称" name="label">
                        <a-input v-model:value="form.label" placeholder="请输入菜单名称" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="上级菜单" name="parent_id">
                        <a-tree-select v-model:value="form.parent_id" show-search style="width: 100%"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择上级菜单" allow-clear
                            tree-default-expand-all :tree-data="treeData" :field-names="{
                                children: 'children',
                                label: 'label',
                                value: 'id',
                            }" tree-node-filter-prop="label"></a-tree-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="排序" name="order_by">
                        <a-input v-model:value="form.order_by" placeholder="请输入排序号" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="图标" name="iconClass">
                        <a-input v-model:value="form.iconClass">
                            <template #addonAfter>
                                <component :is="form.iconClass" />
                            </template>
                        </a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="路由地址" name="path">
                        <a-input v-model:value="form.path" placeholder="请输入路由地址" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="状态" name="status">
                        <a-switch v-model:checked="form.status" :checkedValue="1" :unCheckedValue="0" />
                    </a-form-item>
                </a-col>

            </a-row>
        </a-form>
        <template #footer>
            <a-space>
                <a-button @click="onClose">取消</a-button>
                <a-button type="primary" @click="onSubmit">提交</a-button>
            </a-space>
        </template>
    </a-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { MenuItem } from '@/models/Sidebar'
import type { TreeSelectProps } from 'ant-design-vue';
import { useStore } from '@/store/index'

const IndexStor = useStore()
const open = ref<boolean>(false);
const formRef = ref();
const title = ref('')

const form = ref({
    label: '',
    path: '',
    page_type: '',
    status: 1,
    order_by: '1',
    parent_id: '',
    iconClass: 'SettingOutlined',
});

const formatBookmarksTreeList = (list: any) => {
    list.map((item: any) => {
        item.key = item.id;
        if (item['children']) {
            item.children = formatBookmarksTreeList(item.children);
        }
        return item;
    });
    return list;
}

const rules: Record<string, Rule[]> = {
    label: [{ required: true, message: '请填写菜单名称' }],
    order_by: [{ required: true, message: '请填写排序号' }],
    page_type: [{ required: true, message: '请选择页面类型', trigger: 'change' }],
};

const treeData = computed(() => {
    return formatBookmarksTreeList(IndexStor.SliderMenu)
})

const value = ref<string>();
watch(value, () => {
    console.log(value.value);
});

/**
 * 打开菜单编辑抽屉
 * @param type 类型
 * @param row 行数据
 */
const showDrawer = (type: number, row: any = {}) => {
    if (type == 1) {
        //新增
        title.value = '添加菜单'
    } else {
        //编辑
        title.value = '编辑菜单'
        form.value = { ...row }
    }
    open.value = true;
};

const onClose = () => {
    formRef.value.resetFields();
    form.value = {
        label: '',
        path: '',
        page_type: '',
        status: 1,
        order_by: '1',
        parent_id: '',
        iconClass: 'SettingOutlined',
    }
    open.value = false;
};

const onSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', form, toRaw(form));
        })
        .catch((error: any) => {
            console.log('error', error);
        });
}

defineExpose({
    showDrawer,
});
</script>