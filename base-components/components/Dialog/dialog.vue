<!--
 * @Author: your name
 * @Date: 2020-06-17 14:05:29
 * @LastEditTime: 2020-06-17 16:34:14
 * @LastEditors: Please set LastEditors
 * @Description: 基础弹出框
 * @FilePath: \web\main\src\components\base\dailog\dialog.vue
--> 

<style scoped lang="scss">
// .dialog-footer{
//     .el-button{width: 100px;}
// }
</style>
<template>
  <el-dialog
    :title="title"
    :visible.sync="zhfcVisible"
    @close="$emit('update:visible', false)"
    class="zhfc-dialog-head"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :destroy-on-close="destroyOnClose"
  >
    <slot></slot>

    <div slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button
          @click="$emit('update:visible', false)"
          class="zhfc-button plain"
          >取 消</el-button
        >
        <el-button @click="$emit('confirm')" class="zhfc-button primary"
          >确 定</el-button
        >
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "zhfcDialog",
  props: {
    visible: Boolean,
    title: String,
    width: {
      type: String,
      default: "580px",
    },
    headBg: String,
    show: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    destroyOnClose: Boolean
  },
  computed: {
    zhfcVisible: {
      get() {
        return this.visible;
      },
      set(v) {
        this.$emit("update:visible", v);
      },
    },
  },
  mounted() {
    console.log(this.$slots);
  },
};
</script>