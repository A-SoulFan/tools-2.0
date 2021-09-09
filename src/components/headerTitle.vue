<template>
  <div class="title-area">
    <div class="main-title">{{ Title }}</div>

    <div class="title-area-sub">
      <div class="sub-title">
        {{ subTitle }}
      </div>
      <div class="button-area" @click="handleClick" v-if="buttonText !== ''">
        <div class="button-text">
          {{ buttonText }}
        </div>
        <img
          ref="arrowRef"
          v-if="buttonType === 'arrow'"
          class="button-icon"
          src="../assets/icons/arrow.svg"
        />

        <img
          v-if="buttonType === 'return'"
          class="button-icon"
          src="../assets/icons/return.svg"
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
    buttonText: {
      type: String,
    },
    buttonType: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const arrowRef: any = ref(null as HTMLElement | null);
    const handleClick = () => {
      emit("buttonClick");
      if (props.buttonType === "arrow") {
        if (arrowRef.value.style.transform === "") {
          arrowRef.value.style.transform = "rotateX(180deg)";
        } else {
          arrowRef.value.style.transform = "";
        }
      }
    };
    return {
      handleClick,
      arrowRef,
    };
  },
});
</script>

<style scoped>
.main-title {
  font-size: 34px;
  margin-bottom: 7.5px;
  color: #1f2937;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 12.41vw;
}
.button-text {
  font-size: 14px;
  margin-right: 3px;
}
.button-icon {
  width: 15px;
  height: 15px;
}
</style>
