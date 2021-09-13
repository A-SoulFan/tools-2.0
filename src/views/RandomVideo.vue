<!-- 今天溜什么-->
<template>
  <div>
    <header-title Title="今天溜什么" subTitle="相见即是缘份"></header-title>
    <div class="update-time-area">
      <img class="icon-clock" src="../assets/icons/clock.svg" />
      <div class="update-time-text">{{ "最近更新" + updateTime }}</div>
    </div>
    <div class="iframe-box">
      <iframe src=""></iframe>
      <div class="iframe-box-button-area">
        <div class="pre-button-area">
          <img class="pre-button-img" src="../assets/icons/cube.svg" />
          <div class="pre-button-text">回到上一条视频</div>
        </div>
        <div class="random-button">随便看看</div>
      </div>
    </div>
    <div class="history-video-area">
      <div class="history-video-title">历史记录</div>
      <div class="history-video">
        <div
          class="history-video-item"
          v-for="(item, index) in historyVideoList"
          :key="index"
        >
          <div class="video-cover">
            <img :src="item.imgsrc" crossorigin="anonymous" />
          </div>

          <div class="video-info">
            <div class="video-title">
              {{
                "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题"
              }}
            </div>
            <div class="video-time">时间</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import headerTitle from "../components/headerTitle.vue";
export default defineComponent({
  components: { headerTitle },
  setup() {
    const Title = "今天溜什么";
    const subtitle = "相见即是缘份";
    let historyVideoList = [
      {
        title: "标题1",
        imgsrc:
          "https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg",
      },
      {
        title: "标题2",
        imgsrc:
          "https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg",
      },
      {
        title: "标题3",
        imgsrc:
          "https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg",
      },
    ];
    let updateTime = ref("2021.8.26 15:00");
    return {
      Title,
      subtitle,
      updateTime,
      historyVideoList,
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
}
.random-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83px;
  height: 34.34px;
  color: #fff;
  background-color: #4b5563;
  border-radius: 2px;
}
/* iframe区域 */
/* 历史切片区域 */
.history-video-area {
  max-width: 1200px;
  margin: auto;
  .history-video-title {
    font-size: 17px;
    margin: 30px 0 20px 0;
  }
  .history-video {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: space-between;
    grid-gap: 10px 20px;

    .history-video-item {
      display: flex;
      height: 26.11vw;
      // margin: 0 20px 27px auto;
      margin-bottom: 27px;
      background-color: #f8f8f8;
      max-height: 100px;
      border-radius: 2px;
      .video-cover {
        width: 50%;
        min-width: 50%;
        height: 100%;
        background-color: #4b5563;
        margin-right: 2.7vw;
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
