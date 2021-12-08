<!-- 今天溜什么-->
<template>
  <header-title title="表情包" sub-title="你想要的表情包都在这里"></header-title>
  <div class="EmojiCollection">
    <div class="waterfall" ref="waterfallBox">
      <div v-for="item in waterfallData.waterfallList" class="waterfall-list">
        <div
          class="waterfall-item"
          v-for="img in item"
          :key="img.id"
          :style="'padding-top:' + img.paddingTop + '%;'"
        >
          <img
            class="waterfall-item-img"
            data-loaded="false"
            :data-src="img.url + `@` + img.width + 'w_' + img.height + 'h.webp'"
          />
          <img
            @click="downloadImage(img)"
            class="waterfall-download-img"
            src="@/assets/icons/coolicon.svg"
          />
        </div>
      </div>
    </div>

    <div>
      <div class="introduce-pc">
        <div class="introduce-title">功能介绍</div>
        <div class="introduce-text-content">
          <div class="introduce-text-content">请速度去b站给五小只点点关注捏(♡ ὅ ◡ ὅ )ʃ♡</div>
          <div class="introduce-Asoul">
            <introduceAsoul></introduceAsoul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import headerTitle from '../components/HeaderTitle.vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import introduceAsoul from '@/components/IntroduceAsoul.vue'
import downloadImage from '@/hooks/useDownloadImage'


export interface imgObj {
  id: number
  url: string
  height: number
  width: number
  paddingTop: string
  name: string
}

