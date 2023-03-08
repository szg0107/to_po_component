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
    <SearchBar/>
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
      loading: false
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
    }
  }
}
</script>
