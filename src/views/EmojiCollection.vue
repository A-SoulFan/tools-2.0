<!-- 今天溜什么-->
<template>
  <div>
    <header-title
      Title="表情包"
      subTitle="你想要的表情包都在这里"
      buttonType="arrow"
    ></header-title>
    <div class="update-time-area">
      <img class="icon-clock" src="../assets/icons/clock.svg" />
      <div class="update-time-text">{{ "最近更新" + updateTime }}</div>
    </div>
  </div>
  <div class="box">
    <img
      class="img"
      src="https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg"
    />
    <div class="desc">Description</div>
  </div>

  <div class="row f12" id="app-mains">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <p class="card-text">long</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <img
            class="img"
            src="https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg"
          />
          <p class="card-text">This is a short card.</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <img class="img" src="../assets/icons/user.png" />
          <p class="card-text">long</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <p class="card-text">This is a short card.</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <img
            class="img"
            src="https://i0.hdslb.com/bfs/archive/98960a5e093927721117219f1caf6362bbd76d22.jpg"
          />
          <p class="card-text">long</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <p class="card-text">This is a short card.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import headerTitle from "../components/headerTitle.vue";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
interface waterfallFlow {
  waterfallFlowHeight: Array<number>;
}
export default defineComponent({
  components: { headerTitle },
  setup() {
    const Title = "表情包";
    const subtitle = "你想要的表情包都在这里";
    let updateTime = ref("2021.8.26 15:00");

    const state: waterfallFlow = reactive({
      waterfallFlowHeight: [420, 420, 1200],
    });
    const waterfallFlowFun = () => {
      const dom = document.querySelectorAll(".col-6");
      dom.forEach((item: any) => {
        item.style.position = "absolute";
        const minIndex = filterMin();
        item.style.top = state.waterfallFlowHeight[minIndex] + 10 + "px";
        item.style.left = minIndex * (100 / 2) + "%";
        state.waterfallFlowHeight[minIndex] +=
          item.querySelector(".card").offsetHeight + 10;
      });
    };
    const filterMin = () => {
      const min = Math.min.apply(null, state.waterfallFlowHeight);
      return state.waterfallFlowHeight.indexOf(min);
    };
    const _isMobile = () => {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    };

    onMounted(() => waterfallFlowFun());
    return {
      Title,
      subtitle,
      updateTime,
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
.app-mains {
  position: relative;
  left: 100px;
  top: 100px;
}
.col-6 {
  position: relative;
  padding-left: 10;
  padding-right: 10;
  margin-top: 12;
}
/* 历史切片区域 */
</style>
