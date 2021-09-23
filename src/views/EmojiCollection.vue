<!-- 今天溜什么-->
<template>
  <div>
    <header-title
      Title="表情包"
      subTitle="你想要的表情包都在这里"
    ></header-title>

    <div class="update-time-area">
      <div class="time-left">
        <img class="icon-clock" src="../assets/icons/clock.svg" />
        <div class="update-time-text">{{ "最近更新" + updateTime }}</div>
      </div>

      <button class="head-button">刷新</button>
    </div>
  </div>

  <div class="button-area">
    <button class="button">A</button>

    <button class="button">B</button>

    <button class="button">C</button>

    <button class="button">D</button>

    <button class="button">E</button>
  </div>
  <div class="block"></div>
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
      waterfallFlowHeight: [300, 300],
    });
    const waterfallFlowFun = () => {
      const dom = document.querySelectorAll(".col");
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
  display: inline-flex;
  margin-top: 23.5px;
  margin-bottom: 25px;
  /* height: 30px; */
  align-items: center;
}
.time-left {
  display: block;
  float: left;
  width: 100px;
  height: 40px;
  position: absolute;
}

.icon-clock {
  width: 12px;
  height: 12px;
  margin-right: 2px;
}
.update-time-text {
  display: inline;
  font-size: 12px;
  color: #4b5563;
}

.head-button {
  position: absolute;
  right: 100px;
  height: 60px;
  /* 0 */
  background: #fff;
  border: none;
  font-size: 15px;
  font-family: OPPOSans;
  font-style: normal;
  font-weight: 400;
  line-height: 53px;
  letter-spacing: 0em;
  text-align: center;
}
.block {
  width: 100%;
  height: 20px;
}
.app-mains {
  position: relative;
  left: 100px;
  top: 100px;
}
.button-area {
  display: flex;
  justify-content: space-around;
}
.button {
  position: float;
  width: 60px;
  height: 60px;
  left: 63px;
  top: 573px;
  /* 0 */
  background: #f8f8f8;
  border: none;
  font-size: 20px;
}
.container {
  display: inline;
}
</style>
