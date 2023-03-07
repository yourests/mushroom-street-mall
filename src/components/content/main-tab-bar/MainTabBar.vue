<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="red">
      <template v-slot:tab-bar-item-image>
        <img src="~assets/images/tabbar/home.svg" />
      </template>
      <template v-slot:tab-bar-item-image-active>
        <img src="~assets/images/tabbar/home_active.svg" />
      </template>
      <template v-slot:tab-bar-item-text>
        <div>首页</div>
      </template>
      <!-- <div slot="tab-bar-item-text">首页</div> -->
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="yellow">
      <template v-slot:tab-bar-item-image>
        <img src="~assets/images/tabbar/category.svg" />
      </template>
      <template v-slot:tab-bar-item-image-active>
        <img src="~assets/images/tabbar/category_active.svg" />
      </template>
      <template v-slot:tab-bar-item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="blue">
      <template v-slot:tab-bar-item-image>
        <img src="~assets/images/tabbar/shopcart.svg" />
      </template>
      <template v-slot:tab-bar-item-image-active>
        <img src="~assets/images/tabbar/shopcart_active.svg" />
      </template>
      <template v-slot:tab-bar-item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:tab-bar-item-image>
        <img src="~assets/images/tabbar/profile.svg" />
      </template>
      <template v-slot:tab-bar-item-image-active>
        <img src="~assets/images/tabbar/profile_active.svg" />
      </template>
      <template v-slot:tab-bar-item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import { TabBar, TabBarItem } from "components/common/tab-bar"

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped></style>