<template>
  <div>
    <template v-for="i in getHierarchy">
      <at-select v-model="forms[`${nameList[i-1]}Code`]"
                 clearable
                 placeholder="请选择"
                 :key="nameList[i-1]"
                 @change="selectChange($event,i,nameList[i-1])">
        <at-option
          v-for="item in dropdowns[nameList[i-1]]"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </at-select>
    </template>
  </div>
</template>

<script>
export default {
  name: 'fiveLinkage', // 五级联动
  props: {
    // 下拉数据
    dropdownsData: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    // 层级
    hierarchy: {
      type: [Number, String],
      default: 3
    }
  },
  data () {
    return {
      // 下拉数据
      dropdowns: {
        firstLevel: this.dropdownsData,
        secondLevel: [],
        threeLevel: [],
        fourLevel: [],
        fiveLevel: []
      },
      // 字段名数组
      nameList: ['firstLevel', 'secondLevel', 'threeLevel', 'fourLevel', 'fiveLevel'],
      forms: {
        firstLevel: '', // 一级
        firstLevelCode: '',
        secondLevel: '', // 二级
        secondLevelCode: '',
        threeLevel: '', // 三级
        threeLevelCode: '',
        fourLevel: '', // 四级
        fourLevelCode: '',
        fiveLevel: '', // 五级
        fiveLevelCode: ''
      }
    }
  },
  created () {
  },
  computed: {
    getHierarchy: function () { return this.hierarchy < 3 ? 3 : this.hierarchy > 5 ? 5 : this.hierarchy }
  },
  methods: {
    // 下拉框值改变 val:选中的值 hierarchy:层级 hierarchyName:层级名称
    selectChange (val, hierarchy, hierarchyName) {
      // console.log(val, hierarchy, hierarchyName)
      // 找到选中值对应对象
      const lowerLevel = this.dropdowns[hierarchyName].find(item => item.value === val)
      // 选中值改变并且不是最后一级
      if (val && hierarchy < this.hierarchy) {
        // 给当前对象name赋值
        this.forms[this.nameList[hierarchy - 1]] = lowerLevel.label
        // 给下一级下拉框选项赋值
        this.dropdowns[this.nameList[hierarchy]] = lowerLevel.children ? lowerLevel.children : []
        // 清空下一级选中值及后面选中值、下拉数据
        this.clearValue(hierarchy, 'change')
      }
      // 最后一级
      if (val && hierarchy === this.hierarchy) {
        this.forms[this.nameList[hierarchy - 1]] = lowerLevel.label
      }
      // 值清空时的处理
      if (!val) {
        this.clearValue(hierarchy - 1, 'clear')
      }
      // 给父容器接收对象赋值
      this.$emit('update:selectValue', this.forms)
    },
    // 清空值 hierarchy:层级 type:类型
    clearValue (hierarchy, type) {
      for (let i = hierarchy; i < this.hierarchy; i++) {
        // 判断类型是否是clear 然后给CodeValue赋不同的值
        const CodeValue = type === 'clear' ? `${this.nameList[i + 1]}Code` : `${this.nameList[i]}Code`
        // 清空name
        this.forms[this.nameList[i]] = ''
        // 清空code
        this.forms[CodeValue] = ''
        // 清空下拉数据
        this.dropdowns[this.nameList[i + 1]] = []
      }
    }
  }
}
</script>

<style scoped>

</style>
