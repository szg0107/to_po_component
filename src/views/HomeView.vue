<template>
  <div class="home">
        <Pagination :page.sync="page" :total="total" :pageSize.sync="pageSize"/>
    <!--    <SearchBar @getData="initPage" :searchInfo="searchInfo" :tableHead="tableHead"/>-->
    <!--    <ExportAndAdd/>-->
    <!--    <FormTable :tableHead="tableHead" :tableData="tableData"/>-->
    <!--    <my-test/>-->
<!--    <SearchBar/>-->
<!--    <Pagination :page="page" :total="total" :pageSize="pageSize"-->
<!--                @pagination="initPage" @pageChange="pageChange" @sizeChange="sizeChange"/>-->
<!--    <SearchBar @getData="initPage" :searchInfo="searchInfo" :tableHead="tableHead"/>-->
<!--    <ExportAndAdd/>-->
<!--    <FormTable :tableHead="tableHead" :tableData="tableData"/>-->
<!--    <my-test/>-->
    <Search :historyList="historyList"  @searchFun="searchFor"/>
  </div>
</template>

<script>
// @ is an alias to /src
import infoList from '../mixins/infoList'
export default {
  name: 'HomeView',
  props: {
    span: {
      type: Number,
      default: 2
    },
    offset: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      test: '',
      count: 0,
      loading: false,
      historyList: [
        { id: '1', value: '三全鲜食（北新泾店）' },
        { id: '2', value: 'Hot honey 首尔炸鸡（仙霞路）' },
        { id: '3', value: '新旺角茶餐厅' },
        { id: '4', value: '泷千家(天山西路店)' },
        { id: '5', value: '胖仙女纸杯蛋糕（上海凌空店）' },
        { id: '6', value: '贡茶' },
        { id: '7', value: '豪大大香鸡排超级奶爸' },
        { id: '8', value: '茶芝兰（奶茶，手抓饼）' },
        { id: '9', value: '十二泷町' },
        { id: '10', value: '星移浓缩咖啡' }
      ]
    }
  },
  mixins: [infoList],
  components: {
    // SearchBar: () => import('../../packages/Search/index.vue')
    Pagination: () => import('../../packages/Pagination/index.vue'),
    Search: () => import('../../packages/Search/index.vue')
    // Pagination: () => import('../../packages/Pagination/index.vue'),
    // SearchBar: () => import('../../packages/search-main/index.vue'),
    // ExportAndAdd: () => import('../../packages/table-btn/index.vue'),
    // FormTable: () => import('../../packages/table-main/index.vue')
  },
  created () {
  },
  watch: {},
  mounted () {
  },
  methods: {
    initPage (val) {
      if (val) this.searchInfo = val
      console.log(`${val}  pagination`)
      console.log(this.page, this.pageSize)
    },
    searchFor (input) {
      console.log(input)
      // 判断输入值是否在历史记录中存在
      const result = this.historyList.findIndex(item => item.value === input)
      // 不存在保存在历史记录中
      if (result === -1) {
        this.historyList.unshift({ id: this.historyList.length + '', value: input })
      }
    }
  }
}
</script>
<style lang="scss">
</style>
