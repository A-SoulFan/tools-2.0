<template>
  <div>
    <waterfall :col="col" :data="data">
      <!--  @loadmore="loadmore"
          @scroll="scroll" -->
      <template>
        <div class="cell-item" v-for="(item, index) in data" :key="index">
          <img :src="item.url" alt="加载错误" />
          <div class="item-body">
            <div class="item-desc">{{ item.title }}</div>
            <div class="item-footer">
              <div class="footer-left">
                <img :src="item.avatar" alt="" srcset="" />
                <div class="name">{{ item.id }}</div>
              </div>
              <div class="like">
                <div class="like-total">{{ item.id }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      col: 4,
      listone: [],
    };
  },
  methods: {},
};
</script>
