<template>
  <!-- <keep-alive>
    <router-view></router-view>
  </keep-alive> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <router-view></router-view> -->
  <main-tab-bar />
</template>

<script>
import MainTabBar from 'components/content/main-tab-bar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css"
</style>
