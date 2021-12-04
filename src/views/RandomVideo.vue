<!-- 今天溜什么-->
<template>
  <div>
    <header-title title="今天溜什么" sub-title="相见即是缘份" @buttonClick="changeIntroduceShow"></header-title>
    <div v-show="isShowIntroduce" class="introduce-phone">
      <div class="introduce-title">功能介绍</div>
      <div class="introduce-text-content">
        <div class="introduce-text-content">请速度去b站给五小只点点关注捏(♡ ὅ ◡ ὅ )ʃ♡</div>
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
    <div class="update-time-area">
      <img class="icon-clock" src="@/assets/icons/clock.svg" />
      <div class="update-time-text">{{ "最近更新" + updateTime }}</div>
    </div>
    <div class="randomVideo">
      <div style="flex: 1">
        <div class="iframe-box">
          <iframe :src="iframeUrl"></iframe>
          <div class="iframe-box-button-area">
            <div class="pre-button-area">
              <img class="pre-button-img" src="@/assets/icons/cube.svg" />
              <div class="pre-button-text" @click="preVideo">回到上一条视频</div>
            </div>
            <div class="random-button" @click="getRandomVideo">随便看看</div>
          </div>
        </div>
        <div class="history-video-area">
          <div class="history-video-title-area">
            <div class="history-video-title">历史记录</div>
          </div>
          <div class="history-video">
            <div
              v-for="(item, index) in historyVideoList"
              :key="index"
              class="history-video-item"
              @click="toTargetUrlWithNewWindow('https://www.bilibili.com/video/' + item.bv)"
            >
              <div class="video-cover">
                <img :src="item.imgsrc" />
              </div>

              <div class="video-info">
                <div class="video-title">{{ item.title }}</div>
                <div class="video-time">观看时间：{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="introduce-pc">
          <div class="introduce-title">功能介绍</div>
          <div class="introduce-text-content">
            <div class="introduce-text-content">请速度去b站给五小只点点关注捏(♡ ὅ ◡ ὅ )ʃ♡</div>
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
import toTargetUrlWithNewWindow from '@/hooks/useUtility'
import Asoul from '@/assets/Data'

interface videoObj {
  title: string
  cover?: string
  time: string
  imgsrc: string
  play_url: string
  bv: string
}

export default defineComponent({
  components: { headerTitle },
  setup() {
    const { proxy } = useCurrentInstance()
    const isShowIntroduce = ref(true)
    const historyVideoList: videoObj[] = JSON.parse(
      localStorage.getItem('historyVideoList') || JSON.stringify([]),
    )


    const updateTime = ref('')
    const getUpdateTime = async () => {
      const res = await proxy.$request({
        url: import.meta.env.VITE_API_RANDOMVIDEO_UPDATETIME,
      }) as { last_update_time: string }
      updateTime.value = new Date(res.last_update_time).toLocaleString('chinese', { hour12: false })
    }
    getUpdateTime()

    let currentVideoIndex = 0
    const iframeUrl = ref('')
    const getRandomVideo = async () => {
      try {
        const res = await proxy.$request({
          url: import.meta.env.VITE_API_RANDOMVIDEO,
        })
        res.time = new Date().toLocaleString('chinese', { hour12: false })
        currentVideoIndex = 0
        res.play_url = `https:${res.play_url}`
        iframeUrl.value = res.play_url
        // 长度保持在二十条
        if (historyVideoList.length >= 20) historyVideoList.pop()

        historyVideoList.unshift({
          title: res.title,
          imgsrc: res.cover || '',
          time: res.time,
          play_url: res.play_url,
          bv: res.bv,
        })
        localStorage.setItem(
          'historyVideoList',
          JSON.stringify(historyVideoList),
        )
      }
      catch (error) {
        proxy.$Toast.showError(error)
      }
    }
    const preVideo = (): void => {
      currentVideoIndex++
      iframeUrl.value = historyVideoList[currentVideoIndex].play_url
    }
    const selectVideo = (item: videoObj): void => {
      window.open(`https://www.bilibili.com/video/${item.bv}`)
    }

    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e
    }
    getRandomVideo()
    return {
      getRandomVideo,
      preVideo,
      selectVideo,
      toTargetUrlWithNewWindow,
      changeIntroduceShow,
      updateTime,
      historyVideoList,
      iframeUrl,
      Asoul,
      isShowIntroduce,
    }
  },
})
</script>

<style scoped lang="less">
.randomVideo {
  display: flex;
}

.update-time-area {
  display: flex;
  margin-top: 23.5px;
  margin-bottom: 25px;
  align-items: center;
}
.icon-clock {
  width: 12px;
  height: 12px;
  margin-right: 2px;
}
.update-time-text {
  font-size: 12px;
  color: #4b5563;
}
/* iframe区域 */
.iframe-box {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.iframe-box > iframe {
  width: 100%;
  height: 57.59vw;
  max-height: 590px;
  border: none;
  margin: auto;
  background-color: #4b5563;
  border: 1px #4b5563 solid;
}
.iframe-box-button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 8.5px;
  font-size: 14.17px;
}
.pre-button-area {
  display: flex;
  align-items: center;
}
.pre-button-img {
  width: 23px;
  height: 23px;
  margin-right: 10px;
}
.pre-button-text {
  color: #4b5563;
  cursor: pointer;
}
.random-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83px;
  height: 34.34px;
  font-size: 14.17px;
  color: #fff;
  background-color: #4b5563;
  border-radius: 2px;
  cursor: pointer;
}
/* iframe区域 */
/* 历史切片区域 */
.history-video-area {
  margin: auto;
  .history-video-title-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .history-video-clear-button {
    align-self: flex-end;
    margin-bottom: 10px;
    font-size: 13px;
    cursor: pointer;
  }
  .history-video-title {
    font-size: 17px;
    margin: 30px 0 20px 0;
  }
  .history-video {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: space-between;
    grid-gap: 10px 20px;
    justify-items: center;
    .history-video-item {
      display: flex;
      margin-bottom: 27px;
      background-color: #f8f8f8;
      max-width: 500px;
      border-radius: 2px;
      cursor: pointer;
      .video-cover {
        width: 50%;
        min-width: 50%;
        height: 100%;
        background-color: #4b5563;
        margin-right: 1.7vw;
      }
      .video-info {
        margin: 7px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .video-title {
          font-size: 14px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .video-time {
          font-size: 13px;
        }
      }
    }
  }
}
/* 历史切片区域 */
.introduce-pc {
  background-color: #f3f4f6;
  width: calc(22.4vw - 40px);
  min-width: 300px;
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
}
</style>
