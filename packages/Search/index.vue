<template>
  <div class="home">
    <at-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      @keyup.enter.native="handleSearchMember"
    >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
        @click="search"
      ></i>
    </at-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'AtSearch',
  props: {
    // 搜索组件历史内容配置项
    historyList: {
      type: Array,
      default () {
        return [{
          id: 'id', // Number类型：搜索记录ID
          value: 'value' // String类型 : 搜索记录组件所显示的搜索名称
        }]
      }
    }
  },
  data () {
    return {
      input: '', // 输入框内容
      timeout: null // 设置定时器，加载历史数据
    }
  },
  components: {},
  created () {
  },
  mounted () {},
  methods: {
    /**
     * @description: [querySearchAsync] - 输入框输入内容触发事件
     * @param {*} queryString     输入内容
     * @param {*} cb              通过调用cb(data:[])来返回它
     * @return {*}
     */
    querySearchAsync (queryString, cb) {
      const historyList = this.historyList
      const results = queryString
        ? historyList.filter(this.createStateFilter(queryString))
        : historyList
      // 清除定时器
      clearTimeout(this.timeout)
      // 设置定时器触发回调
      this.timeout = setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    },
    /**
     * @description: [createStateFilter] - 查找输入内容是否存在
     * @param {*} queryString         输入内容
     * @return {*} queryString        返回对应列表记录数组数据
     */
    createStateFilter (queryString) {
      return (state) => {
        return (
          // toLowerCase 将字符串转换为小写
          // indexOf 返回数组中某个指定的元素位置 没找到指定元素则返回 -1
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    /**
     * @description: [handleSelect] - 点击选中列表项时触发
     * @param {*} item         选中列表项
     * @return {*}
     */
    handleSelect (item) {
      console.log(item)
    },
    /**
     * @description: [handleSearchMember] - 输入框获取焦点时按回车触发事件
     * @return {*}
     */
    handleSearchMember (e) {
      // 通过回车事件让输入框失去焦点
      e.srcElement.blur()
      // 调用父组件方法
      // input 输入框内容
      this.$emit('searchBtn', this.input)
    },
    /**
     * @description: [search] - 点击搜索图标触发事件
     * @return {*}
     */
    search () {
      // 调用父组件方法
      // input 输入框内容
      this.$emit('searchBtn', this.input)
    }
  }
}
</script>
