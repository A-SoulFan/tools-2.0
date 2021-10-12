<template>
  <div class="pc-container">
    <header class="pc-header">
      <img class="asf-img" src="../assets/icons/ASF_black.png" />
      <div class="pc-nav-right">
        <img class="search-img" src="../assets/icons/search.png" />
        <img class="user-img" src="../assets/icons/user.png" />
      </div>
    </header>
    <span class="pc-title">枝网查重</span>
    <span class="pc-introduce">帮你快速识别原创小作文</span>
    <div class="pc-input-box">
      <textarea
        placeholder="在这里输入小作文哦~"
        @input="hasContent"
      ></textarea>
      <span class="total-word-num"
        >总字数:{{ initialData.contentLength }}/{{
          initialData.maxLength
        }}</span
      >
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
            <a
              href="https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md"
              ><span>查重接口开源仓库</span></a
            >
          </div>
          <div class="right">
            <img src="../assets/icons/bilibili-fill.png" />
            <a href="#"><span>查重接口反馈</span></a>
          </div>
        </div>
      </div>
    </div>
    <span
      :class="['pc-btn-search', { 'pc-active': flags.isActive }]"
      @click="search(), onInputBtnContent()"
      >{{ initialData.btnContent }}</span
    >
    <template v-if="flags.isSearched">
      <DuplicateCheckingResult
        v-for="(user, idx) in customData.customList"
        :user="user"
        :key="idx"
      ></DuplicateCheckingResult>
    </template>
  </div>
  <!--手机端-->
  <div class="mobile-container">
    <div class="mobile-container-header">
      <img class="asf-img" src="../assets/icons/ASF_black.png" />
      <img class="more-options-img" src="../assets/icons/moreOptions.png" />
    </div>
    <!--手机端title-->
    <div class="mobile-header">
      <span class="mobile-title">枝网查重</span>
      <span class="mobile-subtitle">
        <span class="left">帮助你快速识别原创小作文</span>
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
      <textarea
        placeholder="在这里输入小作文哦~"
        @input="hasContent"
      ></textarea>
      <span class="total-word-num"
        >总字数:{{ initialData.contentLength }}/{{
          initialData.maxLength
        }}</span
      >
      <div class="mobile-copy-percentage">
        <div class="left">
          <img class="copy-img" src="../assets/icons/box.png" />
          <div class="mobile-progress-bar-box">
            <div class="txt-part">
              <span>总复制比</span>
              <span>{{ initialData.totalDuplicateCheckingRate }}%</span>
            </div>
            <!--查重占比条-->
            <div class="progress-bar">
              <span class="bottom-bar">
                <span class="top-bar" :style="lineProgress()"></span>
              </span>
            </div>
          </div>
        </div>
        <span
          :class="['mobile-btn-search', { 'mobile-active': flags.isActive }]"
          @click="search(), onInputBtnContent()"
          >{{ initialData.btnContent }}</span
        >
      </div>
    </div>
    <template v-if="flags.isSearched">
      <DuplicateCheckingResult
        v-for="(user, idx) in customData.customList"
        :user="user"
        :key="idx"
      ></DuplicateCheckingResult>
    </template>
  </div>
  <textarea
    class="clip-board"
    v-model="initialData.copyText"
    id="textArea"
  ></textarea>
</template>

