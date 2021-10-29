<!-- 请求加载弹窗组件 -->
<template>
  <div class="loading" v-if="msg.loadingShow">
    <img src="@/assets/Logo.svg" class="loading-icon" />
    <div class="loading-text">{{ msg.title }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: Object,
  },
});
</script>

<style lang="less">
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  .loading-icon {
    width: 20px;
    height: 20px;
  }
  .loading-text {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 6px 15px;
  }
}
</style>
