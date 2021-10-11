<!-- 今天溜什么-->
<template>
  <div>
    <header-title Title="今天溜什么" subTitle="相见即是缘份"></header-title>
    <div class="update-time-area">
      <img class="icon-clock" src="../assets/icons/clock.svg" />
      <div class="update-time-text">{{ "最近更新" + updateTime }}</div>
    </div>
    <div class="iframe-box">
      <iframe :src="video.play_url"></iframe>
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
        <!-- <div class="history-video-clear-button" @click="clearHistory">
          清除历史
        </div> -->
      </div>
      <div class="history-video">
        <div
          class="history-video-item"
          v-for="(item, index) in historyVideoList"
          :key="index"
          @click="selectVideo(item)"
        >
          <div class="video-cover">
            <img :src="item.imgsrc" crossorigin="anonymous" />
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
import headerTitle from "../components/headerTitle.vue";
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
    const video = ref({
      title: String,
      cover: String,
      time: String,
      play_url: String,
      bv: String,
    });
    // TODO: 未拿取
    let updateTime = ref("2021.8.26 15:00");
    let currentVideoIndex = 0;
    const { proxy } = useCurrentInstance();

    const getRandomVideo = async () => {
      const res = await proxy.$request("api/stroll/random");
      res.time = new Date().toLocaleString("chinese", { hour12: false });
      currentVideoIndex = 0;
      video.value = res;
      let tempObj = {
        title: video.value.title,
        imgsrc:
          video.value.cover ||
          "https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg",
        time: video.value.time,
        play_url: "https:" + video.value.play_url,
        bv: video.value.bv,
      };
      // 长度保持在二十条
      if (historyVideoList.length >= 20) {
        historyVideoList.pop();
      }
      historyVideoList.unshift(tempObj);
      localStorage.setItem(
        "historyVideoList",
        JSON.stringify(historyVideoList)
      );
    };
    const preVideo = () => {
      currentVideoIndex++;
      video.value = historyVideoList[currentVideoIndex];
    };
    const selectVideo = (item: videoObj) => {
      window.open("https://www.bilibili.com/video/" + item.bv);
    };
    // TODO: 待做 清除历史有严重bug
    // const clearHistory = () => {
    //   localStorage.setItem("historyVideoList", JSON.stringify([]));
    //   historyVideoList = [];
    // };
    getRandomVideo();
    return {
      updateTime,
      historyVideoList,
      video,
      getRandomVideo,
      preVideo,
      currentVideoIndex,
      selectVideo,
      // clearHistory,
    };
  },
});
</script>

<style scoped lang="less">
.update-time-area {
  display: flex;
  margin-top: 23.5px;
  margin-bottom: 25px;
  /* height: 30px; */
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
  max-width: 1200px;
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
  max-width: 1200px;
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
