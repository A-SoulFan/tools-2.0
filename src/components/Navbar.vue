<template>
  <div class="nav-area">
    <div class="elementary-nav-area">
      <div class="asf-logo">
        <img src="@/assets/Logo.svg" />
      </div>
      <div class="elementary-nav-content-area">
        <div
          class="elementary-nav-content-item"
          :class="
            data.navIndex === index ? 'elementary-nav-content-item-active' : ''
          "
          v-for="(elementary, index) in navList as { name: string }[]"
          :key="elementary.name"
          @click="selectElementary(elementary, index)"
        >{{ elementary.name }}</div>
      </div>
      <div>
        <img src="@/assets/icons/personIcon.svg" />
      </div>
    </div>
    <div class="secondary-nav-area" v-show="data.isShowSecondary">
      <div
        class="secondary-nav-content-item"
        v-for="secondary in data.secondaryList"
        :key="secondary"
        @click="selectSecondary(secondary)"
      >{{ secondary.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    navList: {
      type: Array,
    },
    title: {
      type: String,
      require: true,
    },
    subTitle: {
      type: String,
    },
    needButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop) {
    console.log(prop);
    const route = useRouter();
    const data = reactive({
      navIndex: new Number(),
      secondaryList: [] as any,
      isShowSecondary: false,
    });
    const selectElementary = (item: any, index: number) => {
      if (data.isShowSecondary && data.navIndex === index) {
        data.isShowSecondary = false;
        return;
      }
      console.log(item);
      console.log(data);
      data.secondaryList = item.secondaryList;
      data.navIndex = index;
      data.isShowSecondary = true;
    };
    const selectSecondary = (item: any) => {
      if (item.methods === "router") {
        route.push(item.link);
        data.isShowSecondary = false;
      } else {
        // TODO:外链跳转
        console.log(item);
      }
    };
    return {
      selectElementary,
      selectSecondary,
      data,
    };
  },
});
</script>

<style scoped lang="less">
@import "../../src/assets/css/keyframes.css";

.nav-area {
  background-color: #f8f8f8;
  // max-width: 1440px;
  padding: 0 5.83vw;
  // margin: auto;

  .elementary-nav-area {
    max-width: 1440px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .asf-logo {
      width: 60px;
    }
    .elementary-nav-content-area {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .elementary-nav-content-item {
      padding: 20px 5px;
      margin: 0 30px;
      font-size: 13.8px;

      cursor: pointer;
      color: #9ca3af;
      transition: background-color 0.3s ease-in;
    }
    .elementary-nav-content-item-active {
      color: #182233;
      border-bottom: 1px #182233 solid;
    }
  }
  .secondary-nav-area {
    max-width: 1440px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: Navbar-opacity 0.6s;
    .secondary-nav-content-item {
      padding: 20px 5px;
      margin: 0 30px;
      font-size: 12px;
      cursor: pointer;
      color: #9ca3af;
    }
  }
}
@media only screen and (max-width: 768px) {
}
</style>
