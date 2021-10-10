<!-- 今天溜什么-->
<template>
  <div class="block"></div>
  <div class="block"></div>
  <div class="block"></div>
  <div class="block"></div>
  <div>
    <header-title
      Title="表情包"
      subTitle="你想要的表情包都在这里"
    ></header-title>
    <div class="block"></div>
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
  <div class="masonry" id="app-mains">
    <div class="item">
      <div class="card">
        <div class="card-body">
          <p class="card-text">long</p>
        </div>
      </div>
    </div>
    <div v-for="item in listone" :key="item.data">
      <a> <img :src="item.img" /> </a>
    </div>
    <div class="item">
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
    <div class="item">
      <div class="card">
        <div class="card-body">
          <img class="img" src="../assets/icons/user.png" />
          <p class="card-text">long</p>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="card">
        <div class="card-body">
          <p class="card-text">This is a short card.</p>
        </div>
      </div>
    </div>
    <div class="item">
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
    <div class="item">
      <div class="card">
        <div class="card-body">
          <p class="card-text">This is a short card.</p>
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
    const Title = "表情包";
    const subtitle = "你想要的表情包都在这里";
    let updateTime = ref("2021.8.26 15:00");

    return {
      Title,
      subtitle,
      updateTime,
      listone: [
        { data: "1", img: require("../assets/icons/user.png") },
        { data: "1", img: require("../assets/icons/user.png") },
      ],
    };
  },
  mounted() {
    // 假设apiArr是我们发请求后端返回的数据，里面的imgTitle属性存储的是图片的名字
    // 通过require关键字引入，会自动到指定路径下的文件中寻找对应的图片文件加载出来
    this.listone = [
      {
        data: "1",
        img: "../assets/icons/user.png",
      },
    ];
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
.masonry {
  width: auto; // 默认宽度
  margin: 20px auto; // 剧中
  columns: 4; // 默认列数
  column-gap: 30px; // 列间距
}

.item {
  width: 100%;
  break-inside: avoid;
  margin-bottom: 30px;
}

.item img {
  width: 100%;
}

.item h2 {
  padding: 8px 0;
}

.item P {
  color: #555;
}
@media screen and (min-width: 1024px) and (max-width: 1439.98px) {
  .masonry {
    width: 100%;
    columns: 3;
    column-gap: 20px;
  }
}
//ipad:

@media screen and (min-width: 768px) and (max-width: 1023.98px) {
  .masonry {
    width: 100%;
    columns: 2;
    column-gap: 20px;
  }
}
//mobile:

@media screen and (max-width: 767.98px) {
  .masonry {
    width: 100%;
    columns: 2;
  }
}
</style>
