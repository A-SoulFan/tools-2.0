<!-- 今天溜什么-->
<template>
  <header-title title="表情包" sub-title="你想要的表情包都在这里"></header-title>
  <div class="EmojiCollection">
    <div class="waterfall" ref="waterfallBox">
      <div
        class
        v-for="img in data.imgShowList"
        :key="img.id"
        :style="'width:' + img.width + 'px;height:' + img.height + 'px;'"
      >
        <img :src="'//' + img.url + `@` + img.width + 'w_' + img.height + 'h.webp'" />
      </div>
    </div>

    <div>
      <div class="introduce-pc">
        <div class="introduce-title">功能介绍</div>
        <div class="introduce-text-content">
          <div class="introduce-text-content">请速度去b站给五小只点点关注捏(♡ ὅ ◡ ὅ )ʃ♡</div>
          <div class="introduce-Asoul">
            <div
              v-for="item in Asoul"
              :key="item.BzhanUid"
              :style="'color:' + item.color"
              class="introduce-Asoul-item"
              @click="toBilibiliSpace(item.BzhanUid)"
            >
              <img :src="item.face" class="introduce-Asoul-face" />
              <div class="introduce-Asoul-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import headerTitle from '../components/HeaderTitle.vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'

export interface itemObj {
  id: number
  url: string
  height: number
  width: number
}

export default defineComponent({
  components: { headerTitle },
  setup() {
    const { proxy } = useCurrentInstance()
    const waterfallBox = ref<null | HTMLElement>(null)
    const Width = 250;
    const boxWidth = ref<number>(0)
    const Asoul = [
      {
        name: '向晚大魔王',
        color: '#9ac8e2',
        BzhanUid: 672346917,
        face: 'https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@256w_256h_1o.webp',
      },
      {
        name: '贝拉Kira',
        color: '#db7d74',
        BzhanUid: 672353429,
        face: 'https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg@256w_256h_1o.webp',
      },
      {
        name: '珈乐Carol',
        color: '#b8a6d9',
        BzhanUid: 351609538,
        face: 'https://i2.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg@256w_256h_1o.webp',
      },
      {
        name: '嘉然今天吃什么',
        color: '#e799b0',
        BzhanUid: 672328094,
        face: 'https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@256w_256h_1o.webp',
      },
      {
        name: '乃琳Queen',
        color: '#576690',
        BzhanUid: 672342685,
        face: 'https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg@256w_256h_1o.webp',
      },
    ]
    const data = reactive({
      imgShowList: [] as any[],
      waterList: Array.from(Array(4), () => new Array(0)),
      initDate: [] as itemObj[]
    })
    // const res = ref<itemObj[]>([])
    // 获取列表


    const getEmojiList = async () => {
      const res: Array<itemObj> = await proxy.$request({
        url: import.meta.env.VITE_API_EMOJI,
        params: {
          page: 1,
          limit: 20,
        },
      })
      data.initDate.push(...res)

      // data.imgShowList = res
      let tempList = res.map((item: itemObj) => {
        return {
          width: Width,
          height: Math.floor((item.height) / (item.width) * Width),
          url: '//' + item.url,
          id: item.id
        }
      }).sort((a, b) => {
        return a.height - b.height
      })
      data.imgShowList = [...data.imgShowList, ...tempList]
      console.log(data.imgShowList);

    }

    const toBilibiliSpace = (uid: number) => {
      window.open(`https://space.bilibili.com/${uid}`)
    }

    return {
      data,
      waterfallBox,
      Asoul,
      boxWidth,
      Width,
      toBilibiliSpace,
      getEmojiList
    }
  },
  async mounted() {
    await this.getEmojiList()

    window.onresize = () => {
      this.boxWidth = this.waterfallBox!.clientWidth
      console.log(this.boxWidth);
      this.data.waterList = Array.from(Array(Math.floor(this.boxWidth / this.Width)), () => new Array(0))
    }
  }
})
</script>

<style scoped lang="less">
.EmojiCollection {
  display: flex;
  margin-top: 20px;
  color: #374151;
}

.waterfall {
  border: 1px solid #374151;
  flex: 1;
  display: flex;
}

//
.introduce-pc {
  background-color: #f3f4f6;
  width: calc(22.4vw - 40px);
  min-width: 300px;
  min-height: 200px;
  margin-left: 20px;
  padding: 20px;
  border-radius: 2px;
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
  color: #666;
  text-decoration: underline;
}
.introduce-Asoul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .introduce-Asoul-item {
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    cursor: pointer;
    width: 65px;
  }
  .introduce-Asoul-face {
    width: 67px;
    height: 67px;
    border-radius: 50%;
  }
  .introduce-Asoul-name {
    margin-top: 5px;
    font-size: 12px;
  }
}
//
@media only screen and (max-width: 768px) {
  .introduce-pc {
    display: none;
  }
}
</style>

