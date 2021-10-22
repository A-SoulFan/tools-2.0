<!-- 今天溜什么-->
<template>
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
    <div v-for="item in res" :key="item.id" class="item">
      <img :src="'https:' + item.url" alt="加载错误" />
      <span class="item2">
        <button class="itembutton">
          <img src="../assets/icons/coolicon.svg" class="cool" />
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import headerTitle from "../components/headerTitle.vue";
import useCurrentInstance from "@/hooks/useCurrentInstance";
export interface itemObj {
  id: string;
  url: string;
  height: string;
  width: string;
}
export default defineComponent({
  components: { headerTitle },

  setup() {
    const Title = "表情包";
    const subtitle = "你想要的表情包都在这里";
    let updateTime = ref("2021.8.26 15:00");
    const res = ref<itemObj[]>([]);
    const loading = ref(false);
    // 获取列表

    const { proxy } = useCurrentInstance();

    const getItem = async () => {
      res.value = await proxy.$request({
        url: "https://tools.asoulfan.com/emoji/",
        params: {
          page: 1,
          limit: 100,
        },
      });

      loading.value = true;
      loading.value = false;
      console.log(proxy);
    };
    getItem();
    return {
      Title,
      subtitle,
      updateTime,
      col: 4,
      loading,
      res,
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
  padding: 1px;
  -webkit-column-break-inside: avoid;
  break-inside: avoid; /*防止断点*/
  background: #ccc;
  text-align: right;
  border-radius: 3px/2.7px;
  position: relative;
}

.item2 {
  position: absoulte;
  left: 90%;
  top: 0%;
}
.item img {
  width: 100%;
}

.item h2 {
  padding: 8px 0;
}
.itembutton {
  width: 35px;
  height: 35px;
  background: #f8f8f8;
  border: none;
}
.item P {
  color: #555;
}

.cool {
  height: 75%;
  text-align: center;
}
@media screen and (min-width: 1024px) and (max-width: 1439.98px) {
  .masonry {
    width: 100%;
    columns: 4;
    column-gap: 20px;
  }
}
//ipad:

@media screen and (min-width: 768px) and (max-width: 1023.98px) {
  .masonry {
    width: 100%;
    columns: 3;
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
