<template>
  <headerTitle
    title="枝江债单"
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
    <div>{{ "最近更新" + "2021-01-01" }}</div>
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
          <div :class="$style.timeSection">TODO时间选择器</div>
        </div>

        <div :class="$style.debtStatus" ref="statusBox">
          <div
            :class="[
              $style.debtStatusItem,
              item.isSelect ? $style.debtStatusItemActive : '',
            ]"
            v-for="(item, index) in statuList"
            @click="changeStatus(index)"
          >
            {{ item.status }}
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import headerTitle from "@/components/HeaderTitle.vue";
import introduceAsoul from "@/components/IntroduceAsoul.vue";

import useCurrentInstance from "@/hooks/useCurrentInstance";
import toTargetUrlWithNewWindow from "@/hooks/useUtility";

export default defineComponent({
  name: "ZhijiangDict",
  components: { headerTitle, introduceAsoul },
  setup() {
    const { proxy } = useCurrentInstance();

    const AsoulTagList = reactive([
      {
        name: "向晚",
        key: "ava",
        isSelect: false,
      },
      {
        name: "贝拉",
        key: "ava",
        isSelect: false,
      },
      {
        name: "珈乐",
        key: "ava",
        isSelect: false,
      },
      {
        name: "嘉然",
        key: "ava",
        isSelect: false,
      },
      {
        name: "乃琳",
        key: "ava",
        isSelect: false,
      },
    ]);
    const changeTags = (index: number) => {
      AsoulTagList[index].isSelect = !AsoulTagList[index].isSelect;
    };

    const statuList = reactive([
      { status: "全部", isSelect: true },
      { status: "已还", isSelect: false },
      { status: "未还", isSelect: false },
    ]);
    const statusBox = ref<null | HTMLElement>(null);

    const changeStatus = (index: number) => {
      statusBox.value?.style.setProperty("--tempIndex", `${index}`);
      console.log(statusBox.value);
      statuList.forEach((item, i) => {
        if (i === index) {
          item.isSelect = true;
        } else {
          item.isSelect = false;
        }
      });
    };

    const debtList = [

      {
        year: "2021",
        month: "10",
        debt:[
          {
            title:'珈乐替三人欠下《rollin》。',
            member: '',
            isOwe:true,
            oweTime:'2021.08.18',
            revertsTime:''
          },
           {
            title:'欠债二',
            member: '',
            isOwe:true,
            oweTime:'2021.08.18',
            revertsTime:''
          },
           {
            title:'已还债',
            member: '',
            isOwe:false,
            oweTime:'2021.08.18',
            revertsTime:'2021.06.09'
          },
           {
            title:'珈乐替三人欠下《rollin》。',
            member: '',
            isOwe:true,
            oweTime:'2021.08.18',
            revertsTime:'2022.10.10'
          }
        ]
      }
    ]

    const isShowIntroduce = ref(true);
    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e;
    };
    return {
      changeIntroduceShow,
      changeStatus,
      changeTags,
      isShowIntroduce,
      AsoulTagList,
      statuList,
      statusBox,
      debtList
    };
  },
});
</script>

<style lang="less" module>
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
        flex-wrap: wrap-reverse;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .tagArea {
          display: flex;
          .tag {
            .displayCenter;
            padding: 8px;
            margin: 0 4.5px;
            width: 100px;
            border-radius: 22px;
            background-color: #d9dde7;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.5s, color 0.5s;
          }

          .tagActive {
            color: #f3f4f6;
            background-color: #4b5563;
          }
        }
        .timeSection {
        }
      }
      .debtStatus {
        border-radius: 22px;
        background-color: #d9dde7;
        display: flex;
        height: 40px;
        max-width: 663px;
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
          color: #f3f4f6;
        }
        .debtStatusItem::after {
          position: absolute;
          content: "";
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
        // .debtStatusItemActive {
        //   position: absolute;
        //   left: 0;
        //   width: calc(1 / 3 * 100%);
        //   height: 100%;
        //   background-color: #4b5563;
        //   border-radius: 22px;
        //   transition: position 0.3s linear;
        // }
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
  .introducePhone {
    display: block;
    background-color: #f3f4f6;
    padding: 20px;
    margin-top: 30px;
    min-height: 180px;
  }
}
</style>
