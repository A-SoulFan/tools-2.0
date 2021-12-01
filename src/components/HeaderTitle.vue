<template>
  <div class="title-area">
    <div class="main-title">
      {{ title }}
    </div>

    <div class="title-area-sub">
      <div class="sub-title">
        {{ subTitle }}
      </div>
      <div v-if="needButton" class="button-area" @click="handleClick">
        <div class="button-text">
          {{ buttonText }}
        </div>
        <img
          class="button-icon"
          :class="isTopIcon ? '' : 'rotate-top'"
          src="@/assets/icons/arrow.svg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
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
    const buttonText = ref<string>('收起')
    const isTopIcon = ref(true)
    const handleClick = () => {
      context.emit('buttonClick',!isTopIcon.value)
      // false
      if (!isTopIcon.value)
        buttonText.value = '收起'
      else
        buttonText.value = '详情'

      isTopIcon.value = !isTopIcon.value
    }
    return {
      handleClick,
      buttonText,
      isTopIcon,
    }
  },
})
</script>

<style scoped lang="less">
// @import "@/assets/css/keyframes.css";
@import "../../src/assets/css/keyframes.css";

.main-title {
  font-size: 34px;
  margin-bottom: 7.5px;
  color: #1f2937;
}
.title-area {
  position: relative;
  animation: herderTitle 0.5s;
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
  .title-area{
    margin-top: 70px;
  }
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
