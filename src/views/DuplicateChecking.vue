<template>
  <headerTitle title="知网查重" sub-title="帮助你快速识别原创小作文" @buttonClick="changeIntroduceShow"></headerTitle>
  <div v-show="isShowIntroduce" class="introduce-phone">
    <div class="introduce-title">功能介绍</div>
    <div v-for="(item, index) in contentList" :key="index" class="introduce-text-content">
      <div>{{ item.title }}</div>
      <div>{{ item.content }}</div>
    </div>
    <div class="introduce-footer">
      <div
        class="display-center cursor"
        style="margin-right: 20px"
        @click="toTargetUrlWithNewWindow('https://github.com/ASoulCnki/')"
      >
        <img src="@/assets/icons/githubIcon.svg" />
        查重接口开源仓库
      </div>
      <div
        class="display-center cursor"
        @click="toTargetUrlWithNewWindow('https://space.bilibili.com/1809170490')"
      >
        <img src="@/assets/icons/BilibiliIcon.svg" />
        查重接口反馈
      </div>
    </div>
  </div>
  <div class="DuplicateChecking">
    <div class="search-and-result">
      <div class="search-area">
        <textarea
          v-model="searchData.searchValue"
          placeholder="在这里输入小作文哦"
          maxlength="1000"
          class="search-textarea"
        ></textarea>
        <div
          class="search-text-count"
        >总字数:{{ searchData.searchValue.length }}/{{ searchData.maxLength }}</div>
        <div
          class="search-button"
          :style="{
            'background-color':
              searchData.searchValue.length > 10 ? '#4B5563' : '#9CA3AF',
          }"
          @click="getDuplicate()"
        >查询结果</div>
      </div>

      <div class="result-area">
        <div v-for="item in DuplicateCheckingList" :key="item.date" class="result-item">
          <div class="result-item-flex">
            <div class="display-center">
              <div
                class="display-center cursor"
                @click="
                  toTargetUrlWithNewWindow('https://space.bilibili.com/' + item.authorUid)
                "
              >
                <img src="@/assets/icons/BilibiliIcon.svg" />
                <div class="result-item-author">{{ item.author }}</div>
              </div>
              <div>查重率 {{ item.rate }}%</div>
            </div>
            <div class="display-center cursor" @click="copyResult(item)">
              <img src="@/assets/icons/cube.svg" />
              复制
            </div>
          </div>
          <div class="result-item-content">{{ item.content }}</div>
          <div class="result-item-flex">
            <div class="display-center">
              <img src="@/assets/icons/clock.svg" />
              <div>发表时间 {{ item.date }}</div>
            </div>
            <div class="display-center cursor" @click="toTargetUrlWithNewWindow(item.targetUrl)">
              <img src="@/assets/icons/link-icon.svg" />
              前往评论区
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="introduce-pc">
        <div class="introduce-title">功能介绍</div>
        <div v-for="(item, index) in contentList" :key="index" class="introduce-text-content">
          <div>{{ item.title }}</div>
          <div>{{ item.content }}</div>
        </div>
        <div class="introduce-footer">
          <div
            class="display-center cursor"
            style="margin-right: 20px"
            @click="toTargetUrlWithNewWindow('https://github.com/ASoulCnki/')"
          >
            <img src="@/assets/icons/githubIcon.svg" />
            查重接口开源仓库
          </div>
          <div
            class="display-center cursor"
            @click="toTargetUrlWithNewWindow('https://space.bilibili.com/1809170490')"
          >
            <img src="@/assets/icons/BilibiliIcon.svg" />
            查重接口反馈
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import headerTitle from '@/components/HeaderTitle.vue'
import copyToClipBoard from '@/hooks/useCopyToClipBoard'
import toTargetUrlWithNewWindow from '@/hooks/useUtility'

interface DuplicateCheckingItem {
  targetUrl: string
  content: string
  author: string
  authorUid: string
  // 将10位时间戳转成13位
  date: string
  rate: string
}

