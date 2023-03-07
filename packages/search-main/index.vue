<template>
  <!-- 菜单栏 -->
  <div class="search-box">
    <el-form inline label-width="0px" ref="searchForm">
      <el-form-item>
        <el-select v-model="searchInfos.key" placeholder="请选择过滤字段" clearable @change="headChange">
          <div
            v-for="item in tableHead"
            :key="item.prop">
            <el-option
              v-if="!item.searchShow"
              :label="item.label"
              :value="item.prop"/>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select style="width: 100px" v-model="searchInfos.expressions" placeholder="包含" clearable>
          <el-option
            v-for="item in containList"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="searchType === 'text'">
        <el-input style="width: 150px" v-model="searchInfos.value" clearable/>
      </el-form-item>
      <el-form-item v-else-if="searchType === 'date'">
        <el-date-picker
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
      </el-form-item>
      <el-form-item v-else-if="searchType === 'select'">
        <el-select v-model="searchInfos.value" placeholder="" clearable>
          <el-option
            v-for="item in selectList"
            :key="item.dictKey"
            :label="item.dictValue"
            :value="item.dictKey"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchTable" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="resole" icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    tableHead: {
      type: Array,
      default: () => []
    },
    searchInfo: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      // text输入框 | date日期  | select下拉框
      searchType: 'text',
      // 下拉框对应的下拉列表
      selectList: [],
      date: [],
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
      },
      is_data: true, // 是否首次渲染，是检查是否有默认筛选项
      searchInfos: {}
    }
  },
  methods: {
    searchTable () {
      this.$parent.page = 1
      this.$parent.initPage(this.searchInfos)
    },
    resole () {
      this.$parent.searchInfo = {
        expressions: 'like'
      }
      this.$parent.page = 1
      this.$parent.initPage()
    },
    headChange (val) {
      if (this.is_data) {
        this.is_data = false
      } else {
        this.$set(this.searchInfos, 'value', '')
        this.$set(this, 'date', '')
      }
      // eslint-disable-next-line eqeqeq
      const filter = this.tableHead.filter((a) => a.prop === val)[0]
      if (filter) {
        this.searchType = filter.search ? filter.search.type : 'text'
      } else {
        this.searchType = 'text'
      }
      // 下拉框填入下拉列表
      if (this.searchType === 'select') {
        const listNumber = this.$parent[filter.search.list]
        if (listNumber.length > 0) {
          this.selectList = listNumber
        } else {
          let num = 0
          const setInt = setInterval(() => {
            const listNumberSetInt = this.$parent[filter.search.list]
            if (listNumberSetInt.length > 0) {
              this.selectList = listNumberSetInt
              clearInterval(setInt)
            }
            if (num > 30) {
              clearInterval(setInt)
            }
            // eslint-disable-next-line no-plusplus
            num++
          }, 300)
        }
      }
      // 如果不是date，就删除不需要的时间字段
      if (this.searchType !== 'date') {
        this.searchInfos.beginDate = undefined
        this.searchInfos.endDate = undefined
      }
    },
    // 日期change
    dateChange (val) {
      [this.searchInfos.beginDate, this.searchInfos.endDate] = [val[0], val[1]]
    }
  },
  watch: {
    'searchInfo.key': {
      handler () {
        this.headChange(this.searchInfo.key)
      },
      deep: true
    },
    searchInfo: {
      handler (n) {
        this.searchInfos = n
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-button {
  padding: 0 8px;
  height: 32px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 2px;
}

/deep/ .el-cascader {
  line-height: inherit;
}
</style>
