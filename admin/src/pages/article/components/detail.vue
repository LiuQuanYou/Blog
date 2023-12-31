<template>
    <div>
        <a-modal v-model:open="open" width="1200px" :wrap-style="{ overflow: 'hidden' }" :footer="false">
            <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed" class="base-form">
                <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入文章标题!' }]">
                    <a-input v-model:value="formState.title" />
                </a-form-item>
                <a-form-item label="预览图" name="preview_img">
                    <UploadCom field="preview_img" @uploadSuccess="imgSuccess" :file-img-list="fileList" />
                </a-form-item>
                <a-form-item label="状态" name="status">
                    <a-switch v-model:checked="formState.status" :checkedValue="1" :unCheckedValue="0" />
                </a-form-item>
                <a-form-item label="分类" name="article_id" :rules="[{ required: true, message: '请选择分类!' }]">
                    <a-select v-model:value="formState.article_id" placeholder="Select a person" :fieldNames="{
                        label: 'title',
                        value: 'id'
                    }" style="width: 200px" :options="options"></a-select>
                </a-form-item>
                <a-form-item label="排序" name="order_by">
                    <a-input v-model:value="formState.order_by" />
                </a-form-item>
                <a-form-item label="内容" name="rich_text">
                    <MdEditor v-model="formState.rich_text" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                    <a-button type="primary" html-type="submit">保存</a-button>
                </a-form-item>
            </a-form>
            <template #title>
                <div ref="modalTitleRef" style="width: 100%; cursor: move">{{ formState.id ? '编辑文章' : '添加文章' }}</div>
            </template>
            <template #modalRender="{ originVNode }">
                <div :style="transformStyle">
                    <component :is="originVNode" />
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, CSSProperties, watch, watchEffect } from 'vue';
import { useDraggable } from '@vueuse/core';
import { ArticleState } from '@/models/Index'
import MdEditor from '@/components/MdEditor.vue'
import UploadCom from '@/components/Upload.vue'
import TEditor from '@/components/TEditor.vue';
import { add, getEntity, update, getTypeOptions } from '@/api/article'
import { message } from 'ant-design-vue';

const open = ref<boolean>(false);
const formRef = ref()
const modalTitleRef = ref<any>(null);
const emit = defineEmits(["refresh"])

const fileList = ref(new Array())
const options = ref(<any>[])

/**
 * 表单字段
 */
const formState = ref({
    title: '',
    abstract: '',
    preview_img: '',
    author: '',
    order_by: 1,
    rich_text: '',
    status: 1,
    article_id: '',
    id: ''
});

/**
 * 图片上传成功回调
 * @param e 
 */
const imgSuccess = (e: any) => {
    formState.value[e.field] = e.file
}

const getTypeData = async () => {
    var res = await getTypeOptions()
    if (res.code == 200) {
        options.value = res.data
    }
}

/**
 * 根据Id获取文章详情
 * @param id 文章Id
 */
const getJoin = async (id: string) => {
    var res = await getEntity(id)
    if (res.code == 200) {
        var article = res.data[0]
        formState.value = { ...article }
        if (article.preview_img) {
            fileList.value.push({
                uid: 1,
                status: "removed",
                url: '/' + article.preview_img
            })
        }
    }
}

/**
 * 添加、修改
 * @param values 
 */
const onFinish = async (values: any) => {
    if (formState.value.id) {
        //编辑
        var res = await update(formState.value.id, formState.value)
        if (res.code == 200) {
            message.success("添加成功~")
            open.value = false
            emit("refresh")
        }
    }
    else {
        //新增
        var res = await add(values)
        if (res.code == 200) {
            message.success("添加成功~")
            open.value = false
            emit("refresh")
        }
    }
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const getContent = (v: string) => {
    formState.value.rich_text = v
}

/**
 * 监听关闭之后清空表单和验证
 */
watch(open, (newVal) => {
    if (!newVal) {
        //关闭
        formRef.value.resetFields();
        fileList.value = []
        formState.value = {
            title: '',
            abstract: '',
            preview_img: '',
            article_id: '',
            author: '',
            order_by: 1,
            rich_text: '',
            status: 1,
            id: ''
        }
    }
});

//打开弹框
const showModal = (e: any) => {
    if (e) {
        formState.value.id = e
        getJoin(e)
    }
    getTypeData()
    open.value = true;
};

defineExpose({
    showModal,
});


/**
 * 拖拽组件
 */
const { x, y, isDragging } = useDraggable(modalTitleRef);
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalTitleRef?.value.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});
watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});

watchEffect(() => {
    if (startedDrag.value) {
        transformX.value =
            preTransformX.value +
            Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
            startX.value;
        transformY.value =
            preTransformY.value +
            Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
            startY.value;
    }
});
const transformStyle = computed<CSSProperties>(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});
</script>
  
<style scoped>
.base-form {
    max-height: 700px;
    overflow: auto;
}
</style>