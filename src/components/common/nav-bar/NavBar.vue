<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="nav-bar-left"></slot>
    </div>
    <div class="center">
      <slot name="nav-bar-center"></slot>
    </div>
    <div class="right">
      <slot name="nav-bar-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.2);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
  text-align: center;
}
</style>