<template>
  <div class="home">
<!--    <Pagination :page="page" :total="total" :pageSize="pageSize"-->
<!--                @pagination="initPage" @pageChange="pageChange" @sizeChange="sizeChange"/>-->
<!--    <SearchBar @getData="initPage" :searchInfo="searchInfo" :tableHead="tableHead"/>-->
<!--    <ExportAndAdd/>-->
<!--    <FormTable :tableHead="tableHead" :tableData="tableData"/>-->
<!--    <my-test/>-->
    <at-row>
      <at-date-picker
        v-model="test"
        type="datetime"
        placeholder="选择日期时间">
      </at-date-picker>
      <SearchBar :historyList="historyList"  @searchBtn="searchFor"/>
<!--      <div class="infinite-list-wrapper" style="overflow:auto">-->
<!--        <ul-->
<!--          class="list"-->
<!--          v-infinite-scroll="load"-->
<!--          infinite-scroll-disabled="disabled">-->
<!--          <li v-for="i in count" class="list-item" :key="i">{{ i }}</li>-->
<!--        </ul>-->
<!--        <p v-if="loading">加载中...</p>-->
<!--        <p v-if="noMore">没有更多了</p>-->
<!--      </div>-->
    </at-row>
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
    SearchBar: () => import('../../packages/Search/index.vue')
    // Pagination: () => import('../../packages/Pagination/index.vue'),
    // SearchBar: () => import('../../packages/search-main/index.vue'),
    // ExportAndAdd: () => import('../../packages/table-btn/index.vue'),
    // FormTable: () => import('../../packages/table-main/index.vue')
  },
  computed: {
    noMore () {
      return this.count >= 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
  },
  methods: {
    initPage (val) {
      if (val) this.searchInfo = val
      console.log(`${val}  pagination`)
      console.log(this.page, this.pageSize)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    searchFor (input) {
      // eslint-disable-next-line no-undef
      // 判断输入值是否在历史记录中存在
      const result = this.historyList.findIndex(item => item.value === input)
      // 不存在保存在历史记录中
      if (result === -1) {
        this.historyList.unshift({ id: this.historyList.length, value: input })
      }
    }
  }
}
</script>
