<template>
  <div class="indicator-item" :key="item.name" @click.stop="scrollIntoView(item)"
    :class="{'selected':item.selected,'sub-indicator':item.level>1}">
    <div class="indicator-tail" v-if="item.level===1"></div>
    <div class="indicator-node" v-if="item.selected || item.level === 1" ref="indicatorNode">
      <div class="indicator-node-inner" />
    </div>
    <div class="indicator-content" :title="item.label || item.title">
      <label class="index-flag" v-if="item.level>1">{{indexFlag}}</label>
      <div class="indicator-content-inner">{{item.label || item.title}}</div>
    </div>
    <template v-if="subItems && subItems.length">
      <IndicatorSubMenu :item="subItem" :key="subItem.name" :index="index+1" v-for="(subItem, index) in subItems">
      </IndicatorSubMenu>
    </template>
  </div>
</template>
<script>
  // 滚动容器位置指示器
  import {
    numberToChinese
  } from "../../filters/index";
  export default {
    name: "IndicatorSubMenu",
    props: {
      item: Object,
      index: Number,
    },
    inject: ["scrollPanel"],
    methods: {
      // 滚动面板到视图
      scrollIntoView(item) {
        this.scrollPanel.scrollIntoView(item.name, item.$parent.name);
        if (this.item.level > 2) {
          this.$nextTick(function () {
            this.$refs.indicatorNode.style.marginLeft = '-' + ((this.item.level - 3) * 10) + 'px';
          })
        }

      },
    },
    computed: {
      indexFlag() {
        if (this.item.level === 2) {
          return numberToChinese(this.index); //阿拉伯数字转化为中文
        } else {
          return this.index;
        }
      },
      subItems() {
        return this.scrollPanel.subPanelItems[this.item.name];
      },
    },
  };
</script>

<style scoped>
  .indicator-content-inner {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>