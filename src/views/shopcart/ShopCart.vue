<template>
  <div id="shop-cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:nav-bar-center>
        <div>购物车({{ shopCartLength }})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="0">
      <!-- 购物车列表 -->
      <shop-cart-list />
    </scroll>
    <!-- 购物车底部汇总 -->
    <shop-cart-bottom-bar />
  </div>
</template>

<script>
import ShopCartList from './child-comps/ShopCartList'
import ShopCartBottomBar from './child-comps/ShopCartBottomBar';

import NavBar from 'components/common/nav-bar/NavBar'
import Scroll from 'components/common/scroll/Scroll';
import { mapGetters } from 'vuex'

export default {
  name: "ShopCart",
  components: {
    NavBar
  },
  computed: {
    // 将 store 中的 getter 映射到局部计算属性
    ...mapGetters([
      'shopCartLength'
    ])

    // ...mapGetters({
    //   length: 'shopCartLength'
    // })

    // shopCartLength() {
    //   return this.$store.getters.shopCartLength
    // }
  },
  components: {
    ShopCartList,
    ShopCartBottomBar,
    NavBar,
    Scroll
  }
};
</script>

<style scoped>
#shop-cart {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 600; */
}

.content {
  /* 底部选项卡: 49px, 购物车底部汇总: 40px */
  height: calc(100% - 44px - 49px - 40px);
  /* 
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: calc(49px + 40px);
  */
  overflow: hidden;
}
</style>