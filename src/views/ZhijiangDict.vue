<template>
  <div class="zhijiangdict-container">
    <h2 class="title">方言词典</h2>
    <div class="subtitle">
      <h3>你想了解的词条都在这里</h3>
      <a v-if="detail.isShow" @click="closeDetail"
        >返回<span class="ico-return"></span
      ></a>
      <a v-else>详情<span class="ico-vector"></span></a>
    </div>

    <div class="page-container" v-if="!loading">
      <div class="search-page" v-if="!detail.isShow">
        <div class="search-box">
          <input
            type="text"
            v-model="search.keyword"
            placeholder="在此处输入你想了解的词条"
          />
          <input
            type="submit"
            value="查询词条"
            :class="search.isBtnDisabled ? 'submit-disable' : 'submit-enable'"
            :disabled="search.isBtnDisabled"
          />
        </div>
        <div class="entries-box">
          <div class="tab">
            <div
              class="tab-list-wrapper"
              v-for="i in [...Array(tab.tabCount).keys()]"
              :key="i"
            >
              <ul :class="i === 0 ? 'main-tab-list' : 'sub-tab-list'">
                <li
                  v-for="item in tab.tabList[i]"
                  :key="item.cid"
                  :class="{ active: item.cid === tab.active[i] }"
                  @click="onTabChanged(i, item.cid)"
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
          <span class="path">{{ detail.path.join("/") }}</span>
          <span class="update-time"
            ><span class="ico-clock"></span>
            {{
              ` 最近更新  ${timestampToDate(detail.entry.update_timestamp)}`
            }}</span
          >
        </div>
        <h4 class="title">{{ detail.entry.title }}</h4>
        <p class="detail yue" v-html="detail.entry.content"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "../assets/css/yue.css";
import showdown from "showdown";
import { defineComponent, ref, reactive } from "vue";

interface CategoryNode {
  cid: number;
  parent_cid: number | null;
  name: string;
}

interface Entry {
  aid: number;
  title: string;
  content: string;
  update_timestamp: number;
}

export default defineComponent({
  name: "ZhijiangDict",
  setup() {
    let search: {
      keyword: string;
      isBtnDisabled: boolean;
    } = reactive({
      keyword: "",
      get isBtnDisabled() {
        return this.keyword.length === 0;
      },
    });

    let tab: {
      active: number[];
      tabList: CategoryNode[][];
      tabCount: number;
    } = reactive({
      active: [],
      tabList: [],
      tabCount: 0,
    });

    let detail: {
      entry: Entry;
      isShow: boolean;
      path: string[];
    } = reactive({
      entry: {
        aid: 0,
        title: "",
        content: "",
        update_timestamp: 0,
      },
      isShow: false,
      path: [],
    });

    let categories = Array<CategoryNode>();
    let entries = ref(Array<Entry>());
    let loading = ref(true);

    return {
      search, //搜索框相关组件数据
      tab, // tab相关组件数据
      detail, // 详情页相关组件数据

      categories, // 词条分类列表
      entries, // 当前分类下的词条列表
      loading, // 是否正在加载中（控制请求到内容后在显示
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
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

      this.onTabChanged(-1, null);
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
    //当tab发生改变时
    onTabChanged(level: number, cid: number | null) {
      const func = (c: number | null) => {
        const sub = this.getSubCategories(c);
        level++;
        if (sub.length !== 0) {
          this.tab.tabList[level] = sub;
          this.tab.active[level] = sub[0].cid;
          func(sub[0].cid);
        } else {
          this.tab.tabCount = level;
          if (c !== null) this.getEntries(c);
        }
      };
      this.tab.active = this.tab.active.filter((_value, index) => {
        return index <= level;
      });
      if (cid !== null) this.tab.active[level] = cid;
      func(cid);
    },
    // 当查看详情被点击时 获取被点击的item并展示detail
    openDetail(item: Entry) {
      this.detail.path = this.categories
        .filter((value) => {
          return this.tab.active.includes(value.cid);
        })
        .map((value) => {
          return value.name;
        });

      this.detail.entry = item;
      this.detail.isShow = true;
    },
    // 关闭detail
    closeDetail() {
      this.detail.isShow = false;
    },
    // 获取某一分类下的所有子分类
    getSubCategories(cid: number | null): Array<CategoryNode> {
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
        .tab {
          margin-top: 18px;

          li {
            white-space: nowrap;
          }

          .tab-list-wrapper {
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
