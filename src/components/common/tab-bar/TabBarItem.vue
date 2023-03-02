<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="tab-bar-item-image"></slot>
    </div>
    <div v-else>
      <slot name="tab-bar-item-image-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="tab-bar-item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // props: {
  //   path: String,
  // },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#007ffc",
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  methods: {
    itemClick() {
      // this.isActive = true;
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item>>>img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
}

/* .active {
  color: #007ffc;
} */
</style>