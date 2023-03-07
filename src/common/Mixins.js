import Bus from 'components/common/mitt/Bus'
import { debounce } from 'common/Utils'

export const itemImageLoadedMixin = {
  data() {
    return {
      imageLoadedListener: null,
      isShowBackTop: false
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
  },
  methods: {
    // 返回顶部事件
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    scroll(position) {
      // BackTop 组件是否显示
      console.log(2);
      // if ((Math.abs(position.y) > 1000) && (this.isShowBackTop == false)) {
      //   this.isShowBackTop = true
      // } else if ((Math.abs(position.y) <= 1000) && (this.isShowBackTop == true)) {
      //   this.isShowBackTop = false
      // }
    }
  }
}