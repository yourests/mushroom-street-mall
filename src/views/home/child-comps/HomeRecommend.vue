<template>
  <div class="home-recommend">
    <div v-for="(recommend, index) in recommends" :key="index" class="recommend-item">
      <a :href="recommend.link">
        <img :src="recommend.image" alt="">
      </a>
      <div>{{ recommend.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.home-recommend {
  display: flex;
  padding: 30px 0 30px;
  border-bottom: 8px solid #eee;
}

.recommend-item {
  flex: 1;
  font-size: 14px;
  text-align: center;
}

.recommend-item img {
  width: 60px;
  height: 60px;
}
</style>