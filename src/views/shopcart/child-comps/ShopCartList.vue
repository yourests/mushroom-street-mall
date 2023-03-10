<template>
  <div class="shop-cart-list">
    <!-- 购物车列表项 -->
    <shop-cart-list-item v-for="(product, index) in shopCart" :product="product" :key="index" />
  </div>
</template>

<script>
import ShopCartListItem from './ShopCartListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCartList',
  computed: {
    ...mapGetters([
      'shopCart'
    ])
  },
  components: {
    ShopCartListItem
  }
}
</script>

<style scoped></style>