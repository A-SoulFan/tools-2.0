<template>
  <div class="title-area">
    <div class="main-title">{{ Title }}</div>

    <div class="title-area-sub">
      <div class="sub-title">
        {{ subTitle }}
      </div>
      <div class="button-area" @click="handleClick" v-if="needButton">
        <div class="button-text">
          {{ buttonText }}
        </div>
        <img
          class="button-icon"
          :class="isTopIcon ? '' : 'rotate-top'"
          src="../assets/icons/arrow.svg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    Title: {
      type: String,
      require: true,
    },
    subTitle: {
      type: String,
    },
    needButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop, context) {
    console.log(prop);
    const buttonText = ref<string>("详情");
    const isTopIcon = ref(true);
    const handleClick = () => {
      context.emit("buttonClick");
      // false
      if (!isTopIcon.value) {
        buttonText.value = "详情";
      } else {
        buttonText.value = "收起";
      }
      isTopIcon.value = !isTopIcon.value;
    };
    return {
      handleClick,
      buttonText,
      isTopIcon,
    };
  },
});
</script>

<style scoped lang="less">
.main-title {
  font-size: 34px;
  margin-bottom: 7.5px;
  color: #1f2937;
}
.title-area {
  margin-top: 60px;
}
.title-area-sub {
  display: flex;
  justify-content: space-between;
}
.sub-title {
  font-size: 17px;
  color: #374151;
}
.button-area {
  display: none;
}

@media only screen and (max-width: 768px) {
  .button-area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    .button-text {
      font-size: 14px;
      margin-right: 3px;
    }
    .button-icon {
      width: 15px;
      height: 15px;
      transform: rotate(0);
      transition: linear 0.2s;
    }
    .rotate-top {
      transform: rotate(180deg) !important;
      transition: linear 0.2s;
    }
  }
}
</style>
