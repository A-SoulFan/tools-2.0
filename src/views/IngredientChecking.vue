<template>
  <div>
    <headerTitle Title="成分姬" subTitle="帮助你快速分析用户成分"></headerTitle>
    <div class="introduce-phone">功能介绍</div>
    <div class="ingredient">
      <div style="flex-grow: 1">
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
            <div class="Vup-item" v-for="item in vupList" :key="item.vupUid">
              <img :src="item.vupFace" alt="" srcset="" class="Vup-item-face" />
              <div class="Vup-name">{{ item.vupName }}</div>
              <div class="Vup-describe">
                {{ item.officalVerify }}
              </div>
              <div class="divider"></div>
              <div class="Vup-sign">
                {{ item.vupSign }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="introduce-pc">功能介绍</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import headerTitle from "../components/headerTitle.vue";
import useCurrentInstance from "@/hooks/useCurrentInstance";
export default defineComponent({
  components: { headerTitle },
  setup() {
    const { proxy } = useCurrentInstance();

    let vupList = ref([]);
    let buttonText = ref("查询结果");
    const getIngredient = async () => {
      try {
        proxy.$loading.show("12321312");
        const res = await proxy.$request({
          url: "cfj/",
          params: {
            name: "贝拉Kira",
          },
        });
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
              vupFace: item.face,
            };
          }
        );
        console.log(vupList);
        proxy.$loading.hide();
        // debugger;
      } catch (error) {
        console.log(error);
      }
    };
    getIngredient();
    return {
      getIngredient,
      vupList,
      buttonText,
    };
  },
});
</script>

<style scoped lang="less">
.ingredient {
  display: flex;
  padding-top: 30px;
  width: 100%;
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
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        .Vup-item-face {
          background-color: #d1d5db;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90px;
          height: 90px;
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
    width: 300px;
    min-width: 200px;
    height: 280px;
    margin-left: 20px;
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
    height: 180px;
  }
}
</style>
