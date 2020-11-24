<template>
  <div class="zhfc-images" :style="{width:width,height:outHeight}">
    <div class="images">
      <el-image :style="{height:height}" :src="url" :fit="fit"></el-image>
      <span class="image-title_type_a" v-if="type==1">
        <span class="title">名称:</span>
        <span class="content">{{title}}</span>
        <el-button class="zhfc-button primary save" @click="doSave">保存</el-button>
      </span>

      <span class="image-title_type_b" v-if="type==2">
        <div style="margin-bottom:18px">
          <span class="title">名称:</span>
          <span class="content">{{title}}</span>
        </div>
        <div style="margin-bottom:18px">
          <span>
            <span class="title">户型:</span>
            <span class="content">{{houseType}}</span>
          </span>
          <span class="housing">
            <span class="title">房源:</span>
            <span class="content">{{housing}}套</span>
          </span>
        </div>
        <el-button class="zhfc-button primary save" @click="doSave">查看</el-button>
        <el-button class="zhfc-button plain save" @click="doSave">关联房源</el-button>
      </span>

      <div class="tool">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="zhfc_dot"></i>
            <i class="zhfc_dot"></i>
            <i class="zhfc_dot"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="doEdit">编辑</el-dropdown-item>
            <el-dropdown-item @click.native="doDelete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zhfc-image",
  data() {
    return {
      //   fits: ["fill", "contain", "cover", "none", "scale-down"],
      //   url: "",
    };
  },
  props: {
    //   显示类型
    type: {
      type: [String, Number],
      default: "1",
    },
    // 图片铺画格式
    fit: {
      type: String,
      default: "fill",
    },
    // 图片地址
    url: {
      type: String,
    },
    // 名称
    title: {
      type: String,
    },
    // 户型
    houseType: {
      type: String,
    },
    // 房源
    housing: {
      type: [String, Number],
      default: 0,
    },
    width: {
      type: String,
      default: "450px",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  computed: {
    outHeight() {
      if (this.type != 1) {
        let height = parseInt(this.height) + 150 + "px";
        return height;
      }
    },
  },
  watch: {
    urls() {
      console.log(this.urls);
    },
  },
  created() {},
  mounted() {
    console.log(parseInt(this.outHeight));
  },
  methods: {
    doSave() {
      this.$emit("doSave");
    },
    doEdit() {
      this.$emit("doEdit");
    },
    doDelete() {
      this.$emit("doDelete");
    },
  },
};
</script>

im
<style lang="scss" scoped>
</style>