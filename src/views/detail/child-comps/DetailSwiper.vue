<template>
  <swiper>
    <swiper-item v-for="(topImage, index) in topImages" :key="index" class="detail-swiper-item">
      <img :src="topImage" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      tpye: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>