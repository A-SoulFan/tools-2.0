<template>
  <div class="app">
    <asfNavbar :navList="navList"></asfNavbar>
    <div class="route-view">
      <div class="componts-box">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import asfNavbar from "@/components/Navbar.vue";
export default defineComponent({
  components: { asfNavbar },
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
    const navList = [
      {
        name: "用户讨论",
        secondaryList: [
          {
            name: "用户讨论二级导航",
          },
        ],
      },
      {
        name: "内容整理",
        secondaryList: [
          {
            name: "内容整理二级导航",
          },
        ],
      },
      {
        name: "实用工具",
        secondaryList: [
          { name: "枝网查重", methods: "router", link: "/duplicateChecking" },
          { name: "今日溜什么", methods: "router", link: "/randomVideo" },
          { name: "成分姬", methods: "router", link: "/ingredientChecking" },
          // { name: "表情包", methods: "router", link: "/emojicollect" },
          { name: "方言词典", methods: "router", link: "/zhijiangDict" },
        ],
      },
      {
        name: "新人指南",
        secondaryList: [
          {
            name: "新人指南二级导航",
          },
        ],
      },
    ];
    const callback = (str: string) => {
      route.push(str);
    };
    return {
      conf,
      callback,
      navList,
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
}
.componts-box {
  max-width: 1440px;
  margin: auto;
  border-top: 1px #dda19f solid;
}
</style>
