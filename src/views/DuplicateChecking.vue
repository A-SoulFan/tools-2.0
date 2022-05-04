<template>
  <div class="title-area" >
    <div class="main-title">
      <div class="title-area-left">
        <img src="@/assets/image/ss.png" />
        <div class="main-title-font">枝网查重</div>
      </div>
      <div class="title-img">
        <img src="@/assets/image/enen.gif" alt="">
      </div>
    </div>
    <div class="title-area-sub">
      <div class="sub-title">帮助你快速识别原创小作文</div>
      <div class="button-area" @click="changeIntroduceShow">
        <img src="@/assets/image/info.png" alt="">
      </div>
    </div>
  </div>
  <div class="introduce-phone" :class="isShowIntroduce ? '' : 'introduce-phone-none'">
    <div class="introduce-title">功能介绍</div>
    <div v-for="(item, index) in contentList" :key="index" class="introduce-text-content">
      <div>{{ item.content }}</div>
    </div>
    <div class="introduce-footer">
      <div class="display-center cursor introduce-footer-color" style="margin-right: 10px"
        @click="toTargetUrlWithNewWindow('https://github.com/ASoulCnki/')">
        <img src="@/assets/icons/githubIcon.svg" />
        查重接口仓库
      </div>
      <div class="display-center cursor introduce-footer-color" @click="
        toTargetUrlWithNewWindow('https://space.bilibili.com/1809170490')
      ">
        <img src="@/assets/icons/BilibiliIcon.svg" />
        查重接口反馈
      </div>
    </div>
  </div>
  <div class="DuplicateChecking">
    <div class="search-and-result">
      <div class="search-area">
        <textarea v-model="searchData.searchValue" placeholder="在这里输入小作文哦~(至少10个字)" maxlength="1000"
          class="search-textarea"></textarea>
        <div class="search-text-count">总字数:{{ searchData.searchValue.length }}/{{ searchData.maxLength }}</div>
        <div class="search-button" @click="getDuplicate()">立即查询</div>
      </div>

      <div class="result-area">
        <div v-for="item in DuplicateCheckingList" :key="item.date" class="result-item">
          <div class="result-item-flex">
            <div class="display-center">
              <div class="display-center cursor" @click="
                toTargetUrlWithNewWindow(
                  'https://space.bilibili.com/' + item.authorUid,
                )
              ">
                <img src="@/assets/image/tx.png" />
                <div class="result-item-author">{{ item.author }}</div>
              </div>
              
            </div>
            <div class="display-center cursor result-area-image" @click="copyResult(item)">
              <div class="result-area-image">
                <img src="@/assets/icons/cchong.svg" alt="">
                查重率: {{ item.rate }}%
                </div>
              <div class="result-area-image">
                <img src="@/assets/icons/fzhi.svg" />
                复制结果
              </div>
            </div>
          </div>
          <div class="result-item-content">{{ item.content }}</div>
          <div class="result-item-flex">
            <div class="display-center">
              <img src="@/assets/icons/time.svg" />
              <div>发表时间 {{ item.date }}</div>
            </div>
            <div class="display-center cursor" @click="toTargetUrlWithNewWindow(item.targetUrl)">
              <img src="@/assets/icons/comment.svg" />
              前往评论区
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="introduce-pc">
        <div class="introduce-title">功能介绍</div>
        <div v-for="(item, index) in contentList" :key="index" class="introduce-text-content">
          <div>{{ item.content }}</div>
        </div>
        <div class="introduce-footer">
          <div class="display-center cursor " style="margin-right: 20px"
            @click="toTargetUrlWithNewWindow('https://github.com/ASoulCnki/')">
            <img src="@/assets/icons/githubIcon.svg" />
            查重接口开源仓库
          </div>
          <div class="display-center cursor " @click="
            toTargetUrlWithNewWindow('https://space.bilibili.com/1809170490')
          ">
            <img src="@/assets/icons/BilibiliIcon.svg" />
            查重接口反馈
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
import useCurrentInstance from '@/hooks/useCurrentInstance';
import copyToClipBoard from '@/hooks/useCopyToClipBoard';
import { toTargetUrlWithNewWindow, getURLParam } from '@/hooks/useUtility';

