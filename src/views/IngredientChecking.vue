<template>
  <div class="pc-container">
    <header class="pc-header">
      <img class="asf-img" src="../assets/icons/ASF_black.png" />
      <ul class="pc-nav">
        <li class="pc-nav-option"><a href="#">用户讨论</a></li>
        <li class="pc-nav-option"><a href="#">内容整理</a></li>
        <li class="pc-nav-option"><a href="#">实用工具</a></li>
        <li class="pc-nav-option"><a href="#">新人指南</a></li>
      </ul>
      <div class="pc-nav-right">
        <img class="search-img" src="../assets/icons/search.png" />
        <img class="user-img" src="../assets/icons/user.png" />
      </div>
    </header>
    <span class="pc-title">成分姬</span>
    <span class="pc-introduce">帮助你快速分析用户成分</span>
    <div class="pc-component-box">
      <div class="pc-content-box">
        <div class="pc-input-box">
          <input placeholder="请输入B站用户名或者UID~" @input="hasContent" />
          <span
            :class="['pc-btn-search', { 'pc-active': flags.isActive }]"
            @click="search(), onInputBtnContent()"
            >{{ initialData.btnContent }}</span
          >
        </div>
        <div class="pc-tips-box" v-if="flags.isSearched">
          <span class="pc-tips-font">TA关注的VUP有</span>
          <span class="pc-tips-button">
            <img class="pc-tips-img" src="/img/link.473ec6ef.png" />
            复制结果
          </span>
        </div>
        <div class="pc-result-box">
          <template v-if="flags.isSearched">
            <IngredientCheckingResult
              v-for="(user, idx) in userList"
              :user="user"
              :key="idx"
            ></IngredientCheckingResult>
          </template>
        </div>
      </div>
      <div class="pc-details">
        <p class="pc-details-title">功能介绍</p>
        <div
          class="pc-content-range"
          v-for="(content, index) in contents"
          :key="index"
        >
          <span class="content">{{ content.span1 }}</span>
          <span class="content">{{ content.span2 }}</span>
        </div>
        <div class="pc-foot-nav">
          <div class="left">
            <img src="../assets/icons/github-outline.png" />
            <a href="#"><span>查重接口开源仓库</span></a>
          </div>
          <div class="right">
            <img src="../assets/icons/bilibili-fill.png" />
            <a href="#"><span>查重接口反馈</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--手机端-->
  <div class="mobile-container">
    <div class="mobile-container-header">
      <img class="asf-img" src="../assets/icons/ASF_black.png" />
      <img class="more-options-img" src="../assets/icons/moreOptions.png" />
    </div>
    <!--手机端title-->
    <div class="mobile-header">
      <span class="mobile-title">成分姬</span>
      <span class="mobile-subtitle">
        <span class="left">帮助你快速分析用户成分</span>
        <div class="right">
          <span class="fold-content">{{ initialData.foldBtnContent }}</span>
          <img
            class="arrow-img"
            src="../assets/icons/arrow.svg"
            @click="onUnfoldBtnClick"
            :class="[flags.foldBtnState ? 'is-rotated' : 'recover-rotated']"
          />
        </div>
      </span>
    </div>
    <div class="mobile-details" v-show="flags.foldBtnState">
      <div
        class="mobile-content-range"
        v-for="(content, index) in contents"
        :key="index"
      >
        <span class="content">{{ content.span1 }}</span>
        <span class="content">{{ content.span2 }}</span>
      </div>
    </div>
    <!--输入区-->
    <div class="mobile-input-box">
      <input placeholder="A-SOUL_Official" @input="hasContent" />
      <div class="mobile-copy-percentage">
        <span
          :class="['mobile-btn-search', { 'mobile-active': flags.isActive }]"
          @click="search(), onInputBtnContent()"
          >{{ initialData.btnContent }}</span
        >
      </div>
    </div>
    <div class="mobile-tips-box" v-if="flags.isSearched">
      <span class="mobile-tips-font">TA关注的VUP有</span>
      <span class="mobile-tips-button">
        <img class="mobile-tips-img" src="/img/link.473ec6ef.png" />
        复制结果
      </span>
    </div>
    <div class="mobile-result-box">
      <template v-if="flags.isSearched">
        <IngredientCheckingResult
          v-for="(user, idx) in userList"
          :user="user"
          :key="idx"
        ></IngredientCheckingResult>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import IngredientCheckingResult from "../components/IngredientCheckingResult";
