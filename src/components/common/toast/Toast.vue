<template>
  <div class="toast" v-show="isShow" @click="toastClick">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      // message: '',
      // isShow: true
    }
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // show(message, duration) {
    //   this.message = message
    //   this.isShow = true
    //   setTimeout(() => {
    //     this.message = ''
    //     this.isShow = false
    //   }, duration);
    // },
    toastClick() {
      this.$emit('toastClick')
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, .7);
  color: #fff;
  font-size: 20px;
  border-radius: 15px;
  z-index: 999;
}
</style>