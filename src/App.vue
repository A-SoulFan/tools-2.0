<template>
  <div class="app">
    <div class="route-view">
      <vue-nav-bar
        :config="conf"
        :proj="'实用工具'"
        :activate-call-back="callback"
      ></vue-nav-bar>
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { VueNavBar } from "asf-navbar";
export default defineComponent({
  components: { VueNavBar },
  setup() {
    const route = useRouter();
    const conf = {
      elementaryBar: "实用工具",
      secondaryBars: [
        { name: "枝网查重", link: "/duplicateChecking" },
        { name: "今日溜什么", link: "/randomVideo" },
        { name: "成分姬", link: "/ingredientChecking" },
        { name: "表情包", link: "/emojicollect" },
        { name: "方言词典", link: "/zhijiangDict" },
      ],
    };
    const callback = (str: string) => {
      route.push(str);
    };
    return {
      conf,
      callback,
    };
  },
});
</script>
<style>
@font-face {
  font-family: "OPPOSan-M";
  src: url("./assets/font/OPPOSans-M.woff2");
  font-weight: normal;
  font-style: normal;
}
.app {
  font-family: "OPPOSan-M", Microsoft Yahei, Times, serif;
}
.route-view {
  padding: 0 5.83vw;
  max-width: 1180px;
  margin: auto;
}
/* 待修复后 删除  */
#navBar {
  width: 100% !important;
  position: relative !important;
}
#logo {
  width: auto !important;
}
/* 待修复后 删除  */
</style>
