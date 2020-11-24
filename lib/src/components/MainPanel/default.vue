<style scoped lang="scss">
.fixedBox{display: flex;flex-direction: column;overflow: hidden;}
.srcoll-box{flex: 1;overflow-y: auto}
</style>
<template>
   <div :style="mainStyle" :class="['main-panel-container',className,fixedHead?'fixedBox':'']" >
    <div class="header-section" :class="[inputRadios?'zhfc-form':'']">
        <div class="query-wrap">
          <slot name="headerForm" />
        </div>
        <div class="action-wrap">
          <div class="left-action">
            <slot name="leftAction" />
          </div>
          <div class="right-action">
            <slot name="rightAction" />
          </div>
        </div>
    </div>
    <div :class="[fixedHead?'srcoll-box':'']">
      <div class="content-wrap" :style="contentStyle">
        <div class="content-section zhfc-table">
          <slot />
        </div>
      </div>
      <div class="footer-section zhfc-pagination">
      <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { normalizeStyle } from "../../utils/dom";

// 主视图容器
export default {
  name: "MainPanelFixed",
  props: {
    // 是否自动填充
    fill: {
      type: Boolean,
      default: true
    },
    // 内边距
    padding: {
      type: Array,
      default: () => [0]
    },
    // 容器样式类名
    className: String,
    // 容器是否透明
    transparent: {
      type: Boolean,
      default: false
    },
    //表格的一个固定最大高度
    tableMaxHeight:{
      type:[String,Number],
      default:0
    },
    //表单是否圆角
    inputRadios: {
      type: Boolean,
      default: true
    },
    //是否固定搜索区域
    fixedHead: {
      type: Boolean,
      default: false
    },
    //展示类型//1一屏，2非一屏
    type:{
      type:[String,Number],
      default:1
    },
  },
  data() {
    return {
      containerHeight: 448,
      headerHeight: 0,
      contentHeight: 448,
      footerHeight: 0   
    };
  },
  computed: {
    mainStyle() {
      const pd = normalizeStyle(this.padding);
      const styleObject = {
        height:`${this.containerHeight}px`,
        padding: `${pd[0]}px ${pd[1]}px ${pd[2]}px ${pd[3]}px`
      };
      if (this.transparent) {
        styleObject.background = "transparent";
        styleObject.border = "none";
      }
      return styleObject;
    },
    contentStyle() {
      const styleObject = {};
      if(this.tableMaxHeight&&this.fill){
        styleObject.maxHeight =this.tableMaxHeight
      }     
      if (this.fill) {
       styleObject.height =`${this.contentHeight}px`;
      }
      return styleObject;
    },
   
  },
  methods:{
    // 布局
    layout() {
      let $container = window.document.querySelector(".main-container");
      let height = $container
        ? $container.clientHeight - 20 * 2 - 70 - 4
        : window.innerHeight - 20;    
      this.containerHeight = height;
      if(this.type==1){//1一屏，2非一屏
        this.headerHeight = document.querySelector('.header-section').clientHeight
        height -= this.headerHeight;
        this.footerHeight = document.querySelector(".footer-section").clientHeight;
        height -= this.footerHeight;
         this.contentHeight = height
      }else{
       
          let table=document.querySelector('.el-table__body').clientHeight
          let tableHeader=document.querySelector('.el-table__header').clientHeight
        this.contentHeight =table+tableHeader+10;
      }
      
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.layout);
  },
  mounted() {
    // this.$nextTick(()=>{
    //    this.fill &&this.layout();
    // })
    
  },
  updated(){
    this.$nextTick(()=>{
       this.fill &&this.layout();
    })
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.layout);
  },
};
</script>

