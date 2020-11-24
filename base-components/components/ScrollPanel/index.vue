<template>
  <div :class="['scroll-panel-container',{'has-sidebar': showSidebar}]">
    <div class="scroll-panel-content">
      <slot />
    </div>
    <div class="scroll-panel-indicator">
      <indicator v-if="showSidebar&&showIndicator" />
      <div class="panel-actions-container">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
import Indicator from "./Indicator";
import { debounce } from "../../utils/common";
import scrollTo from "../../utils/scroll-to";

// 滚动容器
export default {
  name: "ScrollPanel",
  components: {
    Indicator,
  },
  props: {
    // 是否显示侧边栏
    showSidebar: {
      type: Boolean,
      default: true,
    },
    // 是否显示位置指示器
    showIndicator: {
      type: Boolean,
      default: true,
    },
    // 当前视图面板
    current: String,
  },
  data() {
    return {
      // 子面板
      panelItems: [],
      subPanelItems: {},
      // 当前显示面板
      currentName: this.current,

      selectedItem: null, //当前选中的菜单项对应的dom节点
      preSelectedItem: null, //前面选中的菜单项对应的dom节点
      selectedNameParentName: null, //当前选中的菜单项对应的父菜单的名称
      firstLevelSelectedItem: null, //当前选中的一次菜单对应的dom节点
    };
  },
  provide() {
    return {
      scrollPanel: this,
    };
  },
  watch: {
    current(val) {
      this.scrollIntoView(val);
    },
    panelItems(val) {
      const panelName = this.currentName
        ? this.currentName
        : val.length
        ? val[0].name
        : "";
      this.$nextTick(() => {
        this.scrollIntoView(panelName);
      });
    },
  },
  mounted() {
    this.$scroll = this.$el.querySelector(".scroll-panel-content");
    this.$scroll.addEventListener(
      "scroll",
      debounce(() => this.calcScrollPanel(), 50)
    );
  },
  methods: {
    // 计算当前滚动面板位置
    calcScrollPanel() {
      if (this.lock) return;

      this.selectIndicator(this.selectedItem, this.selectedNameParentName);
      this.raiseChangeEvent(this.selectedItem.name, this.selectedItem);
    },
    // 滚动面板到当前视图
    scrollIntoView(name, parentName) {
      if (!name || this.lock) return;

      let panel = null;
      if (parentName) {
        panel = this.subPanelItems[parentName].find(
          (panel) => panel.name === name
        );
      } else {
        panel = this.panelItems.find((panel) => panel.name === name);
      }

      if (!panel) return;

      this.selectedItem = panel;
      this.selectedNameParentName = parentName;

      // 设置标志位，点击指示器触发的滚动不计算位置
      this.lock = true;
      this.selectIndicator(panel, parentName);

      let offsetTop = this.computedOffsetTop(panel);
      scrollTo(this.$scroll, offsetTop, 300, () => {
        this.lock = false;
        this.raiseChangeEvent(panel.name, panel);
      });
    },
    //选中位置指示器
    selectIndicator(panel, parentName) {
      if (this.preSelectedItem) {
        this.preSelectedItem.selected = false;
      }

      panel.selected = true;
    },
    // 触发当前视图改变事件
    raiseChangeEvent(name, panel) {
      const prevName = this.currentName;
      this.currentName = name;
      this.preSelectedItem = panel;

      if (name !== prevName) {
        this.$emit("currentChanged", {
          prev: prevName,
          current: name,
        });
      }
    },
    computedOffsetTop(panel) {
      let offsetTop = panel.$el.offsetTop;
      let parent = panel.$parent;
      
      // 调整一次菜单项的选中效果
      this.firstLevelSelectedItem &&
        panel.name !== this.firstLevelSelectedItem.name &&
        (this.firstLevelSelectedItem.selected = false);
      // 遍历父节点，一直到level为1，计算总的offsetTop
      while (parent && parent.level) {
        offsetTop = offsetTop + parent.$el.offsetTop;
        if (parent.level === 1) {
          parent.selected = true;
          this.firstLevelSelectedItem = parent;
        }
        parent = parent.$parent;
      }
      return offsetTop;
    },
  },
};
</script>