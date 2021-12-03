<template>
  <headerTitle title="枝江方言词典" sub-title="你想了解的词条都在这" @buttonClick="changeIntroduceShow"></headerTitle>
  <div v-show="isShowIntroduce" class="introduce-phone">
    <div class="introduce-title">功能介绍</div>
    <div class="introduce-text-content">
      <div
        class="introduce-text-content"
      >本词典收录了A-Soul以及A-Soul评论区相关的梗，旨在帮助新入坑的一个魂们能更快的融入这个大家庭里。我们希望大家能通过了解不同圈子的梗和文化，避免一些误解和纷争、减少一些陌生感和恐惧感，化解大家的戾气，从而让我们的讨论环境更加和谐友善。</div>
      <div class="introduce-text-content">
        如果有新词条或者对词条的内容方面有建议的欢迎联系:
        <span
          class="introduce-targetUrl"
          @click="toTargetUrl('https://space.bilibili.com/1442421278')"
        >&nbsp;&nbsp;@ProJectASF</span>
      </div>
    </div>
  </div>
  <div class="zhijiang-dict">
    <div class="search-and-results">
      <!-- <div class="search-area">
        <input
          type="text"
          class="search-input"
          placeholder="请在此处输入你想了解的词条"
          v-model="searchText"
          @keyup.enter="searchWords()"
        />
        <div
          class="search-button"
          :style="{
            'background-color': searchText.length > 0 ? '#4B5563' : '#9CA3AF',
          }"
          @click="searchWords()"
        >
          查询词条
        </div>
      </div>-->

      <div v-show="!isShowDetail" class="result-area">
        <!-- 分类 -->
        <div class="result-categories">
          <div
            v-for="item in data.categoriesList"
            :key="item.cid"
            class="result-categories-item"
            :class="
              data.categoriesKey === item.cid
                ? 'result-categories-item-active'
                : ''
            "
            @click="setChildCategoriesList(item.cid)"
          >{{ item.name }}</div>
          <!-- 二级分类 -->
        </div>
        <div class="result-entries">
          <div
            v-for="item in data.childCategoriesList"
            :key="item.cid"
            class="result-entries-item"
            :class="
              data.childCategorieskey === item.cid
                ? 'result-entries-item-active'
                : ''
            "
            @click="getContentList(item.cid)"
          >{{ item.name }}</div>
        </div>

        <!-- 结果 -->
        <div class="result-item-area">
          <div v-for="entry in data.entryList" :key="entry.eid" class="result-item">
            <div class="result-item-header">
              <div class="result-item-title">{{ entry.title }}</div>
              <div class="result-item-header-right" @click="toShowDetail(entry)">
                <img src="@/assets/icons/link-icon.svg" />
                查看详情
              </div>
            </div>
            <div class="result-item-content">{{ entry.content }}</div>
            <div class="result-item-footer">
              <img src="@/assets/icons/clock.svg" />
              更新日期 {{ entry.timeText }}
            </div>
          </div>
        </div>
      </div>
      <div class="entry-detail-area" v-show="isShowDetail">
        <div class="entry-detail-header" @click="closeDetail">
          返回
          <img src="@/assets/icons/return.svg" />
        </div>
        <div class="entry-detail-title-time">
          <div class="entry-detail-title">{{ contentDetailItem.title }}</div>
          <div class="entry-detail-time">
            <img src="@/assets/icons/clock.svg" />
            最近更新 {{ contentDetailItem.timeText }}
          </div>
        </div>
        <v-md-preview :text="contentDetailItem.content"></v-md-preview>
      </div>
    </div>
    <div>
      <div>
        <div class="introduce-pc">
          <div class="introduce-title">功能介绍</div>
          <div class="introduce-text-content">
            <div class="introduce-text-content">
              <div class="introduce-text-content">
                <div
                  class="introduce-text-content"
                >本词典收录了A-Soul以及A-Soul评论区相关的梗，旨在帮助新入坑的一个魂们能更快的融入这个大家庭里。我们希望大家能通过了解不同圈子的梗和文化，避免一些误解和纷争、减少一些陌生感和恐惧感，化解大家的戾气，从而让我们的讨论环境更加和谐友善。</div>
                <div class="introduce-text-content">
                  如果有新词条或者对词条的内容方面有建议的欢迎联系:
                  <span
                    class="introduce-targetUrl"
                    @click="
                      toTargetUrl('https://space.bilibili.com/1442421278')
                    "
                  >&nbsp;&nbsp;@ProJectASF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import headerTitle from '@/components/HeaderTitle.vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
