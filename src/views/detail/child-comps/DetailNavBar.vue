<template>
  <div class="detail-nav-bar">
    <nav-bar class="nav-bar">
      <template v-slot:nav-bar-left>
        <img src="~assets/images/common/back.svg" alt="" @click="clickGoBack">
      </template>
      <template v-slot:nav-bar-center>
        <ul class="detail-nav-bar-titles">
          <li v-for="(title, index) in titles" :class="{ active: currentIndex === index }"
            @click="clickNavBarTitle(index)">{{ title }}</li>
        </ul>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/nav-bar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    clickNavBarTitle(index) {
      this.currentIndex = index
      this.$emit('navBarClick', index)
    },
    clickGoBack() {
      // history.back() & history.go(-1)
      // this.$router.back() & this.$router.go(-1)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar img {
  vertical-align: middle;
}

.detail-nav-bar-titles {
  display: flex;
  font-size: 14px;
  justify-content: space-evenly;
}

.detail-nav-bar-titles li {
  list-style: none;
}

.active {
  color: var(--color-high-text);
}
</style>