interface DuplicateCheckingItem {
  targetUrl: string;
  content: string;
  author: string;
  authorUid: string;
  date: string;
  rate: string;
}

const contentList = [
  {
    content: '比对库内容范围: B站动态,视频评论区（仅限A-Soul的六个官方账号）',
  },
  {
    content: '比对库时间范围: 2020/11/23 21:18:26 至 2021/08/27 11:58:39',
  },
  {
    content: '参考文献: [1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学',
  },
];
const searchData = reactive({
  maxLength: 1000,
  searchValue: '',
  btnContent: '查询结果',
});
const DuplicateCheckingList = ref([] as DuplicateCheckingItem[]);

const { proxy } = useCurrentInstance();
// 方法
const getDuplicate = async () => {
  if (searchData.searchValue.length === 0) {
    return;
  }
  if (searchData.searchValue.length <= 10) {
    proxy.$Toast.show('请输入十字以上的小作文');
    return;
  }
  try {
    DuplicateCheckingList.value = [];
    const res = await proxy.$request({
      method: 'post',
      url: import.meta.env.VITE_API_DUPLICATECHECKING,
      data: {
        text: searchData.searchValue,
      },
    });
    if (res.related.length === 0) {
      proxy.$Toast.show('没有找到重复的小作文捏');
      return;
    }

    DuplicateCheckingList.value = res.related.map((item: any) => {
      return {
        targetUrl: item.reply_url,
        content: item.reply.content,
        author: item.reply.m_name,
        authorUid: item.reply.mid,
        // 将10位时间戳转成13位
        date: new Date(item.reply.ctime * 1000).toLocaleString('chinese', {
          hour12: false,
        }),
        rate: (item.rate * 100).toFixed(2),
      } as DuplicateCheckingItem;
    });
  } catch (error) {
    proxy.$Toast.showError(error, 'getDuplicate');
  }
};

const copyResult = (item: any) => {
  const Time = new Date().toLocaleString('chinese', {
    hour12: false,
  });
  const copyText = `枝网文本复制检测报告(ProJectASF)
      查重时间:${Time}
      总文字复制比:${item.rate}%
      相似小作文：${item.targetUrl}
      作者：${item.author}
      发表时间：${item.date}
      查重结果仅作参考，请注意辨别是否为原创
      `;
  copyToClipBoard(copyText);
};

const isShowIntroduce = ref(true);
const changeIntroduceShow = () => {
  isShowIntroduce.value = !isShowIntroduce.value;
};

const haveParam = () => {
  searchData.searchValue = getURLParam('search');
  getDuplicate();
};

onBeforeMount(() => {
  haveParam();
});
</script>

<style scoped lang="less">
.display-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cursor {
  cursor: pointer;
}

