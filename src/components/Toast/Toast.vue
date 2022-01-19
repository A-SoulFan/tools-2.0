<!-- 请求加载弹窗组件 -->
<template>
  <div v-if="msg!.toastShow" class="loading">
    <div class="loading-text" :class="msg!.errorToast?'error':''">
      {{ msg!.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface masObj {
  toastShow: boolean;
  title: string;
  errorToast: boolean;
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
  // background-color: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  .loading-text {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 6px 15px;
    animation: moveTop 0.3s ease-in;
  }
  .error {
    background-color: rgba(250, 141, 141);
  }
}
@keyframes moveTop {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
