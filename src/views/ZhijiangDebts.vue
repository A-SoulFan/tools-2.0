<template>
  <headerTitle
    title="枝江账单"
    sub-title="许下的诺言是前进的动力"
    @buttonClick="changeIntroduceShow"
  ></headerTitle>
  <div v-show="isShowIntroduce" :class="$style.introducePhone">
    <div :class="$style.introduceTitle">功能介绍</div>
    <div :class="$style.introduceContent">
      <introduceAsoul></introduceAsoul>
    </div>
  </div>
  <div :class="$style.updateTimeArea">
    <img :class="$style.iconClock" src="@/assets/icons/clock.svg" />
    <div>{{ '最近更新' + '2021-01-01' }}</div>
  </div>
  <div :class="$style.ZhijiangDebts">
    <div :class="$style.searchAndResult">
      <div :class="$style.searchArea">
        <div :class="$style.tagsAndtime">
          <div :class="$style.tagArea">
            <div
              v-for="(tag, index) in AsoulTagList"
              :class="[$style.tag, tag.isSelect ? $style.tagActive : '']"
              @click="changeTags(index)"
            >
              {{ tag.name }}
            </div>
          </div>
          <div :class="$style.timeSection">
            <el-config-provider :locale="locale">
              <el-date-picker
                v-model="datePickedStart"
                type="month"
                :class="$style.elDatePicker"
                :disabled-date="dateValidatorStart"
              >
              </el-date-picker>
              <span>-</span>
              <el-date-picker
                v-model="datePickedEnd"
                type="month"
                :class="$style.elDatePicker"
                :disabled-date="dateValidatorEnd"
              >
              </el-date-picker>
            </el-config-provider>
          </div>
        </div>

        <div ref="statusBox" :class="$style.debtStatus">
          <div
            v-for="(item, index) in statuList"
            :class="[
              $style.debtStatusItem,
              item.isSelect ? $style.debtStatusItemActive : '',
            ]"
            @click="changeStatus(index)"
          >
            {{ item.status }}
          </div>
        </div>
      </div>
      <div :class="$style.resultArea">
        <div
          v-for="(BigItem, index) in debtList.filter(v => {
            return dateChecker(`${v.year}-${v.month}`);
          })"
          :class="$style.resultItemArea"
        >
          <div :class="$style.debtTimeAndbutton">
            <div>
              <div>{{ BigItem.month + '月' }}</div>
              <div>{{ BigItem.year + '年' }}</div>
            </div>
            <div :class="$style.divder"></div>
            <div @click="changeDebtFold(index)">
              <img
                :class="[
                  $style.iconArrow,
                  BigItem.isFold ? $style.iconArrowFold : '',
                ]"
                src="@/assets/icons/arrow.svg"
              />
            </div>
          </div>
          <div
            :class="[
              $style.debtItemArea,
              BigItem.isFold ? $style.debtItemAreaFlod : '',
            ]"
          >
            <div v-for="item in itemFilter(BigItem)" :class="$style.debtItem">
              <div :class="$style.titleArea">
                <img
                  v-if="item.completion_date !== ``"
                  src="@/assets/icons/correct.svg"
                />
                <img v-else src="@/assets/icons/wrong.svg" />
                <div :class="$style.title">{{ item.subject }}</div>
              </div>
              <div :class="$style.avatarArea">
                <img
                  v-for="avatar in item.tags.map(v => v.key)"
                  :src="'./src/assets/image/' + avatar + '.webp'"
                />
              </div>
              <div :class="$style.oweAndReverts">
                <div :class="[$style.baseItem, $style.owe]">
                  <img src="@/assets/icons/clock.svg" />
                  <div :class="$style.time">
                    {{ '欠债时间' + item.start_date }}
                  </div>
                  <img
                    src="@/assets/icons/coolicon.svg"
                    :class="$style.iconCool"
                  />
                </div>
                <div
                  v-if="item.completion_date !== ``"
                  :class="[$style.baseItem, $style.reverts]"
                >
                  <img src="@/assets/icons/clock.svg" />
                  <!-- TODO: 参数 -->
                  <div :class="$style.time">
                    {{ '还债时间' + item.completion_date }}
                  </div>
                  <img
                    src="@/assets/icons/coolicon.svg"
                    :class="$style.iconCool"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div :class="$style.introducePc">
        <div :class="$style.introduceTitle">功能介绍</div>
        <div :class="$style.introduceContent">
          <introduceAsoul></introduceAsoul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick } from 'vue';
import headerTitle from '@/components/HeaderTitle.vue';
import introduceAsoul from '@/components/IntroduceAsoul.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import useCurrentInstance from '@/hooks/useCurrentInstance';
import {toTargetUrlWithNewWindow} from '@/hooks/useUtility';
import { ElDatePicker, ElConfigProvider } from 'element-plus';
import useDebounce from '@/hooks/useDebounce';

interface Debt {
  month: string;
  year: string;
  isFold: boolean;
  debt: DebtItem[];
}
interface ASMember {
  key: string;
  name: string;
}
interface ASMemberDebtTag extends ASMember {
  is_leader: boolean;
  home_page: string;
}
interface ASMemberSelector extends ASMember {
  isSelect: boolean;
}
interface DebtItem {
  start_date: string;
  completion_date: string;
  start_url: string;
  completion_url: string;
  subject: string;
  tags: ASMemberDebtTag[];
}

