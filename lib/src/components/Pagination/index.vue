<template>
  <div>
    <el-pagination
      ref="zhfcPagination"
      class="zhfc-pagination"
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="slotLayout"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot v-show="total">
        <div class="zhfc-total">
          <span>{{ currentLimit }}</span>
          <span>共{{ total }}条</span>
        </div>
      </slot>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "prev, pager, next, jumper, sizes",
    },
    background: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    slotLayout() {
      
      return `slot, ${this.layout}`;
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
    currentLimit() {
      return (
        "当前显示" +
        ((this.currentPage - 1) * this.pageSize + 1) +
        "-" +
        this.currentPage * this.pageSize +
        "，"
      );
    },
  },
  mounted() {
    console.log(this.$attrs);
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
};
</script>

<style scoped>
</style>