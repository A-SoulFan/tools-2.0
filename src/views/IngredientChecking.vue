<template>
  <div class="ingredient">
    <headerTitle Title="成分姬" subTitle="帮助你快速分析用户成分"></headerTitle>
    <div class="search-area">
      <input
        type="text"
        class="search-input"
        placeholder="请输入B站用户名或UID"
      />
      <div class="search-button">{{ buttonText }}</div>
    </div>
    <!-- 查询结果展示 -->
    <div class="search-results-area">
      <div class="search-results-header-area">
        <div>TA关注的VUP有:</div>
        <div class="search-results-header-button">
          <img class="link-icon" src="../assets/icons/link-icon.svg" />
          复制结果
        </div>
      </div>
      <div class="serach-result-VupList">
        <div class="Vup-item">
          <img
            src="../assets/icons/user.png"
            alt=""
            srcset=""
            class="Vup-item-face"
          />
          <div class="Vup-name">mingzi</div>
          <div class="Vup-describe">
            描ddasadsdsdsdsdsdsdsdsdsdsdsdsdsdsdasasdasdasddasdsdsdsdsds述
          </div>
          <div class="divider"></div>
          <div class="Vup-describe">
            个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名个人签名
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
import IngredientCheckingResult from "../components/IngredientCheckingResult";
import headerTitle from "../components/headerTitle.vue";
export default defineComponent({
  components: { headerTitle },
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
    let buttonText = "查询结果";
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

    //搜索按钮功能
    function search() {
      if (initialData.contentLength != 0) {
        flags.isSearched = true; //只要点击搜索并且内容不为空
      }
    }
    //控制查重条长度
    function lineProgress() {
      return `width:${initialData.totalIngredientCheckingRate}%`;
    }

    return {
      contents,
      userList,
      flags,
      initialData,
      search,
      lineProgress,
      buttonText,
    };
  },
});
</script>

<style scoped lang="less">
.ingredient {
  .search-area {
    margin-top: 30px;
    display: flex;
    height: 50px;
    font-size: 18px;
    .search-input {
      border: none;
      width: 100%;
      height: calc(100%-2px);
      padding-left: 10px;
      border: 1px solid #d1d5db;
      border-radius: 2px 0 0 2px;
    }
    input:focus {
      outline: none;
      border: 1px solid #000;
    }
    .search-button {
      width: 138px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4b5563;
      color: #f1f2f3;
      border-radius: 0 2px 2px 0;
    }
  }

  .search-results-area {
    .search-results-header-area {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 20px;
      .search-results-header-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        cursor: pointer;
        .link-icon {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }
    }
    .serach-result-VupList {
      display: grid;
      .Vup-item {
        background-color: #f8f8f8;
        width: 180px;
        height: 180px;
        padding: 0 10px 20px 10px;
        position: relative;
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        .Vup-item-face {
          background-color: #d1d5db;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .Vup-name {
          margin-top: 55px;
          font-size: 18px;
          font-weight: bold;
          align-self: center;
        }
        .Vup-describe {
          color: #9ca3af;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .divider {
          align-self: center;
          width: 140px;
          border-top: 1px #4b5563 solid;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
