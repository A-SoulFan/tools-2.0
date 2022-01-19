<!-- 请求加载弹窗组件 -->
<template>
  <div v-if="msg!.loadingShow" class="loading">
    <img src="@/assets/Logo.svg" class="loading-icon" />
    <div class="loading-text">
      {{ msg!.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface masObj {
  loadingShow: boolean;
  title: string;
}
export default defineComponent({
  props: {
    msg: {
      type: Object as PropType<masObj>,
    },
  },
});
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  .loading-icon {
    width: 100px;
    height: 100px;
  }
  .loading-text {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 6px 15px;
  }
}
</style>
