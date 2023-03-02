<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(Pullup) // 注册 pullup 插件
BScroll.use(ObserveDOM) // 注册 observe-dom 插件

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bScroll: null
    }
  },
  mounted() {
    const Scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, // 决定是否派发 scroll 事件 (动态传入, 提高性能)
      pullUpLoad: this.pullUpLoad, // 使用 pullup 插件扩展上拉加载的能力（会导致 probeType 默认设置为3）
      // pullUpLoad: {
      //   threshold: 100  // 触发上拉事件的阈值, 默认为0
      // }
      observeDOM: true, // 开启 observe-dom 插件
      click: true // 决定是否派发原生 click 事件
    })

    this.bScroll = Scroll;

    // 监听 scroll 滚动事件
    if (this.pullUpLoad || this.probeType == 1 || this.probeType == 2 || this.probeType == 3) {
      this.bScroll?.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
    }

    // pullUpLoad为true时, 监听 pullingUp 上拉加载事件
    if (this.pullUpLoad) {
      this.bScroll?.on('pullingUp', () => {
        this.$emit('pullingUp')
        setTimeout(() => {
          // 准备下一次的 pullingUp 钩子(定时器避免频繁请求)
          this.bScroll?.finishPullUp()
        }, 2000);
      })
    }
  },
  methods: {
    // 调用方法前判断 bScroll 是否被创建
    scrollTo(x, y, time = 500) {
      console.log('scrollTo: ' + y);
      this.bScroll?.scrollTo(x, y, time)
    },
    refresh() {
      // 重新计算 bScroll 可滚动区域（用于解决异步加载使DOM结构发生改变，scrollerHeight 更新不及时）
      this.bScroll?.refresh()
    },
    getScrollY() {
      return this.bScroll?.y || 0
    }
  }
}
</script>

<style scoped></style>