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
    <div class="calculate">
      <span>去结算 ({{ checkedCount }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/check-button/CheckButton'
import { SELECT_NONE, SELECT_ALL } from 'store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCartBottomBar',
  components: {
    CheckButton
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