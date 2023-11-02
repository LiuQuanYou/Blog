<template>
    <MdEditor v-model="myValue" @onUploadImg="onUploadImg" />
</template>

<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import axios from 'axios';

const props = defineProps({
    value: {
        type: String,
        default: () => {
            return ""
        },
    }
})

const onUploadImg = async (files: any, callback: any) => {
    const res = await Promise.all(
        files.map((file: any) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);
                axios
                    .post('/api/upload/image', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );

    callback(res.map((item) => '/api/' + item.data.file));
};

const myValue = ref(props.value)

watch(
    () => props.value,
    () => {
        myValue.value = props.value
    }
)
</script>