export default defineComponent({
  name: 'ZhijiangDict',
  components: { headerTitle },
  setup() {
    const { proxy } = useCurrentInstance()
    const searchText = ref('')
    const isShowIntroduce = ref(true)
    const isShowDetail = ref(false)
    const contentDetailItem = reactive({
      title: '',
      timeText: '',
      content: '',
    })
    const data = reactive({
      categoriesList: [] as any[],
      categoriesKey: 0,
      childCategoriesList: [] as any[],
      childCategorieskey: 0,
      entryList: [] as any[],
      entryKey: 0,
    })
    let result = [] as any[]
    const searchWords = async () => {
      try {
        const res = await proxy.$request({
          url: import.meta.env.VITE_API_DICT_SEARCH,
          method: 'get',
          params: {
            kwd: searchText.value,
          },
        })
      }
      catch (error) {
        proxy.$Toast.showError(error)
      }
    }
    const getContentList = async (cid: number) => {
      try {
        data.childCategorieskey = cid
        const res = await proxy.$request({
          url: import.meta.env.VITE_API_DICT_ENTRIES,
          method: 'get',
          params: {
            cid,
          },
        })
        data.entryList = res.map((item: any) => {
          // 将10位时间戳转成13位
          item.timeText = new Date(item.updated * 1000).toLocaleString(
            'chinese',
            {
              hour12: false,
            },
          )
          return item
        })
      }
      catch (error) {
        proxy.$Toast.showError(error)
      }
    }
    // 设置二级目录列表
    const setChildCategoriesList = (cid: number) => {
      const temp = [] as any[]
      data.categoriesKey = cid
      result.forEach((element: any) => {
        if (element.parent_cid === cid)
          temp.push(element)
      })
      data.childCategoriesList = temp
      getContentList(data.childCategoriesList[0].cid)
    }
    const getCategoriesList = async () => {
      try {
        result = await proxy.$request({
          url: import.meta.env.VITE_API_DICT_CATEGORIES,
          method: 'get',
        })
        const tempCategoriesList = [] as any[]

        // 生成分类列表
        result.forEach((element: any) => {
          if (element.parent_cid === null) {
            tempCategoriesList.push({
              cid: element.cid,
              name: element.name,
              children: [],
            })
          }
        })

        data.categoriesList = tempCategoriesList

        setChildCategoriesList(data.categoriesList[0].cid)
      }
      catch (error) {
        proxy.$Toast.showError(error)
      }
    }
    const toShowDetail = (item: any) => {
      localStorage.setItem("AsoulFanZhijiangDict", (document.documentElement.scrollTop || document.body.scrollTop).toString())
      contentDetailItem.title = item.title
      contentDetailItem.timeText = item.timeText
      contentDetailItem.content = item.content
      isShowDetail.value = true
      toScrollTop(0)
    }
    const closeDetail = () => {
      isShowDetail.value = false
      toScrollTop(Number(localStorage.getItem("AsoulFanZhijiangDict")))
    }
    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e
    }
    const toScrollTop = (scrollTop: number) => {
      setTimeout(() => {
        document.documentElement.scrollTop = scrollTop
      }, 0);
    }
    const toTargetUrl = (url: string) => {
      window.open(url)
    }

    getCategoriesList()
    return {
      searchWords,
      setChildCategoriesList,
      getContentList,
      changeIntroduceShow,
      toShowDetail,
      closeDetail,
      toTargetUrl,
      searchText,
      data,
      isShowIntroduce,
      isShowDetail,
      contentDetailItem,
    }
  },
})
</script>

<style lang="less">
.zhijiang-dict {
  display: flex;
  padding-top: 30px;
  width: 100%;
  .search-and-results {
    flex: 1;
  }
  .search-area {
    display: flex;
    height: 50px;
    font-size: 17px;
    margin-bottom: 20px;
    .search-input {
      border: none;
      width: 100%;
      padding-left: 10px;
      border: 1px solid #d1d5db;
      border-radius: 2px 0 0 2px;
    }
    input:focus {
      outline: none;
      border: 1px solid #000;
    }
    .search-button {
      width: 138px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4b5563;
      color: #f1f2f3;
      border-radius: 0 2px 2px 0;
      cursor: pointer;
    }
  }

  .result-area {
    margin-bottom: 20px;
    .result-categories {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
      overflow-x: scroll;
      max-width: 53.96vw; //APP的padding: 0 5.83vw
      padding: 10px;
      .result-categories-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        color: #9ca3af;
        font-size: 18px;
        cursor: pointer;
        white-space: nowrap;
      }
      .result-categories-item-active {
        color: #1f2937;
        font-weight: bold;
        // padding: 0 5px 5px 5px;
        border-bottom: 2px #1f2937 solid;
      }
    }
    .result-entries {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
      overflow-x: scroll;
      max-width: 53.96vw; //APP的padding: 0 5.83vw
      padding: 10px;
      .result-entries-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        margin-right: 40px;
        font-size: 15px;
        color: #f3f4f6;
        border-radius: 2px;
        background-color: #9ca3af;
        cursor: pointer;
        white-space: nowrap;
      }
      .result-entries-item-active {
        background-color: #4b5563;
      }
    }
    .result-item-area {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 15px 20px;
      .result-item {
        background-color: #f8f8f8;
        // margin: 20px 20px;
        padding: 20px;
        border-radius: 2px;
        .result-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          .result-item-title {
            border-left: 2px #1f2937 solid;
            padding-left: 10px;
            font-size: 16px;
          }
          .result-item-header-right {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4b5563;
            font-size: 14px;
            cursor: pointer;
          }
        }
        .result-item-content {
          color: #4b5563;
          font-size: 14px;
          margin-bottom: 30px;
          height: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 5; //显示的行
        }
        .result-item-footer {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          color: #4b5563;
        }
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .entry-detail-area {
    background-color: #f3f4f6;
    padding: 30px 20px;
    border-radius: 2px;
    .entry-detail-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 60px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }
    }
    .entry-detail-title-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .entry-detail-title {
        font-size: 50px;
        font-weight: bold;
      }
      .entry-detail-time {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
    }
  }
}
.introduce-pc {
  background-color: #f3f4f6;
  width: calc(22.4vw - 40px);
  min-width: 200px;
  min-height: 200px;
  margin-left: 20px;
  padding: 20px;
  border-radius: 2px;
}
.introduce-title {
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 20px;
}
.introduce-text-content {
  font-size: 15px;
  margin: 10px 0;
}
.introduce-targetUrl {
  cursor: pointer;
  color: #4e4eb6;
}
.introduce-phone {
  display: none;
}

@media only screen and (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 5px;

    height: 5px;
  }
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
  .result-categories,
  .result-entries {
    max-width: calc(88.34vw - 20px) !important;
  }
  .zhijiang-dict {
    .search-area {
      height: 35px;
      font-size: 15px;
    }
  }
  .result-item-content {
    height: 100px !important;
  }
}
</style>
