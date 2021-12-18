<template>
  <div :class="$style.navAreaPc">
    <div :class="$style.elementaryNavArea">
      <div :class="$style.asfLogo" @click="toASFHome()">
        <img src="@/assets/Logo.svg" />
      </div>
      <div :class="$style.elementaryNavContentArea">
        <div
          v-for="(elementary, index) in navList "
          :key="elementary.name"
          :class="
          [$style.elementaryNavContentItem, data.navIndex === index ? $style.elementaryNavContentItemActive : '']"
          @click="selectElementary(elementary, index, 'pc')"
        >{{ elementary.name }}</div>
      </div>
      <!-- <div>
        <img src="@/assets/icons/personIcon.svg" />
      </div>-->
    </div>
    <div v-show="data.isShowSecondary" :class="$style.secondaryNavArea">
      <div
        v-for="secondary in data.secondaryList"
        :key="secondary"
        :class="$style.secondaryNavContentItem"
        @click="selectSecondary(secondary)"
      >{{ secondary.name }}</div>
    </div>
  </div>

  <div :class="$style.navAreaPhone">
    <div :class="$style.navAreaHeader">
      <div :class="$style.asfLogo" @click="toASFHome()">
        <img src="@/assets/Logo.svg" />
      </div>
      <!-- <div
        v-show="phoneMenu.phoneMenuShow"
        :class="$style['asf-logo']"
        @click="changePhoneMenu('close')"
      >
        <img src="@/assets/icons/close.svg" />
      </div>-->
      <div :class="$style.asfLogo" @click="changePhoneMenu('show')">
        <img src="@/assets/icons/menu.svg" />
      </div>
    </div>
    <div
      @click="changePhoneMenu('close')"
      :class="[$style.muneBehind, phoneMenu.phoneMenuShow ? $style.muneBehindShow : '']"
    ></div>
    <div :class="[$style.navPhoneMain, phoneMenu.phoneMenuShow ? $style.navPhoneMainShow : '']">
      <img
        @click="changePhoneMenu('close')"
        :class="$style.MenuIcon"
        src="@/assets/icons/menu.svg"
      />

      <div :class="$style.elementary">
        <div v-for="(elementary ,index) in navList" :key="elementary.name">
          <div>
            <div :class="$style.elementaryItem">
              <div :class="$style.elementaryItemName">{{ elementary.name }}</div>
              <div
                :class="[$style.elementaryItemIcon, (phoneMenu.navIndex === index && phoneMenu.isShowSecondary) ? $style.elementaryItemIconRotate : '']"
                @click="selectElementary(elementary, index, 'phone')"
                v-if="elementary?.secondaryList?.length > 0"
              >
                <img src="@/assets/icons/arrow.svg" />
              </div>
            </div>

            <div
              :class="[$style.secondaryItemBox, (phoneMenu.navIndex === index && phoneMenu.isShowSecondary) ? $style.secondaryItemBoxShow : '']"
            >
              <div
                v-for="item in elementary.secondaryList"
                :key="item.name"
                :class="$style.secondaryItem"
                @click="selectSecondary(item)"
              >{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    navList: {
      type: Array as PropType<{ name: string, secondaryList: any[] }[]>,
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
      isShowSecondary: true,
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
      if (type === 'close') phoneMenu.phoneMenuShow = false
    }

    const toASFHome = () => {
      window.open("https://asoulfan.com/")

    }
    return {
      selectElementary,
      selectSecondary,
      changePhoneMenu,
      toASFHome,
      data,
      phoneMenu,
    }
  },
})
</script>

<style  lang="less" module>
@import "../../src/assets/css/keyframes.css";

.navAreaPc {
  background-color: rgba(248, 248, 248, 0.8);
  backdrop-filter: blur(10px);
  padding: 0 5.83vw;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  .elementaryNavArea {
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .asfLogo {
      width: 80px;
      cursor: pointer;
    }
    .elementaryNavContentArea {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .elementaryNavContentItem {
      padding: 20px 25px;
      margin: 0 10px;
      font-size: 13.8px;
      cursor: pointer;
      color: #9ca3af;
      transition: color 0.3s ease-out;
    }
    .elementaryNavContentItem:hover{
        color: #1f2937;
    }
    .elementaryNavContentItemActive {
      color: #182233;
      border-bottom: 1px #182233 solid;
    }
  }
  .secondaryNavArea {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: Navbar-opacity 0.6s;
    .secondaryNavContentItem {
      padding: 20px 25px;
      margin: 0 10px;
      font-size: 12px;
      cursor: pointer;
      color: #9ca3af;
    }
    .secondaryNavContentItem:hover{
      color: #1f2937;
    }
  }
}

.navAreaPhone {
  display: none;
}
@media only screen and (max-width: 768px) {
  .navAreaPc {
    display: none;
  }
  .navAreaPhone {
    display: block;
    padding: 20px 5.83vw;
    z-index: 1000;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #fff;

    .navAreaHeader {
      display: flex;
      justify-content: space-between;
      img {
        height: 20px;
        width: auto;
      }
    }
    .navPhoneMain {
      position: fixed;
      right: -768px;
      top: 0;
      z-index: 1001;
      height: 100vh;
      overflow-y: scroll;
      width: 80%;
      max-width: 375px;
      min-width: 200px;
      padding: 20px;
      background-color: #f5f5f5;
      transition: all 0.5s cubic-bezier(0.15, 0.85, 0.35, 1);

      .MenuIcon {
        height: 20px;
        width: auto;
      }
      .elementary {
        margin: 10px -20px;
        .elementaryItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          font-size: 16px;
          .elementaryItemName {
            margin-left: 20px;
          }
          .elementaryItemIcon {
            margin-right: 20px;
            height: 15px;
            transform: rotate(0);
            transition: transform 0.2s;
          }
          .elementaryItemIconRotate {
            transform: rotate(180deg);
          }
        }

        .secondaryItemBox {
          display: none;
          height: 0;
          max-height: 0;
          background-color: #fff;
          transition: max-height 0.3s;
        }
        .secondaryItemBoxShow {
          display: block;
          height: auto;
          max-height: 1000px;
        }
        .secondaryItem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 80px;
          height: 50px;
          font-size: 14px;
          border-bottom: 1px solid #f1f2f3;
        }
      }
    }
    ::-webkit-scrollbar {
      width: 6px;

      height: 5px;
    }
    .navPhoneMainShow {
      right: 0;
    }
    .muneBehind {
      width: 100%;
      height: 100%;
      right: -700px;
      background-color: rgb(0, 0, 0);
      position: fixed;
      top: 0;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s linear;
    }
    .muneBehindShow {
      opacity: 0.4;
      right: 0;
    }
  }
}
</style>
