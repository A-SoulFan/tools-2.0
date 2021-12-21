<template>
  <headerTitle title="枝江债单" sub-title="许下的诺言是前进的动力" @buttonClick="changeIntroduceShow"></headerTitle>
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import headerTitle from '@/components/HeaderTitle.vue'
import introduceAsoul from '@/components/IntroduceAsoul.vue'

import useCurrentInstance from '@/hooks/useCurrentInstance'
import toTargetUrlWithNewWindow from '@/hooks/useUtility'

interface categoriesList {
  name: string
  children: categoriesList[]
  cid: number
}

export default defineComponent({
  name: 'ZhijiangDict',
  components: { headerTitle, introduceAsoul },
  setup() {
    const { proxy } = useCurrentInstance()
    const isShowIntroduce = ref(true)
    const changeIntroduceShow = (e: boolean) => {
      isShowIntroduce.value = e
    }
    return {
      changeIntroduceShow,
      isShowIntroduce
    }
  },
})
</script>

<style lang="less" module>
.updateTimeArea {
  margin-top: 20px;
  display: flex;
  align-items: center;
  .iconClock {
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }
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
