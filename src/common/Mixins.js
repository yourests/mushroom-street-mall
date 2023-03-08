import BackTop from 'components/common/back-top/BackTop'

import Bus from 'components/common/mitt/Bus'

import { debounce } from 'common/Utils'
import { BACK_POSITION } from 'common/Constant'

export const itemImageLoadedMixin = {
  data() {
    return {
      imageLoadedListener: null,
    }
  },
  mounted() {
    // this.$refs.scroll 切换页面后重新进入为 null
    // 理论上 keep-alive 可解决, 但不符合实际应用
    // debounce 为封装的防抖函数
    const refresh = debounce(this.$refs.scroll?.refresh, 100)
    this.imageLoadedListener = () => {
      console.log('itemImageLoaded callback')
      refresh()
    }
    // 监听图片加载完成事件
    Bus.$on('itemImageLoaded', this.imageLoadedListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 返回顶部事件
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(currentOffsetTop) {
      if ((currentOffsetTop > BACK_POSITION) && (this.isShowBackTop == false)) {
        this.isShowBackTop = true
      } else if ((currentOffsetTop <= BACK_POSITION) && (this.isShowBackTop == true)) {
        this.isShowBackTop = false
      }
    },
  }
}