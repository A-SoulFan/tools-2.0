<template>
  <div class="introduce-Asoul-tip">速速点击下方头像，去B站给五小只点击关注捏</div>
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
        face: '../src/assets/image/ava.webp',
      },
      {
        name: '贝拉',
        color: '#db7d74',
        BzhanUid: 672353429,
        face: '../src/assets/image/bella.webp',

      },
      {
        name: '珈乐',
        color: '#b8a6d9',
        BzhanUid: 351609538,
        face: '../src/assets/image/carol.webp',
      },
      {
        name: '嘉然',
        color: '#e799b0',
        BzhanUid: 672328094,
        face: '../src/assets/image/diana.webp',
      },
      {
        name: '乃琳',
        color: '#576690',
        BzhanUid: 672342685,
        face: '../src/assets/image/eileen.webp',
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
.introduce-Asoul-tip {
  font-size: 15px;
  margin-bottom: 20px;
}
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
