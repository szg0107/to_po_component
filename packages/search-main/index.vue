<template>
  <!-- 菜单栏 -->
  <div class="search-box">
    <at-form inline label-width="auto" ref="searchForm">
<!--      基础默认部分, 根据选择条件展示对应的元素-->
      <at-form-item>
        <at-select v-model="searchInfos.key" placeholder="请选择过滤字段" clearable @change="headChange">
          <div
            v-for="item in tableHead"
            :key="item.prop">
            <at-option
              v-if="!item.searchShow"
              :label="item.label"
              :value="item.prop"/>
          </div>
        </at-select>
      </at-form-item>
      <at-form-item>
        <at-select style="width: 100px" v-model="searchInfos.expressions" placeholder="包含" clearable>
          <at-option
            v-for="item in containList"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </at-select>
      </at-form-item>
      <at-form-item>
        <at-input style="width: 150px" :placeholder="'请输入' + searchCn(searchInfos.key)" v-if="searchType === 'text'" v-model="searchInfos.value" clearable/>
        <at-date-picker
          v-else-if="searchType === 'date'"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="dateChange"/>
        <at-select style="width: 150px" :placeholder="'请选择' + searchCn(searchInfos.key)"  v-else-if="searchType === 'select'" v-model="searchInfos.value" clearable>
          <at-option
            v-for="item in selectList"
            :key="item.dictKey"
            :label="item.dictValue"
            :value="item.dictKey"/>
        </at-select>
      </at-form-item>
<!--      动态渲染获取到的查询条件-->
      <at-form-item v-for="(item, index) in tableHeadIsSearch" :key="index" :label="item.label">
        <at-input style="width: 150px" :placeholder="'请输入' + item.label" v-model="searchInfos[item.prop]" v-if="soSearch(item) === 'text'" clearable/>
        <at-date-picker
          v-else-if="soSearch(item) === 'date'"
          v-model="searchInfos[item.prop]"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="dateChange"/>
        <template v-else-if="soSearch(item) === 'select'">
          <at-select style="width: 150px" :placeholder="'请选择' + item.label" v-model="searchInfos[item.prop]" clearable v-if="item.search.list.length > 0">
            <at-option
              v-for="i in item.search.list"
              :key="i.dictKey"
              :label="i.dictValue"
              :value="i.dictKey"/>
          </at-select>
          <at-input style="width: 150px" :placeholder="'请输入' + item.label" v-model="searchInfos[item.prop]" v-else clearable/>
        </template>
      </at-form-item>
      <at-form-item>
        <at-button type="primary" @click="searchTable('search')" icon="el-icon-search">查询</at-button>
        <at-button type="primary" @click="reset" icon="el-icon-refresh">重置</at-button>
      </at-form-item>
    </at-form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    // 表头
    tableHead: {
      type: Array,
      default: () => []
    },
    // 搜索信息
    searchInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // text输入框 | date日期  | select下拉框
      searchType: 'text',
      // 下拉框对应的下拉列表
      selectList: [],
      // 日期选择
      date: [],
      // 条件
      containList: [
        {
          label: '包含',
          value: 'like'
        },
        {
          label: '小于',
          value: 'lt'
        },
        {
          label: '大于',
          value: 'gt'
        },
        {
          label: '小于等于',
          value: 'le'
        },
        {
          label: '大于等于',
          value: 'ge'
        },
        {
          label: '等于',
          value: 'eq'
        },
        {
          label: '左包含',
          value: 'll'
        },
        {
          label: '右包含',
          value: 'rl'
        }
      ],
      // 日期选择快捷键
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    searchInfos: {
      get () {
        return this.searchInfo
      },
      set (val) {
        this.$emit('update:searchInfo', val)
      }
    },
    // 根据isSearch展示对应的条件
    tableHeadIsSearch () {
      const newArr = this.tableHead.filter(item => item.isSearch)
      newArr.forEach(item => {
        this.$set(this.searchInfos, item.prop, '')
      })
      return newArr
    }
  },
  methods: {
    // 查询 search 重置查询 resetSearch
    searchTable (type) {
      console.log(this.searchInfos)
      this.$emit('searchTable', type)
    },
    // 重置查询条件
    reset () {
      this.searchInfos = { expressions: 'like' }
      this.searchTable('resetSearch')
    },
    // 字段改变事件
    headChange (val) {
      this.$set(this.searchInfos, 'value', '')
      this.selectList = []
      // 查找选中的对应字段
      const filter = this.tableHead.find(a => a.prop === val)
      // 设置搜索类型
      this.searchType = this.soSearch(filter)
      // 设置搜索对象label值
      this.searchInfos.label = filter && filter.label ? filter.label : ''
      // 下拉框填入下拉列表
      if (this.searchType === 'select') {
        const listNumber = filter.search.list
        this.selectList = Array.isArray(listNumber) && listNumber.length > 0 ? listNumber : []
      }
      // 时间设置默认值
      if (this.searchType === 'date') {
        this.searchInfos.beginDate = ''
        this.searchInfos.endDate = ''
      }
      // 如果不是date，就删除不需要的时间字段
      if (this.searchType !== 'date') {
        delete this.searchInfos.beginDate
        delete this.searchInfos.endDate
        this.$set(this, 'date', [])
      }
    },
    // 日期change
    dateChange (val) {
      this.searchInfos.beginDate = val[0]
      this.searchInfos.endDate = val[1]
    },
    // 查看类型
    soSearch (obj) {
      return obj && obj.search ? obj.search.type : 'text'
    },
    // 获取对应的中文
    searchCn (key) {
      const obj = this.tableHead.find(item => item.prop === key)
      return (obj && obj.label) || ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
