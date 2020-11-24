<template>
  <div :class="['sub-panel-item-container',`level-${level}`]">
    <div :class="['sub-panel-header',line?'line':'']">
      <h5 class="sub-panel-title">{{title}}</h5>
      <div class="sub-panel-buttons">
        <slot name="buttons" />
      </div>
    </div>
    <div class="sub-panel-content">
      <slot />
    </div>
  </div>
</template>

<script>
// 二级和三级面板
export default {
  name: "SubPanelItem",
  props: {
    // 面板标题
    title: String,
    line: {
      type: Boolean,
      default: false,
    },
    name: String,
  },
  data() {
    return {
      selected: false,
      level: 2,
    };
  },
  inject: ["scrollPanel"],
  created() {
    this.setLevel();
    this.setNavTreeItem(this.$parent.name);
  },
  methods: {
    setLevel() {
      let parent = this.$parent;
      if (parent.level) {
        this.level = parent.level + 1;
      } else {
        parent.level = 1;
      }
    },
    setNavTreeItem() {
      let parent = this.$parent;
      if (parent.name) {
        if (!this.scrollPanel.subPanelItems[parent.name]) {
          this.$set(this.scrollPanel.subPanelItems, parent.name, []);
        }
        this.scrollPanel.subPanelItems[parent.name].push(this);
      }
    },
  },
};
</script>