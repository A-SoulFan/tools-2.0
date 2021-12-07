<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import toTargetUrlWithNewWindow from '@/hooks/useUtility'


export default defineComponent({
  setup() {
    const Asoul = [
      {
        name: '向晚',
        color: '#9ac8e2',
        BzhanUid: 672346917,
        face: 'https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@256w_256h_1o.webp',
      },
      {
        name: '贝拉',
        color: '#db7d74',
        BzhanUid: 672353429,
        face: 'https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg@256w_256h_1o.webp',
      },
      {
        name: '珈乐',
        color: '#b8a6d9',
        BzhanUid: 351609538,
        face: 'https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg@256w_256h_1o.webp',
      },
      {
        name: '嘉然',
        color: '#e799b0',
        BzhanUid: 672328094,
        face: 'https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@256w_256h_1o.webp',
      },
      {
        name: '乃琳',
        color: '#576690',
        BzhanUid: 672342685,
        face: 'https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg@256w_256h_1o.webp',
      },
    ]


    return {
      toTargetUrlWithNewWindow,
      Asoul
    }
  },
})
</script>

<style scoped lang="less">
.introduce-Asoul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 15px;
  .introduce-Asoul-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    cursor: pointer;
    width: 60px;
    margin: 0 2px;
  }
  .introduce-Asoul-face {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .introduce-Asoul-name {
    margin-top: 5px;
    font-size: 12px;
  }
}
@media only screen and (max-width: 768px) {
  .introduce-Asoul {
    .introduce-Asoul-item {
      width: 50px;
    }
    .introduce-Asoul-face {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
