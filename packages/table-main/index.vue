<template>
  <div class="table-box">
    <el-table
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
      :row-class-name="tableRowClassName"
      border>
      <!--展开行-->
      <el-table-column
        type="expand"
        align="center"
        width="50"
        fixed="left"
        :label-class-name="'el-table-column_Unfold'"
        v-if="tableDataUnfold && tableDataUnfold.id==='1'">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="el" v-for="(el,index) in tableDataUnfold.list" :key="index">
               <span class="demo-table-expand_span">
                 {{ props.row[index] }}
               </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        type="selection"
        align="center"
        width="50"
        fixed="left"
        v-if="isShowSelection"
        :selectable="selectDisabled"/>

      <el-table-column
        sortable
        align="center"
        type="index"
        width="50"
        label="序号"
        fixed="left"
        v-if="isShowIndex"
        class="table-index"/>

      <el-table-column
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
            <el-button
              type="text"
              size="mini"
              v-for="(button, ind) in item.buttonList"
              :key="ind"
              @click="sureConfirm(button.event,scope.row, $el)">
              <block v-if="button.name !== '附件管理'">
                {{ button.name }}
              </block>
              <span v-else
                    :style="(scope.row.fileInfoList && scope.row.fileInfoList.length === 0)?'color:#f07101':''">
               {{
                  (scope.row.fileInfoList && scope.row.fileInfoList.length > 0) ? scope.row.fileInfoList.length + '件' : '0件'
                }}
            </span>
            </el-button>
          </div>
          <div v-else>
            <span>{{ scope.row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        :width="width"
        :render-header="renderHeader"
        align="center"
        class-name="lastFixed">
        <template slot-scope="scope" v-if="fixedTableColumn">
          <slot :scope="scope" name="btn"></slot>
          <el-button
            size="small"
            @click="seeDialogOpen(scope.row)"
            v-if="isShowInfo?(scope.row.seeBtnShow === undefined ? true : scope.row.seeBtnShow):false"
            type="text"
            class="el-icon-edit-outline">查看</el-button>
          <!-- 每个界面可以在row中使用updataBtnShow来判断是否显示该按钮，如果未定义updataBtnShow，则使用delBtnShow来判断是否显示 -->
          <el-button
            type="text"
            size="small"
            class="el-icon-edit"
            @click="updDialogOpen(scope.row)"
            v-if="isShowUpdateBtn?(scope.row.updateBtnShow === undefined ? scope.row.deleteAble : scope.row.updateBtnShow):false"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            class="el-icon-delete"
            @click="delRow(scope.row)"
            v-if="isShowDeleteBtn?(scope.row.delBtnShow === undefined ? scope.row.deleteAble : scope.row.delBtnShow):false"
          >删除</el-button>
          <slot :scope="scope" name="btn_r"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import Sortable from 'sortablejs';

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
    /**
     * 对应字段与值显示特殊颜色字段
     [
     {
          calss:'', //class
          value:'',//指定文字
          key:'' //指定字段
        }
     ]
     */
    rowOn: {
      type: Array,
      default: () => []
    },
    // 可以展开
    tableDataUnfold: {
      type: Object,
      default: () => ({
        id: '',
        list: { productCode: '产品代号' }
      })
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
    }
  },
  data () {
    return {
      multipleSelection: [],
      width: 280,
      widthCopy: 280,
      fixedTableColumn: true
    }
  },
  created () {
  },
  watch: {
    tableHead: {
      handler () {
        // this.newTableHead = this.deepClone(this.$parent.tableHeadOld)
      },
      deep: true
    },
    tableData: {
      handler (val) {
        this.initFilterList()
        if (val && val.length > 0) {
          let flag = false
          const timer = setInterval(() => {
            if (flag) {
              clearInterval(timer)
            }
            let len = 0
            if (
              document.querySelectorAll('.avue-main td.lastFixed') &&
              document.querySelectorAll('.avue-main td.lastFixed').length > 0
            ) {
              flag = true
            }
            if (flag) {
              document.querySelectorAll('.avue-main td.lastFixed')
                .forEach((res) => {
                  if (len <= res.querySelectorAll('button').length) {
                    len = res.querySelectorAll('button').length
                  }
                })
              const width = len * 75
              if (width > this.width) {
                this.width = width
                this.widthCopy = width
              }
            }
          }, 1000)
        }
      },
      deep: true
    }
  },
  mounted () {
    // 阻止默认行为
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    // 渲染操作列表头
    renderHeader () {
      return (
        <i class="el-icon-s-fold" style="cursor: pointer;font-size: 24px" onClick={() => {
          this.totalFixed()
        }}>
        </i>
      )
    },
    // 操作列展开/折叠
    totalFixed () {
      this.fixedTableColumn = !this.fixedTableColumn
      if (this.fixedTableColumn) {
        this.width = this.widthCopy
        return
      }
      this.width = 50
    },
    tableRowClassName ({
      row,
      // eslint-disable-next-line no-unused-vars
      rowIndex
    }) {
      // eslint-disable-next-line camelcase
      const row_on = this.rowOn
      // eslint-disable-next-line camelcase,no-restricted-syntax
      for (const z in row_on) {
        if (row_on[z]) {
          // eslint-disable-next-line no-restricted-syntax
          for (const i in row) {
            if (i === row_on[z].key && row[i] === row_on[z].value) {
              if (row_on[z].calss) {
                return row_on[z].calss
              }
              return 'row-back-red'
            }
          }
        }
      }
      return ''
    },
    // 特殊操作按钮
    sureConfirm (eventName, row) {
      this.$emit(eventName, row)
    },
    // 获取筛选列表
    initFilterList () {
      this.tableHead.forEach((res) => {
        if (res.isFilter) {
          // eslint-disable-next-line no-param-reassign
          res.filters = []
          const arr = []
          this.tableData.forEach((dataItem) => {
            if (arr.indexOf(dataItem[res.prop]) === -1 && dataItem[res.prop]) {
              arr.push(dataItem[res.prop])
              res.filters.push({
                text: dataItem[res.prop],
                value: dataItem[res.prop]
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
<style lang="scss">
.hiddenFilter .el-table__column-filter-trigger,  .hiddenFilter .caret-wrapper {
  display: none;
}
.row-back-red {
  background: #fcd7e7 !important;
  td {
    background: #fcd7e7 !important;
  }
}

.demo-table-expand {
  padding-left: 160px;
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  // display: flex;
  // align-content: center;
  .demo-table-expand_span {
    height: 40px;
    line-height: 40px;
    display: block;
  }
}

.el-table-column_Unfold {
  height: 30px;
  line-height: 30px;
}

.toggleTableColumn {
  display: none;
}
</style>
