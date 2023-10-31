<template>
    <div class="page">
        <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="searchState"
            @finish="onFinish">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item name="begin" label="开始日期" :rules="[{ required: true, message: '请输入开始日期' }]">
                        <a-input v-model:value="searchState.begin" placeholder="开始日期"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="end" label="结束日期" :rules="[{ required: true, message: '请输入结束日期' }]">
                        <a-input v-model:value="searchState.end" placeholder="结束日期"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8" style="text-align: right;">
                    <a-button type="primary" html-type="submit">计算</a-button>
                    <a-button style="margin: 0 8px" @click="() => formRef?.resetFields()">重置</a-button>
                </a-col>
            </a-row>
        </a-form>
        {{ resStr }}
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { differenceInDays, addDays, isWeekend, isSameDay, isMonday, isFriday } from 'date-fns';
import axios from 'axios'

const formRef = ref<FormInstance>();
const resStr = ref('')

const searchState = reactive({
    begin: '',
    end: '',
    holiday: []
});


const getholiday = async (year: any) => {
    axios.get(`https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/${year}.json`)
}

const onFinish = async (values: any) => {
    const startDate = new Date(searchState.begin);
    const endDate = new Date(searchState.end);

};

const isHoliday = (date: any) => {
    // 在这里检查节假日，返回 true 表示是节假日
    // 例如：return date.getMonth() === 0 && date.getDate() === 1; // 表示1月1日是节假日
    return false; // 默认情况下没有节假日
}
onMounted(async () => {
})
</script>
<style scoped>
.page {
    padding: 20px;
    width: 100%;
    overflow: hidden;
}
</style>
  