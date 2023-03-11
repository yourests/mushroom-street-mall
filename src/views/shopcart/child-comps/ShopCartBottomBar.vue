<template>
  <div class="shop-cart-bottom-bar">
    <!-- 全选框 -->
    <div class="select-all">
      <check-button class="select-all-btn" :is-checked="isSelectAll" @click="selectAllClick" />
      <span>全选</span>
    </div>
    <!-- 总价 -->
    <div class="total-price">
      <span>合计:{{ totalPrice }}</span>
    </div>
    <!-- 结算 -->
    <div class="calculate" @click="calcClick">
      <span>去结算 ({{ checkedCount }})</span>
    </div>
    <toast :message="toastMessage" :is-show="toastShow" />
  </div>
</template>

<script>
import CheckButton from 'components/content/check-button/CheckButton'
import { SELECT_NONE, SELECT_ALL } from 'store/mutation-types'
import Toast from 'components/common/toast/Toast'
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCartBottomBar',
  data() {
    return {
      toastMessage: '',
      toastShow: false
    }
  },
  components: {
    CheckButton,
    Toast
  },
  computed: {
    ...mapGetters(['totalPrice', 'checkedCount', 'isSelectAll'])
  },
  methods: {
    selectAllClick() {
      if (this.isSelectAll) { // 全选状态 → 全不选
        this.$store.commit(SELECT_NONE)
      } else {  // 非全选状态 → 全选
        this.$store.commit(SELECT_ALL)
      }
    },
    calcClick() {
      if (!this.checkedCount) {
        this.toastMessage = '请选择购买的商品'
      } else {
        this.toastMessage = '购买成功'
      }
      this.toastShow = true
      setTimeout(() => {
        this.toastMessage = ''
        this.toastShow = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.shop-cart-bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eee;
}

.select-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 20px;
  width: 60px;
}

.select-all-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  flex: 1;
  font-weight: 700;
}

.calculate {
  width: 100px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}
</style>