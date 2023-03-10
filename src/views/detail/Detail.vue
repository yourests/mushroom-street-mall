<template>
  <div id="detail">
    <!-- 详情导航栏 -->
    <detail-nav-bar class="detail-nav-bar" @navBarClick="navBarClick" ref="detailNavBar" />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="false" @scroll="scroll">
      <!-- 详情轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 详情基本信息 -->
      <detail-base-info :goods-detail="goodsDetail" />
      <!-- 详情店铺信息 -->
      <detail-shop-info :shop-detail="shopDetail" />
      <!-- 详情图片信息 -->
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad" />
      <!-- 详情参数信息 -->
      <detail-param-info :param-info="paramInfo" ref="detailParamInfo" />
      <!-- 详情评论信息 -->
      <detail-comment-info :comment-info="commentInfo" ref="detailCommentInfo" />
      <!-- 详情推荐信息 -->
      <goods-list :goods="recommends" ref="detailRecommends" />
    </scroll>
    <!-- 详情底部 -->
    <detail-bottom-bar @addCart="addCart" />
    <!-- 返回顶部 -->
    <back-top @click="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './child-comps/DetailNavBar'
import DetailSwiper from './child-comps/DetailSwiper'
import DetailBaseInfo from './child-comps/DetailBaseInfo'
import DetailShopInfo from './child-comps/DetailShopInfo'
import DetailImagesInfo from './child-comps/DetailImagesInfo'
import DetailParamInfo from './child-comps/DetailParamInfo'
import DetailCommentInfo from './child-comps/DetailCommentInfo'
import DetailBottomBar from './child-comps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import Bus from 'components/common/mitt/Bus'
import GoodsList from 'components/content/goods-list/GoodsList'

import { getDetailByIid, getRecommend, GoodsDetail, ShopDetail, GoodsParam } from 'network/detail'
import { itemImageLoadedMixin, backTopMixin } from 'common/Mixins'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsDetail: {},
      shopDetail: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      sectionOffsetTops: []
      // isShowBackTop: false,
      // imageLoadedListener: null
    }
  },
  created() {
    console.log('Detail created()')
    // 保存请求的iid
    this.iid = this.$route.params.iid
    // 根据iid获取详情数据
    getDetailByIid(this.iid).then(res => {
      const result = res.result
      console.log('result: ', result)
      // 获取图片轮播数据
      this.topImages = result.itemInfo.topImages
      // 获取商品数据
      this.goodsDetail = new GoodsDetail(result.itemInfo, result.columns, result.shopInfo.services)
      // 获取店铺数据
      this.shopDetail = new ShopDetail(result.shopInfo)
      // 获取商品图片详细信息
      this.detailInfo = result.detailInfo
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)
      // 获取商品评论信息
      if (result.rate.cRate !== 0) {
        this.commentInfo = result.rate.list[0]
      }
      // 获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      // 获取商品(0)，参数，评论，推荐板块的 offsetTop 以便头部点击跳转
      // 图片依然没有加载出来
      // this.$nextTick(() => {
      //   this.sectionOffsetTops = []
      //   this.sectionOffsetTops.push(0)
      //   this.sectionOffsetTops.push(this.$refs.detailParamInfo.$el.offsetTop)
      //   this.sectionOffsetTops.push(this.$refs.detailCommentInfo.$el.offsetTop)
      //   this.sectionOffsetTops.push(this.$refs.detailRecommends.$el.offsetTop)
      //   console.log(this.sectionOffsetTops);
      // })
    })
  },
  mounted() {
    // 封装到 Mixins.js 中
    // const refresh = debounce(this.$refs.scroll?.refresh, 100)
    // this.imageLoadedListener = () => {
    //   console.log(222);
    //   refresh()
    // }
    // Bus.$on('itemImageLoaded', this.imageLoadedListener)
  },
  updated() {
    // 获取商品(0)，参数，评论，推荐板块的 offsetTop 以便头部点击跳转
    // this.sectionOffsetTops.push(0)
    // this.sectionOffsetTops.push(this.$refs.detailParamInfo.$el.offsetTop)
    // this.sectionOffsetTops.push(this.$refs.detailCommentInfo.$el.offsetTop)
    // this.sectionOffsetTops.push(this.$refs.detailRecommends.$el.offsetTop)
    // console.log(this.sectionOffsetTops);
  },
  unmounted() {
    // 取消监听detail页面的图片加载完成事件
    Bus.$off('itemImageLoaded')
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    Bus,
    GoodsList
  },
  mixins: [itemImageLoadedMixin, backTopMixin],
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
      // 多次调用前清空数组
      this.sectionOffsetTops = []
      this.sectionOffsetTops.push(0)
      this.sectionOffsetTops.push(this.$refs.detailParamInfo.$el.offsetTop - 44)
      this.sectionOffsetTops.push(this.$refs.detailCommentInfo.$el.offsetTop - 44)
      this.sectionOffsetTops.push(this.$refs.detailRecommends.$el.offsetTop - 44)
    },
    scroll(position) {
      // 获取实时滚动位置
      let currentOffsetTop = Math.abs(position.y)
      // BackTop 组件是否显示
      this.listenShowBackTop(currentOffsetTop)
      // 导航栏选中随滚动自动切换
      for (let [k, v] of this.sectionOffsetTops.entries()) {
        if (k < this.sectionOffsetTops.length - 1) {
          if ((currentOffsetTop >= this.sectionOffsetTops[k]) && (currentOffsetTop < this.sectionOffsetTops[k + 1]) && (this.$refs.detailNavBar.currentIndex !== k)) {
            this.$refs.detailNavBar.currentIndex = k
          }
        } else { // 防止数组下标越界
          if ((currentOffsetTop >= this.sectionOffsetTops[k]) && (this.$refs.detailNavBar.currentIndex !== k)) {
            this.$refs.detailNavBar.currentIndex = k
          }
        }
      }
      // if ((currentOffsetTop < this.sectionOffsetTops[1]) && (this.$refs.detailNavBar.currentIndex !== 0)) {
      //   this.$refs.detailNavBar.currentIndex = 0
      // } else if ((currentOffsetTop >= this.sectionOffsetTops[1]) && (currentOffsetTop < this.sectionOffsetTops[2]) && (this.$refs.detailNavBar.currentIndex !== 1)) {
      //   this.$refs.detailNavBar.currentIndex = 1
      // } else if ((currentOffsetTop >= this.sectionOffsetTops[2]) && (currentOffsetTop < this.sectionOffsetTops[3]) && (this.$refs.detailNavBar.currentIndex !== 2)) {
      //   this.$refs.detailNavBar.currentIndex = 2
      // } else if ((currentOffsetTop >= this.sectionOffsetTops[3]) && (this.$refs.detailNavBar.currentIndex !== 3)) {
      //   this.$refs.detailNavBar.currentIndex = 3
      // }
    },
    navBarClick(index) {
      this.$refs.scroll.scrollTo(0, -this.sectionOffsetTops[index])
    },
    addCart() {
      // 添加到购物车中的信息
      const obj = {
        image: this.topImages[0],
        title: this.goodsDetail.title,
        desc: this.goodsDetail.desc,
        price: this.goodsDetail.realPrice,
        iid: this.iid
      }
      this.$store.dispatch('addCart', obj)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  height: 100vh;
  background-color: #fff;
}

.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 9;
}

.content {
  /* position: absolute;
  top: 44px;
  bottom: 0;
  overflow: hidden; */
  height: calc(100% - 44px - 58px);
  overflow: hidden;

}
</style>