import headerTitle from "../components/headerTitle.vue";
export default {
  name: "IngredientChecking",
  components: { IngredientCheckingResult },
  setup() {
    let contents = [
      {
        span1: "比对库内容范围:",
        span2: "B站动态,视频评论区（仅限A-Soul的六个官方账号）",
      },
      {
        span1: "比对库时间范围:",
        span2: "2020/11/23 21:18:26 至 2021/08/27 11:58:39",
      },
      {
        span1: "参考文献:",
        span2: "[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学",
      },
    ];
    let userList = [
      {
        username: "乃琳Queen",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "喜欢听你说，开心和不开心的，都告诉我吧~",
        pictureUrl: "/img/link.473ec6ef.png",
      },
      {
        username: "嘉然今天吃什么",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "这里是嘉然！别看我小小的，我超能吃还超可爱的哦~",
        pictureUrl: "/img/link.473ec6ef.png",
      },
      {
        username: "珈乐Carol",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "嘘，请听我为你歌唱……",
        pictureUrl: "/img/link.473ec6ef.png",
      },
      {
        username: "贝拉kira",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "元气满满的A-SOUL舞担参上~目标TOP IDOL，一起加油！",
        pictureUrl: "/img/link.473ec6ef.png",
      },
      {
        username: "向晚大魔王",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "关注...也不是不可以啦！",
        pictureUrl: "/img/link.473ec6ef.png",
      },
      {
        username: "向晚大魔王",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "关注...也不是不可以啦！",
        pictureUrl: "/img/link.473ec6ef.png",
      },
      {
        username: "怪味毛玉",
        description: "虚拟偶像团体A-SOUL 所属艺人",
        sign: "关注...也不是不可以啦！",
        pictureUrl: "/img/link.473ec6ef.png",
      },
    ];
    let initialData = reactive({
      maxLength: 1000,
      foldBtnContent: "详情",
      btnContent: "查询结果",
      contentLength: 0, //textarea中的字数
      totalIngredientCheckingRate: 0, //总复制比
    });
    let flags = reactive({
      isSearched: false,
      isActive: false, //按钮是否是激活态
      foldBtnState: false, //展开按钮的状态
    });
    //方法
    //检测textarea中是否有内容以及内容长度
    function hasContent(e) {
      flags.isActive = e.target.value !== ""; //如果不为空，isActive就是true
      initialData.contentLength = e.target.value.length;
      // console.log(e.target.value.length); //无响应，说明没有设置响应式
      //text内容不为空并且已经进行过搜索，那么只要输入东西就算改变内容
      if (e.target.value !== "" && flags.isSearched === true) {
        initialData.btnContent = "查询结果";
      }
    }
    //搜索按钮功能
    function search() {
      if (initialData.contentLength != 0) {
        flags.isSearched = true; //只要点击搜索并且内容不为空
        initialData.totalIngredientCheckingRate = maxDuplicate(); //设定重复率，值为data数组中重复率最大的一个
      }
    }
    //控制查重条长度
    function lineProgress() {
      return `width:${initialData.totalIngredientCheckingRate}%`;
    }
    //排序出userList中查重率最高的一个
    function maxDuplicate() {
      let max = 0;
      userList.map((value) => {
        if (max < value.duplicateCheckingRate) {
          max = value.duplicateCheckingRate;
        }
      });
      return max;
    }
    //点击搜索过后，按钮变成复制报告
    function onInputBtnContent() {
      if (flags.isSearched === true) {
        //如果进行过搜索
        initialData.btnContent = "复制报告";
      }
    }
    function onUnfoldBtnClick() {
      flags.foldBtnState = !flags.foldBtnState; //状态翻转
      if (flags.foldBtnState === true) {
        initialData.foldBtnContent = "收起"; //设置内容变为收起
      } else {
        initialData.foldBtnContent = "详情"; //设置内容变为收起
      }
    }
    return {
      contents,
      userList,
      flags,
      initialData,
      hasContent,
      search,
      lineProgress,
      maxDuplicate,
      onInputBtnContent,
      onUnfoldBtnClick,
    };
  },
};
</script>

