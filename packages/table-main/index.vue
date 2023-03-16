<template>
  <div class="table-box">
    <at-table
      ref="table"
      :data="tableData"
      stripe
      @selection-change="handleSelectionChange"
      @row-dblclick="dblClick"
      @row-click="rowClick"
      row-key="id"
      height="100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
      border>
      <at-table-column
        type="selection"
        align="center"
        width="50"
        fixed="left"
        v-if="isShowSelection"
        :selectable="selectDisabled"/>

      <at-table-column
        sortable
        align="center"
        type="index"
        width="50"
        label="序号"
        fixed="left"
        v-if="isShowIndex"
        class="table-index"/>

      <at-table-column
        align="left"
        v-for="(item, index) in tableHead"
        :fixed="item.fixed ? item.fixed: undefined"
        sortable
        :key="`col_${index + 1}`"
        :prop="item.prop"
        show-overflow-tooltip
        :label="item.label"
        :width="item.width || 150"
        :column-key="item.prop"
        :label-class-name="!item.isFilter?'hiddenFilter':''"
        :filters="item.filters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <!--特殊按钮-->
          <div v-if="item.isSpecialButton">
            <at-button
              type="text"
              size="mini"
              v-for="(button, ind) in item.buttonList"
              :key="ind"
              @click="sureConfirm(button.event,scope.row, $el)">
              <span>
                {{ scope.row[item.prop] }}
              </span>
            </at-button>
          </div>
          <div v-else>
            <span>{{ scope.row[item.prop] }}</span>
          </div>
        </template>
      </at-table-column>

      <at-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
        v-if="fixedTableColumn"
        class-name="lastFixed">
        <template slot="header">
          <i class="el-icon-s-fold" style="cursor: pointer;font-size: 24px"/>
        </template>
        <template slot-scope="scope">
          <slot :scope="scope" name="btn"></slot>
          <at-button
            size="small"
            @click="seeDialogOpen(scope.row)"
            v-if="isShowInfo?(scope.row.seeBtnShow === undefined ? true : scope.row.seeBtnShow):false"
            type="text"
            class="el-icon-edit-outline">查看</at-button>
          <!-- 每个界面可以在row中使用updataBtnShow来判断是否显示该按钮，如果未定义updataBtnShow，则使用delBtnShow来判断是否显示 -->
          <at-button
            type="text"
            size="small"
            class="el-icon-edit"
            @click="updDialogOpen(scope.row)"
            v-if="isShowUpdateBtn?(scope.row.updateBtnShow === undefined ? scope.row.deleteAble : scope.row.updateBtnShow):false"
          >编辑</at-button>
          <at-button
            type="text"
            size="small"
            class="el-icon-delete"
            @click="delRow(scope.row)"
            v-if="isShowDeleteBtn?(scope.row.delBtnShow === undefined ? scope.row.deleteAble : scope.row.delBtnShow):false"
          >删除</at-button>
          <slot :scope="scope" name="btn_r"></slot>
        </template>
      </at-table-column>
    </at-table>
  </div>
</template>

<script>

export default {
  name: 'FormTable',
  props: {
    tableData: { // 表格数据
      type: Array,
      default: () => []
    },
    tableHead: { // 表头
      type: Array,
      default: () => []
    },
    // 是否显示查看按钮
    isShowInfo: {
      type: Boolean,
      default: true
    },
    // 是否显示删除按钮
    isShowDeleteBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示编辑按钮
    isShowUpdateBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示复选列
    isShowSelection: {
      type: Boolean,
      default: true
    },
    // 是否显示序号
    isShowIndex: {
      type: Boolean,
      default: true
    },
    // 是否显示操作列
    fixedTableColumn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      multipleSelection: []
    }
  },
  created () {
  },
  watch: {
    tableData: {
      handler () {
        this.initFilterList()
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {},
  methods: {
    // 特殊操作按钮
    sureConfirm (eventName, row) {
      this.$emit(eventName, row)
    },
    // 获取筛选列表
    initFilterList () {
      this.tableHead.forEach((res) => {
        if (res.isFilter) {
          res.filters = []
          const arr = []
          this.tableData.forEach((dataItem) => {
            const prop = dataItem[res.prop]
            if (arr.indexOf(prop) === -1 && prop) {
              arr.push(prop)
              res.filters.push({
                text: prop,
                value: prop
              })
            }
          })
        }
      })
    },
    // 筛选操作
    filterHandler (value, row, column) {
      const { property } = column
      return row[property] === value
    },
    // 查看行方法
    seeDialogOpen (row) {
      this.$emit('seeDialogOpen', row)
    },
    // 编辑行
    updDialogOpen (row) {
      this.$emit('updDialogOpen', row)
    },
    // 删除行
    delRow (row) {
      this.$emit('delRow', row)
    },
    // 选中数据事件
    handleSelectionChange (val) {
      this.$emit('multipleChange', val)
    },
    // 行双击事件
    dblClick (row) {
      // this.$parent.seeDialogOpen(row)
      this.$emit('rowDblClick', row)
    },
    // 行点击事件
    rowClick (row) {
      const that = this
      this.$emit('rowClick', row, that)
    },
    // 多选框是否禁用
    selectDisabled (row) {
      return row.deleteAble !== false
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .hiddenFilter .el-table__column-filter-trigger,  /deep/ .hiddenFilter .caret-wrapper {
  display: none;
}
</style>
