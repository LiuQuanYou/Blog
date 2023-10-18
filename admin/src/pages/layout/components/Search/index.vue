<template>
    <div>
        <a-modal v-model:open="data.open" :closable="false" :footer="false" :bodyStyle="{ margin: '0 -24px -23px' }">
            <div class="search-top">
                <a-input v-model:value="data.searchStr" placeholder="搜索" size="large">
                    <template #prefix>
                        <SearchOutlined />
                    </template>
                </a-input>
            </div>
            <!--  搜索结果  -->
            <div class="search-result">
                <ul class="result-box" v-if="data.searchResult.length != 0" @keyup="keyboard($event)">
                    <li :class="index == data.searchIndex ? 'current result-item' : 'result-item'"
                        @mouseenter="data.searchIndex = index" v-for="(item, index) in data.searchResult" :key="index">
                        <div class="item-icon">
                            <component :is="item.img" />
                        </div>
                        <div class="item-text">{{ item.title }}</div>
                        <div class="item-enter">
                            <EnterOutlined />
                        </div>
                    </li>

                </ul>
                <div v-else class="empty">
                    暂无搜索结果
                </div>
            </div>

            <!--  底部提示  -->
            <div class="search-footer">
                <a-space :size="12">
                    <div class="flex">
                        <span class="footer-icon">
                            <EnterOutlined />
                        </span>
                        <span>确认</span>
                    </div>
                    <div class="flex">
                        <span class="footer-icon">
                            <ArrowUpOutlined />
                        </span>
                        <span class="footer-icon">
                            <ArrowDownOutlined />
                        </span>
                        <span>切换</span>
                    </div>
                    <div class="flex">
                        <span class="footer-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em"
                                viewBox="0 0 24 24" class="iconify iconify--mdi">
                                <path fill="currentColor"
                                    d="M1 7h6v2H3v2h4v2H3v2h4v2H1V7m10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2Z">
                                </path>
                            </svg>
                        </span>
                        <span>关闭</span>
                    </div>
                </a-space>
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { EnterOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/store/index'
import { MenuItem } from '@/models/Sidebar'
import router from '@/router';

const IndexStore = useStore()

const data = reactive({
    searchStr: '',   //搜索内容
    open: false,
    searchResult: [] as MenuItem[],  //搜索结果
    searchIndex: 0  //选中数据下标
})

//监听弹框打开、关闭状态
watch(() => data.open, (newValue, oldValue) => {
    if (newValue) {
        //打开添加按键监听
        window.addEventListener('keyup', keyboard);
    } else {
        //关闭组件时，移除事件监听器，防止内存泄漏
        window.removeEventListener('keyup', keyboard)
        data.searchResult = []
        data.searchIndex = 0
        data.searchStr = ''
    }
})



//监听输入框内容，根据侧边栏菜单模糊匹配
watch(() => data.searchStr, (newValue, oldValue) => {
    if (newValue) {
        var menu = IndexStore.SliderMenu
        data.searchResult = searchMenu(menu, newValue)
        console.log(data.searchResult)
    } else {
        data.searchResult = []
    }
});

/**
 * 递归模糊匹配
 * @param menu 菜单
 * @param searchTerm 模糊查询值
 */
const searchMenu = (menu: any, searchTerm: string, ancestors = <any>[]): any => {
    const result = <any>[];
    menu.forEach((item: any) => {
        if (item.title.includes(searchTerm) && !item.children) {
            result.push(item);
        }
        if (item.children) {
            const matchingChildren = searchMenu(item.children, searchTerm);
            if (matchingChildren.length > 0) {
                matchingChildren.map((row: any) => {
                    var obj = { ...row }
                    obj.title = `${item.title} > ${obj.title}`;
                    result.push({ ...obj })
                })
            }
        }
    });
    return result;
}

/**
 * 键盘控制上、下、回车选中
 */
const keyboard = (ev: any) => {
    var searchIndex = data.searchIndex
    var searchResult = data.searchResult
    var res = 0
    switch (ev.keyCode) {
        case 38:
            //向上
            res = searchIndex == 0 ? searchResult.length - 1 : searchIndex - 1
            break;
        case 40:
            //向下
            res = searchIndex == searchResult.length - 1 ? 0 : searchIndex + 1
            break;
        case 13:
            //回车选中
            var row = data.searchResult[searchIndex]
            router.push({
                path: row.path!
            })
            data.open = false;
            break
    }
    data.searchIndex = res
}


const showOpen = () => {
    data.open = true
}


//给父组件暴漏方法
defineExpose({
    showOpen
})

</script>
  
<style scoped lang="scss">
.search-top {
    padding: 0 14px;
}

.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    color: #969faf;
    font-size: 18px;
}

.search-result {
    .result-box {
        max-height: 472px;
        padding: 0 14px 20px;
        overflow: auto;
        margin-top: 10px;

        .result-item {
            display: flex;
            position: relative;
            align-items: center;
            width: 100%;
            height: 56px;
            margin-top: 8px;
            padding: 0 14px 4px;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 1px 3px #d4d9e1;
            color: #000000e0;
            font-size: 16px;
            cursor: pointer;

            .item-icon {
                margin-right: 10px;
            }

            .item-text {
                flex: 1;
            }

            .item-enter {
                display: none;
            }

            &:hover,
            &.current {
                background-color: #0960bd;
                color: #fff;

                .item-enter {
                    display: block;
                }
            }
        }
    }
}

.search-footer {
    height: 44px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    padding-left: 16px;

    .footer-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 18px;
        margin-right: 0.4em;
        padding-bottom: 2px;
        border-radius: 2px;
        background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
        box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
    }
}
</style>