export default defineComponent({
  name: 'ZhijiangDebts',
  components: { headerTitle, introduceAsoul, ElDatePicker, ElConfigProvider },
  setup() {
    const { proxy } = useCurrentInstance();
    const locale = ref(zhCn);
    const datePickedStart = ref(new Date('2020-12-11'));
    const datePickedEnd = ref(new Date());
    const AsoulTagList = reactive<ASMemberSelector[]>([
      {
        name: '向晚',
        key: 'ava',
        isSelect: true,
      },
      {
        name: '贝拉',
        key: 'bella',
        isSelect: true,
      },
      {
        name: '珈乐',
        key: 'carol',
        isSelect: true,
      },
      {
        name: '嘉然',
        key: 'diana',
        isSelect: true,
      },
      {
        name: '乃琳',
        key: 'eileen',
        isSelect: true,
      },
    ]);
    const changeTags = useDebounce((index: number) => {
      AsoulTagList[index].isSelect = !AsoulTagList[index].isSelect;
      questDebt();
    }, 300);

    const statuList = reactive([
      { status: '全部', key: 'all', isSelect: true },
      { status: '已还', key: 'ok', isSelect: false },
      { status: '未还', key: 'owing', isSelect: false },
    ]);
    const statusBox = ref<null | HTMLElement>(null);

    const changeStatus = (index: number) => {
      statusBox.value?.style.setProperty('--tempIndex', `${index}`);
      statuList.forEach((item, i) => {
        if (i === index) {
          item.isSelect = true;
        } else {
          item.isSelect = false;
        }
      });
    };

    const debtList = ref<Debt[]>([
    /*
      {
        year: "2021",
        month: "10",
        isFold: false,
        debt: [
          {
            title: "珈乐替三人欠下《rollin》。珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella", "carol", "diana", "eileen"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title:
              "珈乐替三人欠下珈乐替三人欠下珈乐替三人欠下乐替三人欠下乐替三人欠下乐替三人欠下乐替三人欠下",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella", "carol"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "欠债二",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "已还债",
            member: ["ava", "bella"],
            isOwe: false,
            oweTime: "2021.08.18",
            revertsTime: "2021.06.09",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: false,
            oweTime: "2021.08.18",
            revertsTime: "2022.10.10",
          },
        ],
      },
      {
        year: "2021",
        month: "11",
        isFold: false,
        debt: [
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "欠债二",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "",
          },
          {
            title: "已还债",
            member: ["ava", "bella"],
            isOwe: false,
            oweTime: "2021.08.18",
            revertsTime: "2021.06.09",
          },
          {
            title: "珈乐替三人欠下《rollin》。",
            member: ["ava", "bella"],
            isOwe: true,
            oweTime: "2021.08.18",
            revertsTime: "2022.10.10",
          },
        ],
      },
    */
    ]);
    

    const changeDebtFold = (index: number) => {
      debtList.value[index].isFold = !debtList.value[index].isFold;
    };

    const isShowIntroduce = ref(true);
    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e;
    };
    const dateChecker = (s: string): boolean => {
      if (datePickedStart.value === null || datePickedEnd.value === null) {
        return true;
      } else {
        const oweDate = new Date(s);
        return oweDate > datePickedStart.value && oweDate < datePickedEnd.value;
      }
    };

    const dateValidatorStart = (e: Date) => {
      if (e < new Date('2020-12') || e > new Date()) {
        return true;
      }
      if (e > datePickedEnd.value) {
        return true;
      }
      return false;
    };
    const dateValidatorEnd = (e: Date) => {
      if (e < new Date('2020-12') || e > new Date()) {
        return true;
      }
      if (e < datePickedStart.value) {
        return true;
      }
      return false;
    };

    const itemFilter = (e: Debt) => {
      
     return e.debt.filter((v: DebtItem) =>
      {

      return   v.tags.reduce((pre: boolean, now: ASMemberDebtTag) => {
          return (
            pre &&
            AsoulTagList.find((vv: ASMemberSelector) => vv.key === now.key)!.isSelect
          )
        }, true)
      })
        .filter(
          (v: DebtItem) =>
            statuList[0].isSelect ||
            (v.completion_date === ``) === statuList[2].isSelect,
        )
        .filter((v: DebtItem) => dateChecker(v.start_date));



    }

    const questDebt = async () => {

      const rawData = await proxy.$request({
        url: import.meta.env.VITE_API_DEBT,
        params: {
          memberName: AsoulTagList.reduce(
            (pre: string, v: ASMemberSelector) => {
              if (v.isSelect === true) {
                return pre + v.key + ',';
              } else {
                return pre;
              }
            },
            '',
          ).replace(/,$/, ''),
        },
      });

      const processedData = rawData.reduce((pre: any, now: any) => {
        if (!pre.hasOwnProperty(now.start_date.slice(0, 7))) {
          pre[now.start_date.slice(0, 7)] = {
            year: now.start_date.slice(0, 4),
            month: now.start_date.slice(5, 7),
            isFold: false,
            debt: [now],
          };
        } else {
          pre[now.start_date.slice(0, 7)].debt.push(now);
        }
        return pre;
      }, {});
      
      debtList.value = Object.values(processedData);
    };
    
    questDebt();
    return {
      changeIntroduceShow,
      changeStatus,
      changeTags,
      changeDebtFold,
      dateChecker,
      dateValidatorStart,
      dateValidatorEnd,
      isShowIntroduce,
      AsoulTagList,
      statuList,
      statusBox,
      debtList,
      datePickedStart,
      datePickedEnd,
      locale,
      itemFilter,
    };
  },
});
</script>