<script>
import { reactive, defineComponent } from "vue";
import DuplicateCheckingResult from "../components/DuplicateCheckingResult";
import useCurrentInstance from "@/hooks/useCurrentInstance";
export default defineComponent({
  name: "DuplicateChecking",
  components: { DuplicateCheckingResult },
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
    let customData = reactive({
      customList: [],
    });
    let userList = [];
    let initialData = reactive({
      maxLength: 1000,
      foldBtnContent: "详情",
      btnContent: "查询结果",
      contentLength: 0, //textarea中的字数
      content: "", //textarea中的内容
      totalDuplicateCheckingRate: 0, //总复制比
      currState: 0, //0代表搜索，1代表复制报告
      copyText: "",
    });
    let flags = reactive({
      isSearched: false,
      isActive: false, //按钮是否是激活态
      foldBtnState: false, //展开按钮的状态
    });
    const { proxy } = useCurrentInstance();
    //方法
    //检测textarea中是否有内容以及内容长度
    function hasContent(e) {
      flags.isActive = e.target.value !== ""; //如果不为空，isActive就是true
      initialData.content = e.target.value;
      initialData.contentLength = e.target.value.length;
      // console.log(e.target.value.length); //无响应，说明没有设置响应式
      //text内容不为空并且已经进行过搜索，那么只要输入东西就算改变内容
      if (e.target.value !== "" && flags.isSearched === true) {
        initialData.btnContent = "查询结果";
        initialData.currState = 0;
      }
    }
    //搜索按钮功能
    function search() {
      if (initialData.btnContent === "查询结果") {
        if (initialData.contentLength >= 10) {
          flags.isSearched = true; //只要点击搜索并且内容不为空
          searchResult(); // 发送请求，查找结果
        } else {
          // alert("请输入至少10个字~");
          // 提示至少输入10个字
        }
      } else if (initialData.btnContent === "复制报告") {
        // alert("复制成功");
        // initialData.copyText = "复制成功！";
        let content = document.getElementById("textArea");

        content.select();
        document.execCommand("copy");
        alert("Copied!");
      }
    }
    //控制查重条长度
    function lineProgress() {
      return `width:${initialData.totalDuplicateCheckingRate}%`;
    }
    //排序出userList中查重率最高的一个
    function maxDuplicate() {
      let max = 0;
      if (userList.length !== 0) {
        userList.map((value) => {
          if (max < value.duplicateCheckingRate) {
            max = value.duplicateCheckingRate;
          }
        });
        return max;
      } else {
        return 0;
      }
    }
    //点击搜索过后，按钮变成复制报告
    function onInputBtnContent() {
      if (flags.isSearched === true) {
        //如果进行过搜索
        initialData.btnContent = "复制报告";
        initialData.currState = 1;
        // userList = [];
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
    const searchResult = async () => {
      const res = await proxy.$request({
        method: "post",
        url: "https://asoulcnki.asia/v1/api/check",
        data: {
          text: initialData.content,
        },
      });
      let userdata = res.related.map((item) => {
        return {
          username: item.reply.m_name,
          duplicateCheckingRate: parseFloat(item.rate).toFixed(2) * 100,
          issuingDate: new Date(item.reply.ctime).toLocaleString("chinese", {
            hour12: false,
          }),
          content: item.reply.content,
          link: item.reply_url,
        };
      });
      userList = userdata;
      customData.customList = userdata;
      //把内容写到剪贴板中
      if (userList.length !== 0) {
        initialData.copyText =
          "枝网文本复制检测报告(简洁)\n" +
          "查重时间: 2021-10-12 14:52:54\n" +
          "总文字复制比: " +
          userList[0].duplicateCheckingRate +
          "%\n" +
          "相似小作文: " +
          userList[0].link +
          "\n" +
          "作者: " +
          userList[0].username +
          "\n" +
          "发表时间: 2021-02-18 19:42:23\n" +
          "查重结果仅作参考，请注意辨别是否为原创";
        initialData.totalDuplicateCheckingRate = maxDuplicate(); //设定重复率，值为data数组中重复率最大的一个
      }
      // });
    };
    return {
      contents,
      userList,
      customData,
      flags,
      initialData,
      hasContent,
      search,
      lineProgress,
      onInputBtnContent,
      onUnfoldBtnClick,
    };
  },
});
</script>

<style scoped>
/*pc端*/
@media (min-width: 1000px) {
  .clip-board {
    width: 0;
    height: 0;
  }
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
  .pc-input-box textarea {
    width: 950px;
    height: 330px;
    border: 2px solid #d1d5db;
    resize: none;
    outline: none;
    padding: 10px;
    font-size: 18px;
    box-sizing: border-box;
  }
  .pc-input-box textarea::placeholder {
    color: #d1d5db;
  }
  .pc-input-box {
    display: flex;
    width: 1500px;
    justify-content: space-between;
    margin: 0 auto;
    position: relative;
  }
  .pc-input-box .pc-details {
    display: inline-block;
    height: 330px;
    width: 500px;
    background-color: #f8f8f8;
    padding: 10px;
    float: right;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .pc-input-box .pc-details .pc-details-title {
    font-weight: 400;
    font-size: 24px;
  }
  .pc-content-range {
    margin: 25px 0;
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
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  .pc-foot-nav a {
    text-decoration: none;
    color: #374151;
  }
  .pc-foot-nav > .left {
    display: flex;
  }
  .pc-foot-nav > .right {
    display: flex;
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
    height: 36px;
    width: 100px;
    text-align: center;
    line-height: 36px;
    background-color: rgb(156, 163, 175);
    color: white;
    font-size: 16px;
    margin-left: 900px;
  }
  .total-word-num {
    position: absolute;
    left: 10px;
    bottom: 30px;
    color: #d1d5db;
  }
  .pc-active {
    display: inline-block;
    border: 1px solid rgb(229, 229, 229);
    height: 36px;
    width: 100px;
    text-align: center;
    line-height: 36px;
    background-color: #4b5563;
    color: white;
  }
}

/*手机端*/
@media only screen and (max-width: 1000px) {
  .clip-board {
    width: 0;
    height: 0;
  }
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
  }
  .mobile-input-box textarea {
    width: 100%;
    height: 200px;
    border: 2px solid #d1d5db;
    resize: none;
    outline: none;
    padding: 10px;
    font-size: 14px;
    box-sizing: border-box;
  }
  .pc-input-box textarea::placeholder {
    color: #d1d5db;
  }
  .total-word-num {
    position: absolute;
    left: 10px;
    bottom: 70px;
    color: #d1d5db;
  }
  /*查重条*/
  .mobile-copy-percentage {
    display: flex;
    justify-content: space-between;
  }
  .mobile-copy-percentage .left {
    display: flex;
    margin-top: 8px;
    width: 55%;
  }
  .mobile-copy-percentage .copy-img {
    width: 25px;
    height: 25px;
    padding-right: 5px;
  }
  .mobile-progress-bar-box {
    height: 50px;
    width: 100%;
  }
  .mobile-progress-bar-box .txt-part {
    display: flex;
    justify-content: space-between;
  }
  .progress-bar {
    height: 5px;
    width: 100%;
  }

  .progress-bar > .bottom-bar {
    display: inline-block;
    height: 5px;
    width: 100%;
    background-color: rgb(229, 229, 229);
    position: relative;
  }

  .progress-bar > .bottom-bar > .top-bar {
    display: inline-block;
    height: 5px;
    /*width: 70%;*/
    background-color: rgb(75, 85, 99);
    position: absolute;
    left: 0;
  }
  .mobile-btn-search {
    display: inline-block;
    cursor: pointer;
    border: 1px solid rgb(229, 229, 229);
    height: 36px;
    width: 100px;
    text-align: center;
    line-height: 36px;
    background-color: rgb(156, 163, 175);
    color: white;
    font-size: 16px;
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
}
</style>
