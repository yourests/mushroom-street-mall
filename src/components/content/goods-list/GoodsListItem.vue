<template>
  <div class="goods-list-item" @click="goodsListItemClick(goodsItem)">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-list-item-info">
      <p>{{ goodsItem.title }}</p>
      <span class="goods-list-item-price">{{ goodsItem.price }}</span>
      <span class="goods-list-item-collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
import Bus from 'components/common/mitt/Bus'

export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      // 每次图片加载完成后，通过 eventBus 调用 bScroll 的 refresh() 重新计算可滚动区域（bScroll.scrollerHeight）
      Bus.$emit('itemImageLoaded')
    },
    goodsListItemClick(goodsItem) {
      this.$router.push('/detail/' + goodsItem.iid)
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.show?.img || this.goodsItem.image
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-list-item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-list-item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-list-item-info .goods-list-item-price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-list-item-info .goods-list-item-collect {
  position: relative;
}

.goods-list-item-info .goods-list-item-collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>