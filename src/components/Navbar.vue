<template>
  <div class="nav-area-pc">
    <div class="elementary-nav-area">
      <div class="asf-logo">
        <img src="@/assets/Logo.svg" />
      </div>
      <div class="elementary-nav-content-area">
        <div
          v-for="(elementary, index) in navList"
          :key="elementary.name"
          class="elementary-nav-content-item"
          :class="
            data.navIndex === index ? 'elementary-nav-content-item-active' : ''
          "
          @click="selectElementary(elementary, index,'pc')"
        >
          {{ elementary.name }}
        </div>
      </div>
      <div>
        <img src="@/assets/icons/personIcon.svg" />
      </div>
    </div>
    <div v-show="data.isShowSecondary" class="secondary-nav-area">
      <div
        v-for="secondary in data.secondaryList"
        :key="secondary"
        class="secondary-nav-content-item"
        @click="selectSecondary(secondary)"
      >
        {{ secondary.name }}
      </div>
    </div>
  </div>
  <div class="nav-area-phone">
    <div class="nav-area-header">
      <div class="asf-logo">
        <img src="@/assets/Logo.svg" />
      </div>
      <div v-show="phoneMenu.phoneMenuShow" class="asf-logo" @click="changePhoneMenu('close')">
        <img src="@/assets/icons/close.svg" />
      </div>
      <div v-show="!phoneMenu.phoneMenuShow" class="asf-logo" @click="changePhoneMenu('show')">
        <img src="@/assets/icons/menu.svg" />
      </div>
    </div>
    <div v-show="phoneMenu.phoneMenuShow" class="nav-area-phone-main">
      <div class="elementary">
        <div
          v-for="(elementary, index) in navList"
          :key="elementary.name"
          class="elementary-item-box"
        >
          <div class="elementary-item">
            <div>{{ elementary.name }}</div>
            <div @click="selectElementary(elementary, index,'phone')">
              <img src="@/assets/icons/addIcon.svg" />
            </div>
          </div>
          <div v-show="phoneMenu.navIndex===index &&phoneMenu.isShowSecondary">
            <div
              v-for="item in elementary.secondaryList"
              :key="item.name"
              class="secondary-item"
              @click="selectSecondary(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
  setup() {
    const route = useRouter()
    const data = reactive({
      navIndex: 2,
      secondaryList: [] as any,
      isShowSecondary: false,
    })
    const phoneMenu = reactive({
      phoneMenuShow: false,
      navIndex: 0,
      isShowSecondary: false,
    })

    const selectElementary = (item: any, index: number, type: string) => {
      if (type === 'pc') {
        if (data.isShowSecondary && data.navIndex === index) {
          data.isShowSecondary = false
          return
        }
        if (item.link) {
          data.isShowSecondary = false
          window.open(item.link)
          return
        }
        data.secondaryList = item.secondaryList
        data.navIndex = index
        data.isShowSecondary = true
        return
      }
      if (type === 'phone') {
        if (phoneMenu.isShowSecondary && phoneMenu.navIndex === index) {
          phoneMenu.isShowSecondary = false
          return
        }
        if (item.link) {
          phoneMenu.isShowSecondary = false
          window.open(item.link)
          return
        }
        phoneMenu.navIndex = index
        phoneMenu.isShowSecondary = true
      }
    }
    const selectSecondary = (item: any) => {
      if (item.methods === 'router') {
        route.push(item.link)
        data.isShowSecondary = false
        phoneMenu.isShowSecondary = false
        phoneMenu.phoneMenuShow = false
      }
    }
    const changePhoneMenu = (type: string) => {
      if (type === 'show') {
        phoneMenu.phoneMenuShow = true
        return
      }
      if (type === 'close')
        phoneMenu.phoneMenuShow = false
    }
    return {
      selectElementary,
      selectSecondary,
      changePhoneMenu,
      data,
      phoneMenu,
    }
  },
})
</script>

<style scoped lang="less">
@import "../../src/assets/css/keyframes.css";

.nav-area-pc {
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

.nav-area-phone {
  display: none;
}
@media only screen and (max-width: 768px) {
  .nav-area-pc {
    display: none;
  }
  .nav-area-phone {
    display: block;
    padding: 20px 5.83vw;
    position: relative;
    z-index: 1000;
    width: 100%;
    position: fixed;
    background-color: #fff;
    .nav-area-header {
      display: flex;
      justify-content: space-between;
      img{
        height: 30px;
        width: auto;
      }
    }
    .nav-area-phone-main {
      position: relative;
      height: 100vh;
      .elementary{
          margin-top: 50px;
          .elementary-item-box{
          border-top: 1px solid #D1D5DB;
          }
        .elementary-item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          font-size: 16px;
          img{
            height: 16px;
          }
        }
        .secondary-item{
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 80px;
          height: 50px;
          font-size: 14px;
          border-top: 1px solid #D1D5DB;
        }
      }
    }
  }
}
</style>
