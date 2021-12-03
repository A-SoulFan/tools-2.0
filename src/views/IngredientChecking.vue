<template>
  <div>
    <headerTitle title="成分姬" sub-title="帮助你快速分析用户成分" @buttonClick="changeIntroduceShow"></headerTitle>
    <div v-show="isShowIntroduce" class="introduce-phone">
      <div class="introduce-title">功能介绍</div>
      <div class="introduce-text-content">
        <div class="introduce-text-content-section">
          成分姬是由
          <span
            class="introduce-text-content-name"
            @click="toTargetUrlWithNewWindow('https://space.bilibili.com/32957695')"
          >晓轩iMIKU老师</span>
          为了鉴别b站用户成分制作的用于抓取b站用户关注列表内vup的小工具，快速识别评论区发言者成分
        </div>
        <div class="introduce-text-content-section">
          毕竟人与人之间要多些攻击性(ꐦ°᷄д°᷅),
          所以工具用都用了，速度去b站给五小只点点关注(♡ ὅ ◡ ὅ )ʃ♡
        </div>
        <div class="introduce-Asoul">
          <div
            v-for="item in Asoul"
            :key="item.BzhanUid"
            :style="'color:' + item.color"
            class="introduce-Asoul-item"
            @click="toTargetUrlWithNewWindow('https://space.bilibili.com/' + item.BzhanUid.toString())"
          >
            <img :src="item.face" class="introduce-Asoul-face" />
            <div class="introduce-Asoul-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ingredient">
      <div class="search-and-results">
        <div class="search-area">
          <input
            v-model="searchText"
            type="text"
            class="search-input"
            placeholder="请输入B站用户名或UID"
            @keyup.enter="getIngredient()"
          />
          <div
            class="search-button"
            :style="{
              'background-color': searchText.length > 0 ? '#4B5563' : '#9CA3AF',
            }"
            @click="getIngredient()"
          >查询成分</div>
        </div>
        <!-- 查询结果展示 -->
        <div class="results-area">
          <div class="results-header-area">
            <div>TA关注的VUP有:</div>
            <div class="results-header-button" @click="copySearchResult()">
              <img class="link-icon" src="@/assets/icons/link-icon.svg" />
              复制结果
            </div>
          </div>
          <div v-if="isVuplistEmpty" class="search-result-tip">该用户没有关注的Vup捏~！</div>
          <div v-else class="search-result-VupList">
            <div
              v-for="item in vupList"
              :key="item.vupUid"
              class="Vup-item"
              @click="toTargetUrlWithNewWindow(item.vupUid)"
            >
              <img :src="item.vupFace" class="Vup-item-face" />
              <div class="Vup-name">{{ item.vupName }}</div>
              <div class="Vup-describe">{{ item.officalVerify }}</div>
              <div class="divider"></div>
              <div class="Vup-sign">{{ item.vupSign }}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="introduce-pc">
          <div class="introduce-title">功能介绍</div>
          <div class="introduce-text-content">
            <div class="introduce-text-content-section">
              成分姬是由
              <span
                class="introduce-text-content-name"
                @click="toTargetUrlWithNewWindow('https://space.bilibili.com/32957695')"
              >晓轩iMIKU老师</span>
              为了鉴别b站用户成分制作的用于抓取b站用户关注列表内vup的小工具，快速识别评论区发言者成分
            </div>
            <div class="introduce-text-content-section">
              毕竟人与人之间要多些攻击性(ꐦ°᷄д°᷅),
              所以工具用都用了，速度去b站给五小只点点关注(♡ ὅ ◡ ὅ )ʃ♡
            </div>
            <div class="introduce-Asoul">
              <div
                v-for="item in Asoul"
                :key="item.BzhanUid"
                :style="'color:' + item.color"
                class="introduce-Asoul-item"
                @click="toTargetUrlWithNewWindow('https://space.bilibili.com/' + item.BzhanUid.toString())"
              >
                <img :src="item.face" class="introduce-Asoul-face" />
                <div class="introduce-Asoul-name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import headerTitle from '@/components/HeaderTitle.vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import copyToClipBoard from '@/hooks/useCopyToClipBoard'
import toTargetUrlWithNewWindow from '@/hooks/useUtility'
import Asoul from '@/assets/Data'