<style scoped>
/*pc端*/
@media (min-width: 1000px) {
  .mobile-container {
    display: none;
  }
  .pc-container {
    width: 1600px;
  }
  .pc-header {
    display: flex;
    background-color: rgb(248, 248, 248);
    height: 100px;
    width: 1500px;
    justify-content: space-between;
    margin: 0 auto;
  }
  .asf-img {
    width: 126px;
    height: 100px;
  }
  .pc-nav {
    display: flex;
  }
  .pc-nav .pc-nav-option a {
    text-decoration: none;
    color: #9ca3af;
    font-size: 16px;
    font-weight: 400;
    line-height: 100px;
    justify-content: center;
    padding: 30px;
  }
  .pc-nav-option:hover {
    background-color: rgb(229, 229, 229);
  }
  .pc-nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pc-nav-right img {
    height: 30px;
    width: 30px;
    padding-left: 50px;
  }
  .pc-title {
    font-size: 48px;
    display: block;
    padding-top: 60px;
    margin-left: 50px;
  }
  .pc-introduce {
    padding-top: 9px;
    display: block;
    font-size: 24px;
    margin-left: 50px;
  }
  .pc-component-box {
    display: flex;
    margin: 0 auto;
    position: relative;
    justify-content: flex-start;
  }
  .pc-content-box {
    display: flex;
    margin: 0 auto;
    position: relative;
    flex-direction: column;
  }
  .pc-input-box input {
    width: 950px;
    height: 50px;
    border: 2px solid #d1d5db;
    resize: none;
    outline: none;
    padding: 10px;
    font-size: 18px;
    box-sizing: border-box;
  }
  .pc-input-box input::placeholder {
    color: #d1d5db;
  }
  .pc-input-box {
    display: flex;
    margin: 0 auto;
    position: relative;
    justify-content: flex-start;
    margin-left: 50px;
  }
  .pc-tips-box {
    display: flex;
    width: 1050px;
    margin-left: 50px;
    margin-right: auto;
  }
  .pc-tips-font {
    font-size: 24px;
    display: flex;
    justify-content: flex-start;
  }
  .pc-tips-box img {
    height: 30px;
    width: 30px;
  }
  .pc-tips-button {
    font-size: 20px;
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .pc-result-box {
    display: flex;
    margin: 0 auto;
    flex-flow: row wrap;
  }
  .pc-details {
    display: flex;
    flex-flow: column wrap;
    height: 330px;
    width: 500px;
    background-color: #f8f8f8;
    padding: 10px;
    float: right;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .pc-details .pc-details-title {
    font-weight: 400;
    font-size: 24px;
  }
  .pc-content-range {
    margin: 15px 0;
  }
  .pc-content-range .content {
    display: -webkit-box;
    max-height: 42px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
  }
  .pc-foot-nav img {
    width: 30px;
    height: 30px;
  }
  .pc-foot-nav {
    font-size: 20px;
  }
  .pc-foot-nav a {
    text-decoration: none;
    color: #374151;
  }
  .pc-foot-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .pc-foot-nav > .left > img {
    margin-right: 10px;
  }
  .pc-foot-nav > .right > img {
    margin-right: 10px;
  }
  .pc-btn-search {
    display: inline-block;
    cursor: pointer;
    border: 1px solid rgb(229, 229, 229);
    height: 50px;
    width: 100px;
    text-align: center;
    line-height: 50px;
    background-color: rgb(156, 163, 175);
    color: white;
    font-size: 18px;
  }
  .pc-active {
    display: inline-block;
    border: 1px solid rgb(229, 229, 229);
    height: 50px;
    width: 100px;
    text-align: center;
    line-height: 50px;
    background-color: #4b5563;
    color: white;
  }
}

/*手机端*/
@media only screen and (max-width: 1000px) {
  .pc-container {
    display: none;
  }
  .mobile-container {
    width: 100%;
  }
  .mobile-container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mobile-container-header .asf-img {
    width: 75px;
    height: 75px;
  }
  .mobile-container-header .more-options-img {
    width: 25px;
    height: 25px;
  }
  .mobile-container-header .more-options-img:hover {
    cursor: pointer;
  }
  .mobile-details {
    display: inline-block;
    height: 210px;
    width: 100%;
    background-color: #f8f8f8;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .mobile-content-range {
    margin: 10px 0;
  }
  .mobile-content-range .content {
    display: -webkit-box;
    max-height: 42px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
  }
  .mobile-title {
    display: block;
    font-size: 34px;
  }
  .mobile-subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
  }
  .mobile-subtitle .left {
    display: block;
  }
  .mobile-subtitle .right {
    display: flex;
    align-items: center;
  }
  .mobile-subtitle .arrow-img {
    width: 25px;
    height: 25px;
    margin-left: 5px;
  }
  /*翻转展开图标*/
  .is-rotated {
    transform: rotate(180deg);
    transition: linear 0.2s;
  }

  .recover-rotated {
    transform: rotate(0);
    transition: linear 0.2s;
  }
  .mobile-input-box {
    margin-top: 20px;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .mobile-input-box input {
    width: 65%;
    height: 40px;
    border: 2px solid #d1d5db;
    resize: none;
    outline: none;
    padding: 10px;
    font-size: 14px;
    box-sizing: border-box;
  }
  .mobile-tips-box {
    display: flex;
  }
  .mobile-tips-font {
    display: flex;
    justify-content: flex-start;
  }
  .mobile-tips-img {
    width: 15px;
    height: 15px;
  }
  .mobile-tips-button {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
  }
  .pc-input-box textarea::placeholder {
    color: #d1d5db;
  }
  /*查重条*/
  .mobile-copy-percentage {
    width: 35%;
    height: 40px;
  }
  .mobile-btn-search {
    display: inline-block;
    cursor: pointer;
    border: 1px solid rgb(229, 229, 229);
    height: 38px;
    width: 100px;
    text-align: center;
    line-height: 38px;
    background-color: rgb(156, 163, 175);
    color: white;
    font-size: 16px;
  }
  .progress-bar > .bottom-bar > .top-bar {
    display: inline-block;
    height: 5px;
    /*width: 70%;*/
    background-color: rgb(75, 85, 99);
    position: absolute;
    left: 0;
  }
  .mobile-active {
    display: inline-block;
    border: 1px solid rgb(229, 229, 229);
    height: 36px;
    width: 100px;
    text-align: center;
    line-height: 36px;
    background-color: #4b5563;
    color: white;
  }
  .mobile-result-box {
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto;
  }
}
</style>
