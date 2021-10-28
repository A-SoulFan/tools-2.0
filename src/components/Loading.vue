<template>
  <div class="loading" v-if="msg.loadingShow">
    <div>{{ msg.title }}</div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

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
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  div {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 6px 15px;
  }
}
</style>
