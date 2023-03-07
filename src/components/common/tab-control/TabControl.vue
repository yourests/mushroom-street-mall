<template>
  <div class="tab-control">
    <div v-for="(title, index) in titles" class="tab-control-item" :key="index" @click="clickTabControlItem(index)"
      :class="{ active: index === currentIndex }">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    clickTabControlItem(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}

.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
  padding-bottom: 5px;
}
</style>