<style lang="less" module>
@white1: #f3f4f6;
.displayCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.updateTimeArea {
  margin: 20px 0;
  display: flex;
  align-items: center;
  .iconClock {
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }
}
.ZhijiangDebts {
  display: flex;
  .searchAndResult {
    flex: 1;
    .searchArea {
      .tagsAndtime {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .tagArea {
          margin-top: 10px;
          display: flex;
          margin-right: 10px;
          .tag {
            .displayCenter;
            padding: 8px;
            margin: 0 4.5px;
            width: 15vw;
            max-width: 100px;
            border-radius: 22px;
            background-color: #d9dde7;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.5s, color 0.5s;
          }

          .tagActive {
            color: @white1;
            background-color: #4b5563;
          }
        }
        .timeSection {
          font-size: 14px;
          display: flex;
          margin-top: 10px;
          width: 100%;
          justify-content: space-around;
          align-items: center;
          .elDatePicker {
            width: 40%;
          }
        }
      }
      .debtStatus {
        border-radius: 22px;
        background-color: #d9dde7;
        display: flex;
        height: 34px;
        max-width: 546px;
        position: relative;
        z-index: 1;
        font-size: 16px;
        --tempIndex: 0;
        .debtStatusItem {
          .displayCenter;
          flex: 1;
          cursor: pointer;
          background-color: transparent;
          border-radius: 22px;
          color: #4b5563;
          transition: 0.5s ease;
        }
        .debtStatusItemActive {
          color: @white1;
        }
        .debtStatusItem::after {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          height: 100%;
          width: calc(1 / 3 * 100%);
          background: #4b5563;
          border-radius: 22px;
          transform: translateX(calc(var(--tempIndex) * 100%));
          transition: 0.5s ease;
          z-index: -1;
        }
      }
    }
    .resultArea {
      margin-top: 30px;
      .resultItemArea {
        // display: flex;
        margin-bottom: 20px;
        .debtTimeAndbutton {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .divder {
            border-top: 1px #d9dde7 solid;
            margin: 0 20px;
            flex: 1;
          }
          .iconArrow {
            width: 20px;
            height: 20px;
            transform: rotate(0deg);
            transition: transform 0.5s;
          }
          .iconArrowFold {
            transform: rotate(180deg);
          }
        }
        .debtItemArea {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          justify-content: space-between;
          grid-gap: 10px;
          transition: all 0.4s ease-in-out;
          max-height: 0px;
          overflow: hidden;
          .debtItem {
            background-color: #f8f8f8;
            border-radius: 4px;
            height: 160px;
            padding: 8px 11px;
            color: #6b7280;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .titleArea {
              display: flex;
              text-overflow: -o-ellipsis-lastline;

              // align-items: center;
              img {
                width: 14px;
                height: 20px;
              }
              .title {
                margin-left: 10px;
                font-size: 14.4px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
            .avatarArea {
              // margin-top: 30px;
              display: flex;
              img {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                border: 1px #6b7280 solid;
                margin-right: 10px;
              }
            }
            .oweAndReverts {
              display: flex;
              align-items: center;
              // margin-top: 20px;
              .baseItem {
                width: 120px;
                padding: 5px 2px;
                display: flex;
                border-radius: 4px;
                .time {
                  text-align: center;
                }
                .iconCool {
                  transform: rotate(225deg);
                }
                img {
                  width: 14px;
                  height: 14px;
                }
              }
              .owe {
                background-color: #ea9c94;
                margin-right: 20px;
              }
              .reverts {
                background-color: #c8fdbe;
              }
            }
          }
        }
        .debtItemAreaFlod {
          max-height: 4000px; //我是傻逼才这么写动画
        }
      }
    }
  }
}

.introducePc {
  background-color: #f3f4f6;
  width: 400px;
  min-height: 200px;
  margin-left: 20px;
  padding: 20px;
  border-radius: 2px;
}
.introducePhone {
  display: none;
}
.introduceTitle {
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 20px;
}
.introduceContent {
  font-size: 15px;
  margin: 10px 0;
}
@media only screen and (max-width: 768px) {
  .introducePc {
    display: none;
  }
  .tagsAndtime {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: center;
  }
  .introducePhone {
    display: block;
    background-color: #f3f4f6;
    padding: 20px;
    margin-top: 30px;
    min-height: 180px;
  }
  .debtStatus,
  .tag {
    font-size: 12px !important;
  }
}
</style>