interface vupItem {
  vupName: string
  officalVerify: string
  vupSign: string
  vupUid: string
  vupFace: string
}
export default defineComponent({
  components: { headerTitle },
  setup() {
    const { proxy } = useCurrentInstance()
    const vupList = ref([] as vupItem[])
    const searchText = ref('')
    const isVuplistEmpty = ref(false)
    const isShowIntroduce = ref(true)
    let saveSearchText = ''
    const getIngredient = async () => {
      try {
        if (searchText.value === '')
          return
        vupList.value = []
        isVuplistEmpty.value = false

        const res = await proxy.$request({
          url: import.meta.env.VITE_API_CFJ,
          params: {
            name: searchText.value,
          },
        })
        saveSearchText = searchText.value
        console.log(res, 'res')
        if (!res || !res.list || res.list.length === 0) {
          isVuplistEmpty.value = true
          return
        }
        vupList.value = res.list.map(
          (item: {
            uname: string
            official_verify?: any
            sign: string
            mid: string
            face: string
          }) => {
            return {
              vupName: item.uname,
              officalVerify: item.official_verify.desc,
              vupSign: item.sign,
              vupUid: item.mid,
              vupFace: item.face.replace('http://', 'https://'),
            } as vupItem
          },
        )
      }
      catch (error) {
        proxy.$Toast.showError(error)
      }
    }
    const copySearchResult = () => {
      const vupName = vupList.value
        .map((item: any) => {
          return `${item.vupName}`
        })
        .join(',')
      const copyTime = new Date().toLocaleString('chinese', { hour12: false })
      copyToClipBoard(
        `@${saveSearchText} 关注的VUP有：\r\n${vupName}\r\n查询时间：${copyTime}\r\n数据来源：ProJectASF`,
      )
      console.log('copySearchResult')
    }
    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e
    }
    return {
      getIngredient,
      vupList,
      searchText,
      Asoul,
      toTargetUrlWithNewWindow,
      copySearchResult,
      isVuplistEmpty,
      changeIntroduceShow,
      isShowIntroduce,
    }
  },
})
</script>

<style scoped lang="less">
.ingredient {
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
    .search-input {
      border: none;
      width: 100%;
      // height: calc(100%-2px);
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

  .results-area {
    margin-bottom: 20px;
    .results-header-area {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 20px;
      .results-header-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        cursor: pointer;
        .link-icon {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }
    }
    .search-result-tip {
      margin-top: 50px;
      font-size: 20px;
      color: #aa5555;
      text-align: center;
    }
    .search-result-VupList {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      justify-content: space-between;
      grid-gap: 80px 50px;
      padding-top: 100px;
      .Vup-item {
        background-color: #f8f8f8;
        padding: 0 10px 20px 10px;
        position: relative;
        // margin-top: 100px;
        max-height: 200px;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        word-break: break-all;
        cursor: pointer;
        transition: all 0.3s ease-in;

        .Vup-item-face {
          background-color: #d1d5db;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85px;
          height: 85px;
          border-radius: 50%;
          border: 1px #d1d5db solid;
        }
        .Vup-name {
          margin-top: 55px;
          font-size: 18px;
          font-weight: bold;
          align-self: center;
        }
        .Vup-describe {
          color: #9ca3af;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .divider {
          align-self: center;
          width: 80%;
          border-top: 1px #4b5563 solid;
          margin: 10px 0;
        }
        .Vup-sign {
          color: #9ca3af;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 3;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
  }
  .Vup-item:hover {
    box-shadow: 3px 3px 10px #a1a2a3;
  }
  .introduce-pc {
    background-color: #f3f4f6;
    width: calc(22.4vw - 40px);
    min-width: 300px;
    min-height: 200px;
    margin-left: 20px;
    padding: 20px;
    border-radius: 2px;
  }
}
.introduce-title {
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 20px;
}
.introduce-text-content {
  font-size: 15px;
  .introduce-text-content-section {
    margin-bottom: 20px;
  }
}
.introduce-text-content-name {
  margin: 0 10px;
  cursor: pointer;
  color: #666;
  text-decoration: underline;
}
.introduce-Asoul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .introduce-Asoul-item {
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    cursor: pointer;
    width: 65px;
  }
  .introduce-Asoul-face {
    width: 67px;
    height: 67px;
    border-radius: 50%;
  }
  .introduce-Asoul-name {
    margin-top: 5px;
    font-size: 12px;
  }
}
.introduce-phone {
  display: none;
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
  .search-result-VupList {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
  }
  .ingredient {
    .search-area {
      height: 35px;
      font-size: 15px;
    }
  }
}
</style>
