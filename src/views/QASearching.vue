<template>
  <header-title
    title="羊驼打过的太极"
    sub-title="看看羊驼都说了什么"
    @buttonClick="changeIntroduceShow"
  ></header-title>
  <div v-show="isShowIntroduce" class="introduce-phone">
    <div class="introduce-title">功能介绍</div>
    <div class="introduce-text-content">
      <div class="introduce-text-content-section">
        可以方便的查询羊驼在QA中答应的事情，最短三个字最长二十个字哦。遇到任何问题欢迎私信B站
        <span
          class="introduce-text-content-name"
          @click="
            toTargetUrlWithNewWindow('https://space.bilibili.com/1442421278')
          "
          >@ProjectASF</span
        >
      </div>
      <introduceAsoul></introduceAsoul>
    </div>
  </div>
  <div class="QASearching">
    <div class="search-and-result">
      <div class="search-area">
        <textarea
          v-model="searchData.searchValue"
          placeholder="在这里输入要查询的关键词哦"
          maxlength="20"
          class="search-textarea"
        ></textarea>
        <div class="search-text-count">
          总字数:{{ searchData.searchValue.length }}/{{ searchData.maxLength }}
        </div>
        <div
          class="search-button"
          :style="{
            'background-color':
              searchData.searchValue.length >= 3 ? '#4B5563' : '#9CA3AF',
          }"
          @click="getQA()"
        >
          查询结果
        </div>
      </div>
      <div class="result-area">
        <div v-if="hasError===false">
          <div v-for="item in result" :key="item.title" class="result-item">
            <div class="result-item-flex">
              <div class="display-center result-title">
                <div
                  class="display-center"
                >
                  <img src="@/assets/icons/BilibiliIcon.svg" />
                  <div class="result-item-author">{{ item.title }}</div>
                </div>
              </div>
            </div>
            <div v-for="qaNow in item.qa" :key="qaNow.q" class="result-item-content">
              <div v-html="highLight(qaNow.q)"></div>
              <div>{{qaNow.a}}</div>
            </div>
            <div class="result-item-flex">
              <div class="display-center">
                <img src="@/assets/icons/clock.svg" />
                <div style="display:inline;">发表时间 {{ item.title.match(/(?<=制作委员会的每周QA )[\s\S]*/)[0] }}</div>
              </div>
              <div class="display-center cursor" @click="toTargetUrlWithNewWindow(item.link)">
                <img src="@/assets/icons/link-icon.svg" />
                查看详情
              </div>
            </div>
          </div>
        </div>
        <div class="result-noRes" v-if="hasError===true">
          没找到对应的QA哦
        </div>
      </div>
    </div>
    <div>
      <div class="introduce-pc">
        <div class="introduce-title">功能介绍</div>
        <div class="introduce-text-content">
          <div class="introduce-text-content-section">
            可以方便的查询羊驼在QA中答应的事情，最短三个字最长二十个字哦。遇到任何问题欢迎私信B站
            <span
              class="introduce-text-content-name"
              @click="
                toTargetUrlWithNewWindow(
                  'https://space.bilibili.com/1442421278'
                )
              "
              >@ProjectASF</span
            >
          </div>
          <div class="introduce-Asoul">
            <introduceAsoul></introduceAsoul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import headerTitle from "@/components/HeaderTitle.vue";
import toTargetUrlWithNewWindow from "@/hooks/useUtility";
import introduceAsoul from "@/components/IntroduceAsoul.vue";
import { reactive, ref } from "vue";
import useCurrentInstance from "@/hooks/useCurrentInstance";
interface QAResult {
  title: string;
  link: string;
  qa: QA[];
}
interface QA {
  q: string;
  a: string;
}

const { proxy } = useCurrentInstance();
const isShowIntroduce = ref(true);
const changeIntroduceShow = (e: boolean) => {
  isShowIntroduce.value = e;
};
const highLight = (str:string)=>{
 return str.replace(nowValue.value,`<span style="color:red">${nowValue.value}</span>`)
}
const searchData = reactive({
  maxLength: 20,
  searchValue: "",
  btnContent: "查询结果",
});
const nowValue = ref("")
const hasError = ref(false)
const result = ref<QAResult[]>([]);
const getQA = async () => {
  try{
    result.value = await proxy.$request({
      url: import.meta.env.VITE_API_QASEARCHING,
      params: {
        key: searchData.searchValue,
      },
    });
    nowValue.value=searchData.searchValue
    hasError.value=false
  }catch(e){
    hasError.value=true
    nowValue.value=""
    result.value=[]
  }
};
</script>

<style lang="less" scoped>
.cursor {
  cursor: pointer;
}
.QASearching {
  display: flex;
  margin-top: 20px;
  color: #374151;
  .search-and-result{
    flex:1;
  }
  .search-area {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    .search-textarea {
      width: 100%;
      min-width: 400px;
      min-height: 300px;
      max-height: 600px;
      resize: none;
      padding: 10px 10px 40px 10px;
      font-size: 18px;
      color: #374151;
      border: 1px solid #d1d5db;
      border-radius: 2px;
    }
    textarea:focus {
      outline: none;
      border: 1px solid #000;
    }
    textarea[class="search-textarea"]::-webkit-input-placeholder {
      font-size: 20px;
      color: #d1d5db;
    }
    .search-text-count {
      position: absolute;
      bottom: 70px;
      right: 10px;
    }
    .search-button {
      width: 138px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4b5563;
      color: #f1f2f3;
      border-radius: 0 2px 2px 0;
      cursor: pointer;
      align-self: flex-end;
      margin-top: 20px;
    }
  }
  .result-area {
    width: 100%;
    font-size: 16px;
    .result-item {
      margin: 20px 0;
      padding: 5px 10px;
      background-color: #f8f8f8;

      .result-item-flex {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        img{
          vertical-align: middle;
        }
        .result-title{
          width: 100%;
        }
        .result-item-author {
          margin-right: 10px;
          display: inline-block;
        }

        .result-item-date {
          display: flex;
        }
      }
      .result-item-content {
        margin-bottom: 10px;
        color: #6b7280;
      }

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .result-noRes{
      text-align: center;
      color:#a55;
      font-size: 24px;
    }
  }
}

.introduce-pc {
  background-color: #f3f4f6;
  width: 360px;
  min-height: 200px;
  margin-left: 20px;
  padding: 20px;
  border-radius: 2px;
}
.introduce-phone {
  display: none;
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
  color: #1e90ff;
}

//
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
}
</style>