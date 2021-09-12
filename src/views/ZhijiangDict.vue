<template>
  <div class="zhijiangdict-container">
    <h2 class="title">方言词典</h2>
    <div class="subtitle">
      <h3>你想了解的词条都在这里</h3>
      <a v-if="showDetail" @click="closeDetail"
        >返回<span class="ico-return"></span
      ></a>
      <a v-else>详情<span class="ico-vector"></span></a>
    </div>

    <div class="page-container" v-if="!loading">
      <div class="search-page" v-if="!showDetail">
        <div class="search-box">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="在此处输入你想了解的词条"
          />
          <input
            type="submit"
            value="查询词条"
            :class="searchBtnDisabled ? 'submit-disable' : 'submit-enable'"
            :disabled="searchBtnDisabled"
            @click="test()"
          />
        </div>
        <div class="entries-box">
          <div class="tab-component">
            <div class="main-tab-list-wrapper">
              <ul class="main-tab-list">
                <li
                  v-for="item in mainTab"
                  :key="item.cid"
                  :class="{ active: item.cid === activeTab.main }"
                  @click="mainTabChange(item.cid)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div
              class="sub-tab-list-wrapper"
              v-for="i in [...Array(subTabCount).keys()]"
              :key="i"
            >
              <ul class="sub-tab-list">
                <li
                  v-for="item in subTab[i]"
                  :key="item.cid"
                  :class="{ active: item.cid === this.activeTab.sub[i] }"
                  @click="subTabChange(i, item.cid)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="list-container">
            <ul>
              <li v-for="(item, index) in this.entries" :key="index">
                <div class="dict-title">
                  <h4>{{ item.title }}</h4>
                  <a @click="openDetail(item)"
                    ><span class="ico-link"></span>查看详情</a
                  >
                </div>
                <p class="dict-detail">{{ toPlainText(item.content) }}</p>
                <p class="dict-updatetime">
                  <span class="ico-clock"></span
                  >{{ ` 更新日期  ${timestampToDate(item.update_timestamp)}` }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="detail-page" v-else>
        <div class="info">
          <span class="path">{{ entryDetail["path"].join("/") }}</span>
          <span class="update-time"
            ><span class="ico-clock"></span>
            {{
              ` 最近更新  ${timestampToDate(entryDetail.update_timestamp)}`
            }}</span
          >
        </div>
        <h4 class="title">{{ entryDetail.title }}</h4>
        <p class="detail yue" v-html="entryDetail.content"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "../assets/css/yue.css";
import showdown from "showdown";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "ZhijiangDict",
  setup() {
    type categoryNodeType = {
      cid: number;
      parent_cid: number | null;
      name: string;
    };

    let searchKeyword = ref("");
    let searchBtnDisabled = computed(() => {
      return searchKeyword.value.length === 0;
    });
    let activeCid = 0;
    let activePath = Array<string>();

    let categories = Array<categoryNodeType>();
    let entries = Array<unknown>(); // ref

    let entryDetail = ref({}); //ref
    let showDetail = ref(false);

    let loading = ref(true);

    let activeTab = ref({
      main: 0,
      sub: Array<number>(),
    });
    let mainTab = ref(Array<categoryNodeType>());
    let subTab = ref(Array<Array<categoryNodeType>>());
    let subTabCount = 0;

    return {
      searchKeyword, // 双向绑定搜索框
      searchBtnDisabled, // 计算属性 判断搜索框
      activeCid, // 目前所在的最末级分类的cid
      activePath, // 目前所在的分类的名称列表（用于词条详情页面的左上角path）
      categories, // 词条分类列表
      entries, // 当前分类下的词条列表
      entryDetail, // 词条详情
      showDetail, // 是否展示详情
      loading, // 是否正在加载中（控制请求到内容后在显示
      activeTab, // 存储目前所在的分类的
      mainTab, // 主分类列表
      subTab, // 二维数组 存储当前所在分类每一级的子分类
      subTabCount, // 存储子分类层数
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.getCategories();
    },
    // 时间戳（单位秒）转时间字符串
    timestampToDate(timestamp: number) {
      let d = new Date(timestamp * 1000);
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    },
    // html文本转普通文本（去除所有tag）
    toPlainText(text: string) {
      return text
        .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
        .replace(/<[^>]+?>/g, "")
        .replace(/\s+/g, " ")
        .replace(/ /g, " ")
        .replace(/>/g, " ");
    },
    // 获取所有分类节点列表
    getCategories() {
      // 后端返回数据样例
      this.categories = [
        {
          cid: 7,
          name: "V圈基本用语",
          parent_cid: null,
        },
        {
          cid: 8,
          name: "主播方面",
          parent_cid: 7,
        },
        {
          cid: 9,
          name: "观众方面",
          parent_cid: 7,
        },
        {
          cid: 10,
          name: "字幕组方面",
          parent_cid: 7,
        },
        {
          cid: 11,
          name: "平台与企业方面",
          parent_cid: 7,
        },
        {
          cid: 12,
          name: "词句与其他",
          parent_cid: 7,
        },
        {
          cid: 13,
          name: "ASOUL相关",
          parent_cid: null,
        },
        {
          cid: 26,
          name: "ASOUL外V圈",
          parent_cid: null,
        },
        {
          cid: 52,
          name: "其他网络文化",
          parent_cid: null,
        },
        {
          cid: 62,
          name: "补充性词条",
          parent_cid: null,
        },
      ];

      this.mainTab = this.getSubCategories(null);
      this.activeTab.main = this.mainTab[0].cid;
      this.mainTabChange(this.mainTab[0].cid);

      this.loading = false;
    },
    // 获取当前分类下所有的词条
    getEntries(cid: number) {
      cid;
      // 后端返回数据样例
      const content = [
        {
          aid: 210,
          title: "偷",
          content:
            "## 释义\n指复制粘贴、抄袭改编或借用创意等行为。\n在A-SOUL讨论语境中，“偷”多指那些粘贴经典定型文、重复整活玩梗等行为，主要是一种调侃，并非真正的指责。\n\n如：\n> 一眼偷;首偷，再偷必究；偷了；这段话又是哪偷的？\n\n## 注意\n**如果涉及实际的抄袭、剽窃，则不能用“偷”调侃过去，需要严肃对待。**\n\n\n",
          update_timestamp: 1631081792,
        },
        {
          aid: 211,
          title: "版本",
          content:
            "## 释义\n指当下粉丝社群中讨论的主要话题。\n由于v吧A吧等论坛的话题和风向变化较快，故用“版本更新”来形容话题更换的现象。\n\n如使用例：\n> 今天是什么版本？\n> 睡了一觉，版本又变了？",
          update_timestamp: 1631081792,
        },
        {
          aid: 212,
          title: "发病",
          content:
            "## 释义\n较为强烈和魔怔地表达自己的感情。\n该词不具有贬义和讽刺义，仅仅是善意的调侃，“发病”也是互联网表达的乐趣和特色之一。",
          update_timestamp: 1631081792,
        },
        {
          aid: 213,
          title: "紫砂",
          content:
            "## 释义\n自杀的谐音说法。\n“自杀”的开玩笑说法，常用于夸张地表示自己的情绪崩溃。\n\n如：\n> 珈乐还不回来，我紫砂了！\n> 由于嘉然请假到下周，本人宣布紫砂，并于本周内暂停生命活动。\n\n## 近同义\n/REMAKE；REMAKE；重开；\n\n## 注意\n**如果遇到心理健康问题，请及时就医咨询。珍惜生命，热爱生活。**\n",
          update_timestamp: 1631081792,
        },
        {
          aid: 214,
          title: "小作文",
          content:
            "## 释义\n粉丝为表达真情实感而创作的文章。\n“小作文”指代的范围以积极正面为主，一般指玩梗搞笑或真心表达爱意的文章。\n而严肃批评、提出意见的文章一般不会被称为“小作文”。\n",
          update_timestamp: 1631081792,
        },
      ];
      let converter = new showdown.Converter();
      content.forEach((value) => {
        value.content = converter.makeHtml(value.content);
      });
      this.entries = content;
    },
    // 当切换tab时 获取当前分类下的文章 并存储当前分类的path列表
    getSelectedCategoryInfo(data: {
      cid: number;
      path: Array<{ cid: number; parent_cid: number | null; name: string }>;
    }) {
      const { cid, path } = data;
      this.getEntries(cid);
      this.activePath = Array<string>();
      path.forEach((value) => {
        this.activePath.push(value.name);
      });
    },
    // 当查看详情被点击时 获取被点击的item并展示detail
    openDetail(item: {
      aid: number;
      title: string;
      content: string;
      update_timestamp: number;
      path: Array<string | undefined>;
    }) {
      item["path"] = this.activePath;

      this.entryDetail = item;
      this.showDetail = true;
    },
    // 关闭detail
    closeDetail() {
      this.showDetail = false;
    },
    // 当主分类切换时 递归获取所有子分类
    mainTabChange(cid: number) {
      this.activeTab = {
        main: cid,
        sub: Array<number>(),
      };
      this.subTab = [];
      this.subTabCount = 0;
      this.onTabChanged(cid);
    },
    // 当子分类切换时 递归获取其以后的所有子分类
    subTabChange(level: number, cid: number) {
      this.subTab = this.subTab.filter((_value, index) => {
        return index <= level;
      });
      this.activeTab.sub = this.activeTab.sub.filter((_value, index) => {
        return index <= level;
      });
      this.activeTab.sub[level] = cid;
      this.subTabCount = level + 1;
      this.onTabChanged(cid);
    },
    // 递归方法
    onTabChanged(cid: number) {
      const sub = this.getSubCategories(cid);
      if (sub.length !== 0) {
        this.subTab[this.subTabCount] = sub;
        this.activeTab.sub[this.subTabCount] = sub[0].cid;
        this.subTabCount++;
        this.onTabChanged(sub[0].cid);
      } else {
        this.getSelectedCategoryInfo({
          cid: cid,
          path: this.categories.filter((value) => {
            return [this.activeTab.main]
              .concat(this.activeTab.sub)
              .includes(value.cid);
          }),
        });
      }
    },
    // 获取某一分类下的所有子分类
    getSubCategories(
      cid: number | null
    ): Array<{ cid: number; parent_cid: number | null; name: string }> {
      return this.categories.filter((value) => {
        return value.parent_cid === cid;
      });
    },
  },
});
</script>

