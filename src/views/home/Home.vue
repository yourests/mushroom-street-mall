<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:nav-bar-center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control class="tabControl-Top" ref="tabControlTop" :titles="['流行', '新款', '精选']" @tabClick="tabClick"
      v-show="isTabContrlFixed" />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="scroll" @pulling-up="loadMore">
      <home-swiper :banners="banners" @swiper-image-loaded="swiperImageLoaded" />
      <home-recommend :recommends="recommends" />
      <home-popular />
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="getGoodsByType" />
    </scroll>
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
import BackTop from 'components/common/back-top/BackTop'
import Bus from 'components/common/mitt/Bus'
import GoodsList from 'components/content/goods-list/GoodsList'

import { getHomeMultiData, getHomeData } from 'network/home'
import { debounce } from 'common/Utils'

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
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isTabContrlFixed: false,
      offsetYWhenLeaving: 0
    }
  },
  components: {
    HomeSwiper,
    HomeRecommend,
    HomePopular,
    NavBar,
    TabControl,
    Scroll,
    BackTop,
    GoodsList
  },
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
    // this.$refs.scroll 切换页面后重新进入为 null, 理论上 keep-alive 可解决, 但不符合实际应用
    // debounce 为封装的防抖函数
    const refresh = debounce(this.$refs.scroll?.refresh, 100)
    // this.$refs.tabControl.$el.offsetTop
    // 监听图片加载完成事件
    Bus.$on('itemImageLoaded', () => {
      refresh()
    })
  },
  activated() {
    // 激活页面时滚动到上次离开时的位置
    console.log(this.offsetYWhenLeaving);
    // 每次重新进入页面刷新一次避免返回顶部的bug（切换页面后未知原因触发上拉加载更多事件，因此要重新计算可滚动区域）
    this.$refs.scroll.refresh() // 必须在滚动之前刷新
    this.$refs.scroll.scrollTo(0, this.offsetYWhenLeaving, 0)
  },
  deactivated() {
    // 离开页面时记录当前滚动Y坐标
    this.offsetYWhenLeaving = this.$refs.scroll.getScrollY()
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
    // 返回顶部事件
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // bScroll 滚动事件
    scroll(position) {
      // BackTop 组件是否显示
      if ((Math.abs(position.y) > 1000) && (this.isShowBackTop == false)) {
        this.isShowBackTop = true
      } else if ((Math.abs(position.y) <= 1000) && (this.isShowBackTop == true)) {
        this.isShowBackTop = false
      }
      // TabControl 组件的吸顶(position: fixed)
      // console.log(this.tabControlOffsetTop)
      if ((Math.abs(position.y) >= this.tabControlOffsetTop) && (this.isTabContrlFixed == false)) {
        this.isTabContrlFixed = true
      } else if ((Math.abs(position.y) < this.tabControlOffsetTop) && (this.isTabContrlFixed == true)) {
        this.isTabContrlFixed = false
      }
    },
    // 上拉加载更多事件
    loadMore() {
      console.log('loading...');
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
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;

  /* background-color: #fff; */
}
</style>