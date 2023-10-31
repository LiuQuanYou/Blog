<template>
    <div class="clearfix">
        <a-upload v-model:file-list="fileList" action="/api/upload/image" list-type="picture-card"
            @change="(info: any) => handleChange(info, fileList)">
            <div v-if="fileList?.length == 0">
                <plus-outlined />
            </div>
        </a-upload>
        <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import type { UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue'

const emit = defineEmits(["uploadSuccess"])
const props = defineProps({
    field: {
        default: '',
        type: String,
    },
    fileImgList: {
        default: [],
        type: Array
    }
});

const { fileImgList } = toRefs(props);
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

//预览列表
const fileList = ref(new Array());

watch(fileImgList, (newVal: any) => {
    fileList.value = newVal
}, { deep: true })

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};

const handleChange = (info: any, file: any) => {
    var status = info.file.status;
    switch (status) {
        case "uploading":
            break;
        case "error":
            //如果上传失败，从预览列表中删除上传失败的图片
            var index = info.fileList.findIndex((item: any) => item.uid == info.file.uid)
            info.fileList.splice(index, 1)
            fileList.value = info.fileList
            message.error(info.file.response.message);
            break
        case "removed":
            //删除
            break
        case "done":
            //上传成功  
            var res = {
                file: info.file.response.file,
                field: props.field
            }
            emit('uploadSuccess', res)
            break
    }
};
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
  