<template>
  <div class="title-area">
    <div class="main-title">{{ Title }}</div>

    <div class="title-area-sub">
      <div class="sub-title">
        {{ subTitle }}
      </div>
      <div class="button-area">
        <div class="button-text">
          {{ buttonText }}
        </div>
        <div class="button-icon">
          <img v-if="button === 'arrow'" src="../assets/icons/Vector.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    Title: {
      type: String,
      require: true,
    },
    buttonText: {
      type: String,
    },
  },
});
</script>

<style scoped>
.main-title {
  font-size: 32px;
  margin-bottom: 20px;
}
</style>
