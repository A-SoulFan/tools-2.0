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
    let updateTime = ref("2021.8.26 15:00");
    return {
      Title,
      subtitle,
      updateTime,
    };
  },
});
</script>

<style scoped>
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
}
.iframe-box > iframe {
  width: 100%;
  height: 57.59vw;
  border: none;
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
</style>
