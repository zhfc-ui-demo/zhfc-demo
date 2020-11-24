<template>
  <div class="panel-indicator-container">
    <IndicatorSubMenu v-for="(item, index) in items" :key="item.name" :item="item" :index="index+1"></IndicatorSubMenu>
  </div>
</template>

<script>
import IndicatorSubMenu from "./IndicatorSubMenu";
// 滚动容器位置指示器
export default {
  name: "Indicator",
  components: {
    IndicatorSubMenu,
  },
  inject: ["scrollPanel"],
  computed: {
    items() {
      return this.scrollPanel.panelItems;
    },
  },
};
</script>