.DuplicateChecking {
  display: flex;
  color: #374151;
  .search-and-result {
    flex: 1;
  }

  .search-area {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgb(255,251,252);
    .search-textarea {
      width: 100%;
    min-width: 400px ;
    min-height: 300px ;
    max-height: 600px ;
      resize: none;
      padding: 10px 10px 40px 10px;
      font-size: 18px;
      color: #374151;
      border: 1px solid #EF6285;
      border-radius: 5px;
    }

    textarea:focus {
      outline: none;
    }

    textarea[class="search-textarea"]::-webkit-input-placeholder {
      font-size: 12px;
      color: #D1D5DB;
    }

    .search-text-count {
      position: absolute;
      bottom: 45px;
      right:-8px;
      font-size: 12px;
      transform: scale(0.83);
      transform-origin: left center;
      color: #6D6D6D;
    }

    .search-button {
      width: 80px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #EF6285;
      color: #f1f2f3;
      border-radius: 0 2px 2px 0;
      cursor: pointer;
      align-self: flex-end;
      margin-top: 10px;
      border-radius: 5px;
      font-weight: 600;
    }
  }

  .result-area {
    width: 100%;

    font-size: 16px;

    .result-item {
      margin: 10px 0 20px 0;
      padding: 5px 10px;
      background-color: rgb(254,247,249);
      border-radius: 10px;

      .result-item-flex {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        .result-item-author {
          margin-right: 10px;
          color: #555555;
          font-weight: 700;
          font-size: 16px;
        }

        .result-item-date {
          display: flex;
        }
      }

      .result-item-content {
        color: #555555;
        font-size: 16px;
        max-width: 1200px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
}
.result-area-image {
  color: #6D6D6D;
  &:nth-child(1) {
    margin-right: 5px;
  }
  img {
    width: 15px !important;
    height: 15px !important;
    position: relative;
    top: 3px;
    margin: 0 !important;
  }
}
.introduce-pc {
    background-color: rgb(254,248,249);
    width: 400px;
    min-height: 200px;
    margin-left: 40px;
    padding: 20px;
    border-radius: 10px;
}

.introduce-phone {
  display: none;
}

.introduce-title {
  // font-weight: 700;
  // font-size: 12px;
  // color: #555555;
  font-weight: 400;
    font-size: 24px;
    margin-bottom: 20px;
}

.introduce-text-content {
    font-size: 15px;
    margin: 10px 0;
  .introduce-text-content-section {
    margin-bottom: 20px;
  }
}

.introduce-footer {
    display: flex;
    align-items: center;
    margin-top: 40px;
    font-size: 18px;
  img {
    width: 30px;
    height: 30px;
  }
}
.introduce-footer-color {
  background: #EF6285;
  width: 110px;
  height: 25px;
  position: relative;
  left: 50px;
  border-radius: 3px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;
  img {
    width: 20px;
  }
}
@media only screen and (min-width: 768px) {
  .button-area {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
    .search-textarea {
      min-height: 115px !important;
      max-height: 115px !important;
    }
  .introduce-pc {
    display: none;
  }
  .introduce-phone {
    border-top: solid 1px #D0D0D0;
    display: block;
    padding: 10px;
    min-height: 135px;
    max-height: 135px;
    transition: all 0.3s;
    overflow: hidden;
    .introduce-title {
      font-weight: 700;
      font-size: 12px;
      color: #555555;
      margin: 0;
    }
    .introduce-text-content {
    font-size: 12px;
    color: #555555;
    white-space: nowrap;
    margin: 5px 0;
    transform: scale(0.83);
    transform-origin: left center;
      .introduce-text-content-section {
        margin-bottom: 20px;
      }
    }
    .introduce-footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 0;
    transform: scale(0.83);
    transform-origin: left center;
    white-space: nowrap;
    float: right;
    color: white;
    img {
      width: 20px;
      height: 20px;
    }
    }
  }

  .introduce-phone-none {
    min-height: 0;
    max-height: 0;
    opacity: 0;
    padding: 0 20px;
    margin-top: 0px;
  }

  .search-textarea {
    min-width: 0 !important;
  }

  .result-area {
    font-size: 12.4px !important;
  } 
}
.title-area {
  margin-top: 63px;
  height: 90px;
  background: rgb(255,251,252);
  .main-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .title-area-left {
      display: flex;
      align-items: center;
      position: relative;
      .main-title-font {
        font-size: 24px;
        margin-left: 5px;
        color: #EF6285;
      }
      img {
        width: 25px;
        height: 25px;
      }
    }
    .title-img {
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title-area-sub {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    padding: 0 10px;
    height: 30px;
    align-items: center;
    background: white;
    .sub-title {
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-image:-webkit-linear-gradient(top,#FFACC0, #EF6285);
    }
    .button-area {
      width: 25px;
      position: relative;
      left: 10px;
    }
  }
}
</style>
