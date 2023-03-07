<template>
  <div class="pagination">
    <el-pagination
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
  name: 'Pagination', // 分页组件
  data () {
    return {}
  },
  props: {
    page: { // 当前页
      type: Number,
      default: 1
    },
    pageSize: { // 每页多少数
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
        this.$emit('pageChange', val)
      }
    },
    limit: {
      get () {
        return this.pageSize
      },
      set (val) {
        this.$emit('sizeChange', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination')
    },
    handleCurrentChange (val) {
      this.$emit('pagination')
    }
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
