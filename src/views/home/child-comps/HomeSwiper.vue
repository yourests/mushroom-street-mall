<template>
  <swiper>
    <swiper-item v-for="(banner, index) in banners" :key="index">
      <a :href="banner.link">
        <img :src="banner.image" alt="" @load="imageLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoaded: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoaded() {
      // 限制只发射一次事件，相对在父组件中使用修饰符.once则是发送多次，只触发一次回调函数
      if (!this.isLoaded) {
        this.$emit('swiperImageLoaded')
        this.isLoaded = true
      }
    }
  }
}
</script>

<style scoped></style>