<template>
  <div class="pagination">
    <at-pagination
      background
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="limit"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AtFullPagination', // 分页组件
  data () {
    return {}
  },
  props: {
    page: { // 当前页 引用必须加.sync修饰符
      type: Number,
      default: 1
    },
    pageSize: { // 每页多少数 引用必须加.sync修饰符
      type: Number,
      default: 10
    },
    total: { // 总数据条数
      type: Number,
      default: 1000
    },
    pageSizes: { // 每页显示个数选择器
      type: Array,
      default: () => [15, 50, 100, 200]
    },
    layout: { // 组件布局，子组件名用逗号分隔
      type: String,
      default: 'total, sizes, prev, pager, next'
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    limit: {
      get () {
        return this.pageSize
      },
      set (val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.currentPage = 1
    },
    handleCurrentChange (val) {}
  }
}
</script>
<style scoped lang="scss">
.pagination {
  height: 40px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