export default defineComponent({
  name: 'DuplicateChecking',
  components: { headerTitle },
  setup() {
    const contentList = [
      {
        title: '比对库内容范围:',
        content: 'B站动态,视频评论区（仅限A-Soul的六个官方账号）',
      },
      {
        title: '比对库时间范围:',
        content: '2020/11/23 21:18:26 至 2021/08/27 11:58:39',
      },
      {
        title: '参考文献:',
        content: '[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学',
      },
    ]
    const searchData = reactive({
      maxLength: 1000,
      searchValue: '',
      btnContent: '查询结果',
    })
    const DuplicateCheckingList = ref([] as DuplicateCheckingItem[])
    const isShowIntroduce = ref(true)
    const { proxy } = useCurrentInstance()
    // 方法
    const getDuplicate = async () => {
      if (searchData.searchValue.length <= 10) {
        proxy.$Toast.show('请输入十字以上的小作文')
        return
      }
      try {
        DuplicateCheckingList.value = []
        const res = await proxy.$request({
          method: 'post',
          url: import.meta.env.VITE_API_DUPLICATECHECKING,
          data: {
            text: searchData.searchValue,
          },
        })
        if (res.related.length === 0) {
          proxy.$Toast.show('没有找到重复的小作文捏')
          return
        }

        DuplicateCheckingList.value = res.related.map((item: any) => {
          return {
            targetUrl: item.reply_url,
            content: item.reply.content,
            author: item.reply.m_name,
            authorUid: item.reply.mid,
            // 将10位时间戳转成13位
            date: new Date(item.reply.ctime * 1000).toLocaleString('chinese', {
              hour12: false,
            }),
            rate: (item.rate * 100).toFixed(2),
          } as DuplicateCheckingItem
        })
      }
      catch (error) {
        proxy.$Toast.showError(error, 'getDuplicate')
      }
    }
    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e
    }
    const copyResult = (item: any) => {
      const Time = new Date().toLocaleString('chinese', {
        hour12: false,
      })
      const copyText = `枝网文本复制检测报告(ProJectASF)
      查重时间:${Time}
      总文字复制比:${item.rate}%
      相似小作文：${item.targetUrl}
      作者：${item.author}
      发表时间：${item.date}
      查重结果仅作参考，请注意辨别是否为原创
      `
      copyToClipBoard(copyText)
    }
    return {
      getDuplicate,
      copyResult,
      toTargetUrlWithNewWindow,
      changeIntroduceShow,
      DuplicateCheckingList,
      contentList,
      isShowIntroduce,
      searchData,
    }
  },
})
</script>

<style scoped lang="less">
.display-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cursor {
  cursor: pointer;
}
.DuplicateChecking {
  display: flex;
  margin-top: 20px;
  color: #374151;
  .search-and-result {
    flex: 1;
  }
  .search-area {
    position: relative;
    display: flex;
    flex-direction: column;
    .search-textarea {
      width: 100%;
      min-width: 400px;
      min-height: 300px;
      max-height: 600px;
      resize: none;
      padding: 10px 10px 40px 10px;
      font-size: 18px;
      color: #374151;
      border: 1px solid #d1d5db;
      border-radius: 2px;
    }
    textarea:focus {
      outline: none;
      border: 1px solid #000;
    }
    textarea[class="search-textarea"]::-webkit-input-placeholder {
      font-size: 20px;
      color: #d1d5db;
    }
    .search-text-count {
      position: absolute;
      bottom: 70px;
      right: 10px;
    }
    .search-button {
      width: 138px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4b5563;
      color: #f1f2f3;
      border-radius: 0 2px 2px 0;
      cursor: pointer;
      align-self: flex-end;
      margin-top: 20px;
    }
  }
  .result-area {
    width: 100%;

    font-size: 16px;
    .result-item {
      margin: 20px 0;
      padding: 5px 10px;
      background-color: #f8f8f8;

      .result-item-flex {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        .result-item-author {
          margin-right: 10px;
        }

        .result-item-date {
          display: flex;
        }
      }
      .result-item-content {
        color: #6b7280;
      }

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
}

.introduce-pc {
  background-color: #f3f4f6;
  width: 400px;
  min-height: 200px;
  margin-left: 40px;
  padding: 20px;
  border-radius: 2px;
}
.introduce-phone {
  display: none;
}
.introduce-title {
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 20px;
}
.introduce-text-content {
  font-size: 15px;
  margin: 10px 0;
  .introduce-text-content-section {
    margin-bottom: 20px;
  }
}
.introduce-footer {
  display: flex;
  align-items: center;
  margin-top: 40px;
  font-size: 18px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}

@media only screen and (max-width: 768px) {
  .introduce-pc {
    display: none;
  }
  .introduce-phone {
    display: block;
    background-color: #f3f4f6;
    padding: 20px;
    margin-top: 30px;
    min-height: 180px;
  }
  .search-textarea {
    min-width: 0 !important;
  }
  .result-area {
    font-size: 12.4px !important;
  }
}
</style>
