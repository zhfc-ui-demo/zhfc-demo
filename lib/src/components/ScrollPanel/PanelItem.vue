<template>
  <div :class="['panel-item-container',className,{'collapsed':collapseState}]" v-show="show">
    <div class="panel-item-header">
      <h4 class="panel-item-title">{{label}}</h4>
      <div class="panel-item-tool">
        <slot name="header" />
      </div>
      <div class="panel-item-collapse" @click="collapseState=!collapseState">
        {{stateText}}
        <i class="el-icon-caret-bottom" />
      </div>
    </div>
    <el-collapse-transition>
      <div class="panel-item-content" v-show="!collapseState">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
// 折叠面板
export default {
  name: "PanelItem",
  props: {
    // 面板标题
    label: String,
    // 面板唯一标识
    name: String,
    // 是否折叠
    collapsed: {
      type: Boolean,
      default: false
    },
    // 类样式名
    className: String,
    //是否显示
    show:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      selected: false,
      collapseState: this.collapsed,
      level: 1
    };
  },
  inject: ["scrollPanel"],
  computed: {
    stateText() {
      return this.collapseState ? "打开" : "收起";
    }
  },
  watch: {
    isCollapsed(val) {
      this.collapseState = val;
    },
    show(val){
      if(val){
        this.scrollPanel.panelItems.push(this);
      }else{
        let i=this.scrollPanel.panelItems.indexOf(this)
        this.scrollPanel.panelItems.splice(i,1)
      }
    }
  },
  // 增加自己到父容器
  mounted() {
    if(this.show){
      this.scrollPanel.panelItems.push(this);
    }
    
    this.listenCollapseChanged();
  },
  // 从父容器移除自己
  beforeDestroy() {
    let index = this.scrollPanel.panelItems.indexOf(this);
    if (index > -1) {
      this.scrollPanel.panelItems.splice(index, 1);
    }
  },
  methods: {
    // 面板折叠状态改变时重新计算位置
    listenCollapseChanged() {
      this.$content = this.$el.querySelector(".panel-item-content");
      this.$content.addEventListener("transitionend", e => {
        if (e.propertyName === "height") {
          this.$nextTick(() => this.scrollPanel.calcScrollPanel());
        }
      });
    }
  }
};
</script>