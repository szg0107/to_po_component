<template>
  <div class="home">
    <!--    <Pagination :page="page" :total="total" :pageSize="pageSize"-->
    <!--                @pagination="initPage" @pageChange="pageChange" @sizeChange="sizeChange"/>-->
    <!--    <SearchBar @getData="initPage" :searchInfo="searchInfo" :tableHead="tableHead"/>-->
    <!--    <ExportAndAdd/>-->
    <!--    <FormTable :tableHead="tableHead" :tableData="tableData"/>-->
    <!--    <my-test/>-->
    <SearchBar/>
  </div>
</template>

<script>
// @ is an alias to /src
import infoList from '../mixins/infoList'
// let id = 0
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
      test: ''
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
  created () {
  },
  watch: {},
  mounted () {
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="scss">
</style>
