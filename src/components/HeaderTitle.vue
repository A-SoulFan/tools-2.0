<template>
  <div class="title-area">
    <div class="main-title">{{ title }}</div>

    <div class="title-area-sub">
      <div class="sub-title">{{ subTitle }}</div>
      <div v-if="!returnButton" class="button-area" @click="handleClick">
        <div class="button-text">{{ buttonText }}</div>
        <img
          class="button-icon"
          :class="isTopIcon ? 'rotate-top' : ''"
          src="@/assets/icons/arrow.svg"
        />
      </div>
      <div v-else class="return-button-area" @click="returnClick">
        <div class="button-text">返回</div>
        <img class="button-icon" src="@/assets/icons/return.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      require: true,
    },
    subTitle: {
      type: String,
    },
    returnButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, context) {
    const buttonText = ref<string>('收起');
    const isTopIcon = ref(true);
    const handleClick = () => {
      context.emit('buttonClick', !isTopIcon.value);
      // false
      if (!isTopIcon.value) buttonText.value = '收起';
      else buttonText.value = '详情';
      isTopIcon.value = !isTopIcon.value;
    };
    const returnClick = () => {
      context.emit('returnClick');
    };
    return {
      handleClick,
      returnClick,
      buttonText,
      isTopIcon,
    };
  },
});
</script>

<style scoped lang="less">
@import '../../src/assets/css/keyframes.css';

.main-title {
  font-size: 34px;
  margin-bottom: 7.5px;
  color: #1f2937;
}
.title-area {
  position: relative;
  animation: faceInToRight 0.3s ease-in-out both;
  margin-top: 70px;
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
.return-button-area {
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
  }
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
