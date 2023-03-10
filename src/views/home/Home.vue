<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:nav-bar-center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- 头部选项卡 -->
    <tab-control class="tabControl-Top" ref="tabControlTop" :titles="['流行', '新款', '精选']" @tabClick="tabClick"
      v-show="isTabContrlFixed" />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="scroll" @pulling-up="loadMore">
      <!-- 首页轮播图 -->
      <home-swiper :banners="banners" @swiper-image-loaded="swiperImageLoaded" />
      <!-- 首页推荐 -->
      <home-recommend :recommends="recommends" />
      <!-- 首页本周流行 -->
      <home-popular />
      <!-- 中间选项卡 -->
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <!-- 商品列表 -->
      <goods-list :goods="getGoodsByType" />
    </scroll>
    <!-- 返回顶部 -->
    <back-top @click="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './child-comps/HomeSwiper'
import HomeRecommend from './child-comps/HomeRecommend'
import HomePopular from './child-comps/HomePopular'

import NavBar from 'components/common/nav-bar/NavBar'
import TabControl from 'components/common/tab-control/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import Bus from 'components/common/mitt/Bus'
import GoodsList from 'components/content/goods-list/GoodsList'

import { getHomeMultiData, getHomeData } from 'network/home'
import { itemImageLoadedMixin, backTopMixin } from 'common/Mixins'

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabControlOffsetTop: 0,
      isTabContrlFixed: false,
      saveY: 0,
      // imageLoadedListener: null
    }
  },
  components: {
    HomeSwiper,
    HomeRecommend,
    HomePopular,
    NavBar,
    TabControl,
    Scroll,
    GoodsList
  },
  mixins: [itemImageLoadedMixin, backTopMixin],
  created() {
    console.log('Home created.');
    // 请求 "/home/multidata"
    this.getHomeMultiData()

    // 请求 "/home/data?type=xxx&page=1"
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  mounted() {
    // 封装到 Mixins.js 中
    // this.$refs.scroll 切换页面后重新进入为 null, 理论上 keep-alive 可解决, 但不符合实际应用
    // debounce 为封装的防抖函数
    // const refresh = debounce(this.$refs.scroll?.refresh, 100)
    // this.imageLoadedListener = () => {
    //   console.log(111)
    //   refresh()
    // }
    // 监听图片加载完成事件
    // Bus.$on('itemImageLoaded', this.imageLoadedListener)
  },
  activated() {
    // 激活页面时滚动到上次离开时的位置
    console.log('saveY: ' + this.saveY);
    // 每次重新进入页面刷新一次避免返回顶部的bug（切换页面后未知原因触发上拉加载更多事件，因此要重新计算可滚动区域）
    this.$refs.scroll.refresh() // 必须在滚动之前刷新
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 重新监听home页面的图片加载完成事件（第一次进入home页面跳过避免重复监听）
    if (Bus.$all.get('itemImageLoaded')?.length == 0) {
      Bus.$on('itemImageLoaded', this.imageLoadedListener)
    }
  },
  deactivated() {
    // 离开页面时记录当前滚动Y坐标
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消监听home页面的图片加载完成事件
    Bus.$off('itemImageLoaded')
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        console.log('getHomeMultiData:');
        console.log(res);
        console.log('====================');
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeData(type) {
      let page = this.goods[type].page + 1
      getHomeData(type, page).then(res => {
        console.log('getHomeData:');
        console.log(res)
        console.log('====================');
        this.goods[type].list = this.goods[type].list.concat(res.data.list)
        // this.goods[type].list.push(...res.data.list)
        // this.$refs.scroll.refresh()
        this.goods[type].page = page
      })
    },
    // 切换TabControl Type事件
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index]
      // 让两个TabControl组件中currentIndex保持一致
      this.$refs.tabControl.currentIndex = this.$refs.tabControlTop.currentIndex = index
    },
    // bScroll 滚动事件
    scroll(position) {
      // 获取实时滚动位置
      let currentOffsetTop = Math.abs(position.y)
      // BackTop 组件是否显示
      this.listenShowBackTop(currentOffsetTop)
      // TabControl 组件的吸顶
      if ((currentOffsetTop >= this.tabControlOffsetTop) && (this.isTabContrlFixed == false)) {
        this.isTabContrlFixed = true
      } else if ((currentOffsetTop < this.tabControlOffsetTop) && (this.isTabContrlFixed == true)) {
        this.isTabContrlFixed = false
      }
    },

    // 上拉加载更多事件
    loadMore() {
      console.log('loading more...');
      this.getHomeData(this.currentType)
    },
    // 轮播图第一张图片加载完成后刷新 TabControl offsetTop
    swiperImageLoaded() {
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
  },
  computed: {
    getGoodsByType() {
      return this.goods[this.currentType].list
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9; */
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 8;
} */

.tabControl-Top {
  position: relative;
  top: -1px;
  z-index: 9;
}

.content {
  /* height: calc(100%;) */
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  /* background-color: #fff; */
}
</style>