export default defineComponent({
  components: { headerTitle, introduceAsoul },
  setup() {
    const { proxy } = useCurrentInstance()
    const waterfallBox = ref<null | HTMLElement>(null)
    let Width = 250;
    let init = true
    const waterfallData = reactive({
      // imgShowList: [] as any[],
      waterfallList: Array.from(Array(4), () => new Array(0)) as imgObj[][], //瀑布流数组
      waterfallHeightList: new Array(4).fill(0),
      waterfallIndex: 0,
      column: 4,
      boxWidth: 0,
      initData: [] as imgObj[]
    })
    // 设置瀑布流数据
    const timeResize = ref(false) //节流
    const setWaterfallData = async () => {
      const W = Width
      if (document.body.clientWidth > 768) {
        Width = 250
      } else {
        Width = 150
      }
      // 图片宽度变化或者初始化
      if (W !== Width || init) {
        init = false
        waterfallData.column = Math.floor(waterfallBox.value!.clientWidth / Width) >= 1 ? Math.floor(waterfallBox.value!.clientWidth / Width) : 1
        waterfallData.initData.forEach((item) => {
          item.height = Math.floor((item.height) / (item.width) * Width)
          item.width = Width
        })
        changeWaterfallList()
      } else {
        if (!timeResize.value) {
          timeResize.value = true
          setTimeout(async () => {
            waterfallData.boxWidth = waterfallBox.value!.clientWidth
            const column = Math.floor(waterfallBox.value!.clientWidth / Width) >= 1 ? Math.floor(waterfallBox.value!.clientWidth / Width) : 1
            // 列数有变
            if (waterfallData.column !== column) {
              waterfallData.column = column
              changeWaterfallList()
            }
            timeResize.value = false
          }, 200);
        }
      }

    }
    // 改变瀑布流数组
    const changeWaterfallList = async () => {
      const column = waterfallData.column
      waterfallData.waterfallList = Array.from(Array(column), () => new Array(0))
      waterfallData.waterfallHeightList = new Array(column).fill(0)
      waterfallData.waterfallList = Array.from(Array(column), () => new Array(0))
      waterfallData.initData.forEach((item) => {
        waterfallData.waterfallIndex = waterfallData.waterfallHeightList.indexOf(Math.min(...waterfallData.waterfallHeightList))
        waterfallData.waterfallList[waterfallData.waterfallIndex].push(item)
        waterfallData.waterfallHeightList[waterfallData.waterfallIndex] += item.height
      })
      await nextTick()
      lazyLoad()
    }



    let page = 1, isLastPage = false
    // 获取列表
    const getEmojiList = async () => {
      if (isLastPage) {
        return
      }
      try {
        const res: Array<imgObj> = await proxy.$request({
          url: import.meta.env.VITE_API_EMOJI,
          params: {
            page,
            limit: 100,
          },
        })
        if (res.length < 100) {
          isLastPage = true
        }
        let tempList = res.map((item: imgObj) => {
          return {
            name: item.url.split('/')[(item.url.split('/')).length - 1],
            height: Math.floor((item.height) / (item.width) * Width),
            width: Width,
            url: 'https://' + item.url,
            id: item.id,
            paddingTop: (((item.height) / (item.width)) * 100).toFixed(2)
          }
        })
        waterfallData.initData.push(...tempList)
        tempList.forEach((item) => {
          waterfallData.waterfallIndex = waterfallData.waterfallHeightList.indexOf(Math.min(...waterfallData.waterfallHeightList))
          waterfallData.waterfallList[waterfallData.waterfallIndex].push(item)
          waterfallData.waterfallHeightList[waterfallData.waterfallIndex] += item.height
        })
      } catch (error) {
        proxy.$Toast.showError(error)
      }
    }


    const timeBoxScroll = ref(false) //节流
    const listensBoxScroll = () => {
      // 监听scroll事件函数
      if (isLastPage) {
        return
      }
      if (!timeBoxScroll.value) {
        timeBoxScroll.value = true
        setTimeout(async () => {
          // 目前窗口底部离容器顶部的距离
          let TopOffsetHeight = document.documentElement.scrollTop + document.documentElement.offsetHeight
          let scrollHeight = document.documentElement.scrollHeight
          // 离底部100px触发翻页
          if (TopOffsetHeight + 100 >= scrollHeight) {
            page++;
            await getEmojiList()

            lazyLoad()
            // this.lazyLoadimg()
          }
          timeBoxScroll.value = false
        }, 200)
      }
    }
    // 懒加载
    const lazyLoad = () => {
      // 创建观察器
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target

            const loaded = img.getAttribute('data-loaded')
            if (loaded == "true") {
              return
            }

            const src = img.getAttribute('data-src')
            img.setAttribute('src', src!)
            img.setAttribute('data-loaded', "true")
            observer.unobserve(entry.target)
          }
        });
      }, {
        root: null,
        threshold: [0],
        rootMargin: '100px'
      })
      const length = waterfallBox.value!.children.length
      for (let i = 0; i < length; i++) {
        waterfallBox.value!.children[i].querySelectorAll(".waterfall-item-img").forEach((ele) => {
          observer.observe(ele)
        })
      }
    }
    onMounted(async () => {
      await setWaterfallData()
      waterfallData.boxWidth = waterfallBox.value!.clientWidth
      await getEmojiList()
      lazyLoad()
      window.addEventListener('scroll', listensBoxScroll)
      window.addEventListener('resize', setWaterfallData)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', listensBoxScroll)
      window.removeEventListener('resize', setWaterfallData)
    })

    return {
      waterfallData,
      waterfallBox,
      downloadImage,
    }
  },
})
</script>

<style scoped lang="less">
.EmojiCollection {
  display: flex;
  margin-top: 20px;
  color: #374151;
}

.waterfall {
  flex: 1;
  display: flex;
  // justify-content: space-around;
  .waterfall-list {
    flex: 1;
    margin-right: 10px;
    max-width: 300px;
  }
  .waterfall-item {
    margin-bottom: 20px;
    background-color: #f3f4f6;
    position: relative;
    width: 100%;
    box-shadow: 1px 1px 4px #a1a2a3;
  }
  .waterfall-item-img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
  }
  .waterfall-download-img {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #f3f4f6;
    cursor: pointer;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
}

//
.introduce-pc {
  background-color: #f3f4f6;
  width: 360px;
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
//
@media only screen and (max-width: 768px) {
  .introduce-pc {
    display: none;
  }
}
</style>

