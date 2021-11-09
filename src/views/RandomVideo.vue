<!-- 今天溜什么-->
<template>
  <div>
    <header-title
      Title="今天溜什么"
      subTitle="相见即是缘份"
      needButton="{{false}}"
    ></header-title>
    <div class="update-time-area">
      <img class="icon-clock" src="../assets/icons/clock.svg" />
      <div class="update-time-text">{{ "最近更新" + updateTime }}</div>
    </div>
    <div class="iframe-box">
      <iframe :src="iframeUrl"></iframe>
      <div class="iframe-box-button-area">
        <div class="pre-button-area">
          <img class="pre-button-img" src="../assets/icons/cube.svg" />
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
          class="history-video-item"
          v-for="(item, index) in historyVideoList"
          :key="index"
          @click="selectVideo(item)"
        >
          <div class="video-cover">
            <img :src="item.imgsrc" />
          </div>

          <div class="video-info">
            <div class="video-title">
              {{ item.title }}
            </div>
            <div class="video-time">观看时间：{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import headerTitle from "../components/HeaderTitle.vue";
import useCurrentInstance from "@/hooks/useCurrentInstance";

interface videoObj {
  title: string;
  cover: string;
  time: string;
  play_url: string;
  bv: string;
}

export default defineComponent({
  components: { headerTitle },
  setup() {
    let historyVideoList: any[] = JSON.parse(
      localStorage.getItem("historyVideoList") || JSON.stringify([])
    );
    let iframeUrl = ref("");
    // TODO: 未拿取
    let updateTime = ref("2021.8.26 15:00");
    let currentVideoIndex = 0;
    const { proxy } = useCurrentInstance();

    const getRandomVideo = async () => {
      const res = await proxy.$request({
        url: "/api/stroll/random",
      });
      // debugger;
      res.time = new Date().toLocaleString("chinese", { hour12: false });
      currentVideoIndex = 0;
      res.play_url = "https:" + res.play_url;
      iframeUrl.value = res.play_url;
      // 长度保持在二十条
      if (historyVideoList.length >= 20) {
        historyVideoList.pop();
      }
      historyVideoList.unshift({
        title: res.title,
        imgsrc: res.cover || "",
        time: res.time,
        play_url: res.play_url,
        bv: res.bv,
      });
      localStorage.setItem(
        "historyVideoList",
        JSON.stringify(historyVideoList)
      );
    };
    const preVideo = (): void => {
      currentVideoIndex++;
      iframeUrl.value = historyVideoList[currentVideoIndex].play_url;
    };
    const selectVideo = (item: videoObj): void => {
      window.open("https://www.bilibili.com/video/" + item.bv);
    };
    getRandomVideo();
    return {
      updateTime,
      historyVideoList,
      currentVideoIndex,
      iframeUrl,
      getRandomVideo,
      preVideo,
      selectVideo,
    };
  },
});
</script>

<style scoped lang="less">
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
</style>
