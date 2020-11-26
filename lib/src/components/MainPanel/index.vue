<template>
  <div :style="mainStyle" :class="['main-panel-container', className]">
    <slot name="header" />

    <div class="contentStyle">
      <div class="content-wrap" :style="contentStyle">
        <slot />
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import { normalizeStyle } from "../../utils/dom";

// 主视图容器
export default {
  name: "MainPanel",
  props: {
    // 是否自动填充
    fill: {
      type: Boolean,
      default: true,
    },
    // 内边距
    padding: {
      type: Array,
      default: () => [0],
    },
    // 容器样式类名
    className: String,
    // 容器是否透明
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      containerHeight: 448,
      headerHeight: 0,
      contentHeight: 448,
      footerHeight: 0,
    };
  },
  computed: {
    mainStyle() {
      const pd = normalizeStyle(this.padding);
      const styleObject = {
        height: `${this.containerHeight}px`,
        padding: `${pd[0]}px ${pd[1]}px ${pd[2]}px ${pd[3]}px`,
      };
      if (this.transparent) {
        styleObject.background = "transparent";
        styleObject.border = "none";
      }
      return styleObject;
    },
    contentStyle() {
      const styleObject = {};
      if (this.fill) {
        styleObject.height = `${this.contentHeight}px`;
      }
      return styleObject;
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.layout);
  },
  mounted() {
    this.fill && this.layout();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.layout);
  },
  methods: {
    // 获取slot高度
    getSlotHeight(name) {
      let height = 0;
      if (this.$slots[name] && this.$slots[name].length) {
        height = this.$slots[name][0].elm.clientHeight;
      }
      return height;
    },
    // 布局
    layout() {
      // let $container = window.document.querySelector(".main-container");
      // let height = $container
      //   ? $container.clientHeight - 20 * 2 - 70 - 4
      //   : window.innerHeight - 20;
      // this.containerHeight = height;

          let $container = window.document.querySelector(".single-spa-vue");
      let height = $container
        ? $container.clientHeight 
        : window.innerHeight - 20;
      this.containerHeight = height;

      this.headerHeight = this.getSlotHeight("header");
      height -= this.headerHeight;

      this.footerHeight = this.getSlotHeight("footer");
      height -= this.footerHeight;

      this.contentHeight = height;
      console.log(this.contentHeight);
    },
  },
};
</script>