<style lang="less" scoped>
.zhijiangdict-container {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }

  a {
    cursor: pointer;
  }

  .title {
    margin-bottom: 7.5px;
    font-size: 34px;
    font-weight: 400;
    color: #1f2937;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 17px;
      font-weight: 400;
      color: #374151;
    }

    a {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #4b5563;
    }

    .ico-return {
      margin-left: 3px;
      width: 15px;
      height: 15px;
      background: url("../assets/icons/return.svg") no-repeat center;
      background-size: contain;
    }

    .ico-vector {
      margin-left: 3px;
      width: 15px;
      height: 15px;
      background: url("../assets/icons/arrow.svg") no-repeat center;
      background-size: contain;
    }
  }

  .page-container {
    padding-bottom: 20px;

    .search-page {
      margin-top: 20px;

      .search-box {
        height: 36px;
        display: flex;
        justify-content: center;
        overflow: hidden;

        input[type="text"] {
          appearance: none;
          height: 100%;
          flex: 1;
          overflow: hidden;
          font-size: 14px;
          padding: 8px 14px;
          border: none;
          border-radius: 0;
          outline: none;
          color: #1f2937;
          font-family: inherit;
          border-top: 1px solid #d1d5db;
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
        }

        input[type="submit"] {
          appearance: none;
          height: 100%;
          border: none;
          border-radius: 0;
          font-size: 14px;
          padding: 10px 14px;
          line-height: 100%;
          font-family: inherit;
          color: #fff;
        }

        .submit-enable {
          background-color: #4b5563;
        }

        .submit-disable {
          background-color: #9ca3af;
        }
      }

      .entries-box {
        .tab-component {
          margin-top: 18px;

          li {
            white-space: nowrap;
          }

          .main-tab-list-wrapper {
            overflow: scroll;
            user-select: none;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            .main-tab-list {
              display: flex;
              justify-content: space-between;

              li {
                font-size: 17px;
                line-height: 30px;
                padding: 5px 0;
                margin-right: 9px;
              }

              .active {
                border-bottom: 2px solid #374151;
              }
            }
          }

          .sub-tab-list-wrapper {
            user-select: none;
            overflow: scroll;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            .sub-tab-list {
              display: flex;

              li {
                font-size: 12.5px;
                line-height: 24.5px;
                padding: 4px 21px;
                margin-right: 9.5px;
                margin-top: 9.5px;
                background-color: #9ca3af;
                color: #fff;
              }

              .active {
                background-color: #4b5563;
              }
            }
          }
        }

        .list-container {
          ul {
            li {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 197.5px;
              margin-top: 22px;
              padding: 15.5px 17.5px 12px;
              background-color: #f8f8f8;

              .dict-title {
                display: flex;
                justify-content: space-between;
                align-items: center;

                h4 {
                  &::before {
                    content: "";
                    display: inline-block;
                    width: 3px;
                    height: 12px;
                    margin-right: 7px;
                    background-color: #1f2937;
                  }

                  font-size: 17px;
                }

                a {
                  display: flex;
                  align-items: center;
                  font-size: 12.5px;
                  color: #6b7280;

                  .ico-link {
                    margin-right: 5px;
                    width: 14px;
                    height: 14px;
                    background: url("../assets/icons/link.png") no-repeat center;
                    background-size: contain;
                  }
                }
              }

              .dict-detail {
                font-size: 14.5px;
                line-height: 24.5px;
                color: #6b7280;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                line-clamp: 4;
                overflow: hidden;
              }

              .dict-updatetime {
                display: flex;
                align-items: center;
                font-size: 12.5px;
                color: #6b7280;

                .ico-clock {
                  margin-right: 4px;
                  width: 14px;
                  height: 14px;
                  background: url("../assets/icons/clock.svg") no-repeat center;
                  background-size: contain;
                }
              }
            }
          }
        }
      }
    }

    .detail-page {
      background-color: #f8f8f8;
      padding: 13px 15px;
      margin-top: 28px;

      .info {
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        color: #6b7280;

        .update-time {
          display: flex;
          align-items: center;
          white-space: nowrap;

          .ico-clock {
            margin-right: 3px;
            width: 14px;
            height: 14px;
            background: url("../assets/icons/clock.svg") no-repeat center;
            background-size: contain;
          }
        }
      }

      .title {
        margin-top: 23px;
        color: #1f2937;
        font-size: 25px;
      }

      .detail {
        margin-top: 12px;
        font-size: 14.5px;
        line-height: 24.5px;
        font-family: inherit;
        color: #6b7280;
      }
    }
  }
}
</style>
