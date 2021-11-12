<template>
  <div>
    <headerTitle title="成分姬" subTitle="帮助你快速分析用户成分" @buttonClick="changeIntroduceShow()"></headerTitle>
    <div v-show="isShowIntroduce" class="introduce-phone">
      <div class="introduce-title">功能介绍</div>
      <div class="introduce-text-content">
        <div class="introduce-text-content-section">
          成分姬是由
          <span
            @click="toBilibiliSpace(32957695)"
            class="introduce-text-content-name"
          >晓轩iMIKU老师</span>
          为了鉴别b站用户成分制作的用于抓取b站用户关注列表内vup的小工具，快速识别评论区发言者成分
        </div>
        <div class="introduce-text-content-section">
          毕竟人与人之间要多些攻击性(ꐦ°᷄д°᷅),
          所以工具用都用了，速度去b站给五小只点点关注(♡ ὅ ◡ ὅ )ʃ♡
        </div>
        <div class="introduce-Asoul">
          <div
            v-for="item in Asoul"
            :key="item.BzhanUid"
            @click="toBilibiliSpace(item.BzhanUid)"
            :style="'color:' + item.color"
            class="introduce-Asoul-item"
          >
            <img :src="item.face" class="introduce-Asoul-face" />
            <div class="introduce-Asoul-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ingredient">
      <div class="search-and-results">
        <div class="search-area">
          <input
            type="text"
            class="search-input"
            placeholder="请输入B站用户名或UID"
            v-model="searchText"
            @keyup.enter="getIngredient()"
          />
          <div
            class="search-button"
            :style="{
              'background-color': searchText.length > 0 ? '#4B5563' : '#9CA3AF',
            }"
            @click="getIngredient()"
          >查询成分</div>
        </div>
        <!-- 查询结果展示 -->
        <div class="results-area">
          <div class="results-header-area">
            <div>TA关注的VUP有:</div>
            <div class="results-header-button" @click="copySearchResult()">
              <img class="link-icon" src="@/assets/icons/link-icon.svg" />
              复制结果
            </div>
          </div>
          <div v-if="isVuplistEmpty" class="search-result-tip">该用户没有关注的Vup捏~！</div>
          <div class="search-result-VupList" v-else>
            <div class="Vup-item" v-for="item in vupList" :key="item.vupUid">
              <img :src="item.vupFace" class="Vup-item-face" />
              <div class="Vup-name">{{ item.vupName }}</div>
              <div class="Vup-describe">{{ item.officalVerify }}</div>
              <div class="divider"></div>
              <div class="Vup-sign">{{ item.vupSign }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="introduce-pc">
        <div class="introduce-title">功能介绍</div>
        <div class="introduce-text-content">
          <div class="introduce-text-content-section">
            成分姬是由
            <span
              @click="toBilibiliSpace(32957695)"
              class="introduce-text-content-name"
            >晓轩iMIKU老师</span>
            为了鉴别b站用户成分制作的用于抓取b站用户关注列表内vup的小工具，快速识别评论区发言者成分
          </div>
          <div class="introduce-text-content-section">
            毕竟人与人之间要多些攻击性(ꐦ°᷄д°᷅),
            所以工具用都用了，速度去b站给五小只点点关注(♡ ὅ ◡ ὅ )ʃ♡
          </div>
          <div class="introduce-Asoul">
            <div
              v-for="item in Asoul"
              :key="item.BzhanUid"
              @click="toBilibiliSpace(item.BzhanUid)"
              :style="'color:' + item.color"
              class="introduce-Asoul-item"
            >
              <img :src="item.face" class="introduce-Asoul-face" />
              <div class="introduce-Asoul-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import headerTitle from "@/components/HeaderTitle.vue";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import copyToClipBoard from "@/hooks/useCopyToClipBoard";

interface vupItem {
  vupName: string
  officalVerify: string
  vupSign: string
  vupUid: string
  vupFace: string
}
export default defineComponent({
  components: { headerTitle },
  setup() {
    const { proxy } = useCurrentInstance();
    const Asoul = [
      {
        name: "向晚大魔王",
        color: "#9ac8e2",
        BzhanUid: 672346917,
        face: "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@256w_256h_1o.webp",
      },
      {
        name: "贝拉Kira",
        color: "#db7d74",
        BzhanUid: 672353429,
        face: "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg@256w_256h_1o.webp",
      },
      {
        name: "珈乐Carol",
        color: "#b8a6d9",
        BzhanUid: 351609538,
        face: "https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg@256w_256h_1o.webp",
      },
      {
        name: "嘉然今天吃什么",
        color: "#e799b0",
        BzhanUid: 672328094,
        face: "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@256w_256h_1o.webp",
      },
      {
        name: "乃琳Queen",
        color: "#576690",
        BzhanUid: 672342685,
        face: "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg@256w_256h_1o.webp",
      },
    ];
    let vupList = ref([] as vupItem[]);
    let searchText = ref("");
    let isVuplistEmpty = ref(false);
    const isShowIntroduce = ref(false);
    let saveSearchText = "";
    const getIngredient = async () => {
      try {
        if (searchText.value === "") {
          return;
        }
        const res = await proxy.$request({
          url: import.meta.env.VITE_API_CFJ,
          params: {
            name: searchText.value,
          },
        });
        saveSearchText = searchText.value;
        console.log(res, "res");
        if (!res || !res.list || res.list.length === 0) {
          isVuplistEmpty.value = true;
          return;
        }
        vupList.value = res.list.map(
          (item: {
            uname: string;
            official_verify?: any;
            sign: string;
            mid: string;
            face: string;
          }) => {
            return {
              vupName: item.uname,
              officalVerify: item.official_verify.desc,
              vupSign: item.sign,
              vupUid: item.mid,
              vupFace: item.face.replace("http://", "https://"),
            } as vupItem;
          }
        );
        // debugger;
      } catch (error) {
        console.log(error);
      }
    };
    const copySearchResult = () => {
      const vupName = vupList.value
        .map((item: any) => {
          return `@${item.vupName}`;
        })
        .join(",");
      const copyTime = new Date().toLocaleString("chinese", { hour12: false });
      copyToClipBoard(
        `@${saveSearchText} 关注的VUP有：\r\n${vupName}\r\n查询时间：${copyTime}\r\n数据来源：@ProJectASF`
      );
      console.log("copySearchResult");
    };
    const changeIntroduceShow = () => {
      isShowIntroduce.value = !isShowIntroduce.value;
    };
    // getIngredient();
    const toBilibiliSpace = (uid: number) => {
      window.open("https://space.bilibili.com/" + uid);
    };
    return {
      getIngredient,
      vupList,
      searchText,
      Asoul,
      toBilibiliSpace,
      copySearchResult,
      isVuplistEmpty,
      changeIntroduceShow,
      isShowIntroduce,
    };
  },
});
</script>

<style scoped lang="less">
.ingredient {
  display: flex;
  padding-top: 30px;
  width: 100%;
  .search-and-results {
    flex: 1;
  }
  .search-area {
    display: flex;
    height: 50px;
    font-size: 17px;
    .search-input {
      border: none;
      width: 100%;
      // height: calc(100%-2px);
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
      cursor: pointer;
    }
  }

  .results-area {
    margin-bottom: 20px;
    .results-header-area {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 20px;
      .results-header-button {
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
    .search-result-tip {
      margin-top: 50px;
      font-size: 20px;
      color: #aa5555;
      text-align: center;
    }
    .search-result-VupList {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      justify-content: space-between;
      grid-gap: 80px 50px;
      padding-top: 100px;
      .Vup-item {
        background-color: #f8f8f8;
        padding: 0 10px 20px 10px;
        position: relative;
        // margin-top: 100px;
        max-height: 200px;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        word-break: break-all;
        .Vup-item-face {
          background-color: #d1d5db;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85px;
          height: 85px;
          border-radius: 50%;
          border: 1px #d1d5db solid;
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
          width: 80%;
          border-top: 1px #4b5563 solid;
          margin: 10px 0;
        }
        .Vup-sign {
          color: #9ca3af;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 3;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
  }
  .introduce-pc {
    background-color: #f3f4f6;
    width: calc(22.4vw - 40px);
    max-height: 500px;
    min-width: 300px;
    min-height: 200px;
    margin-left: 20px;
    padding: 20px;
    border-radius: 2px;
  }
}
.introduce-title {
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 20px;
}
.introduce-text-content {
  font-size: 15px;
  .introduce-text-content-section {
    margin-bottom: 20px;
  }
}
.introduce-text-content-name {
  margin: 0 10px;
  cursor: pointer;
  color: #666;
  text-decoration: underline;
}
.introduce-Asoul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .introduce-Asoul-item {
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    cursor: pointer;
  }
  .introduce-Asoul-face {
    width: 67px;
    height: 67px;
    border-radius: 50%;
  }
  .introduce-Asoul-name {
    margin-top: 5px;
    font-size: 12px;
  }
}
.introduce-phone {
  display: none;
}

@media only screen and (max-width: 768px) {
  .introduce-pc {
    display: none;
  }
  .introduce-phone {
    display: block;
    background-color: #f3f4f6;
    padding: 20px;
    margin-top: 30px;
    min-height: 180px;
  }
  .search-result-VupList {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
  }
  .ingredient {
    .search-area {
      height: 35px;
      font-size: 15px;
    }
  }
}
</style>
