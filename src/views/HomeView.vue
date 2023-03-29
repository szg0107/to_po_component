<template>
  <div class="home">
    <Pagination :page.sync="page" :total="total" :pageSize.sync="pageSize"/>
    <SearchBar @searchTable="initPage" :searchInfo.sync="searchInfo" :tableHead="tableHead"/>
    <Search @searchFun="searchFor" style="margin-bottom: 20px"/>
    <ExportAndAdd @handleAdd="handleAdd" @handleMultiDelete="handleMultiDelete"/>
    <FormTable :tableHead="tableHead" :tableData="tableData" style="margin-bottom: 20px"/>
    <FiveLinkage :dropdownsData="districts" :selectValue.sync="selectValue"/>
    <!--<my-test/>-->
    <at-select
      v-model="value2"
      multiple
      collapse-tags
      @change="setTree"
      placeholder="请选择">
      <at-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </at-option>
    </at-select>
    <at-tree
      :data="data"
      show-checkbox
      default-expand-all
      check-strictly
      node-key="id"
      ref="tree"
      highlight-current
      @check="handleCheck"
      :props="defaultProps"/>
  </div>
</template>

<script>
// @ is an alias to /src
import districts from '../../packages/fiveLinkage/data.json'

export default {
  name: 'HomeView',
  data () {
    return {
      test: '',
      page: 1, // 分页 当前页
      total: 1000, // 数据总条数
      pageSize: 15, // 每页展示多少条
      tableHead: [
        {
          label: '产品代号',
          prop: 'productCode',
          filters: [{
            text: '产品代号',
            value: '产品代号'
          }],
          sortable: true,
          isFilter: true,
          isSearch: true
        },
        {
          label: '归零类别',
          prop: 'loopZeroClass',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: [
              {
                dictKey: '1',
                dictValue: '测试'
              }
            ]
          },
          isSearch: true
        },
        {
          label: '级别',
          prop: 'loopZeroGrade',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: []
          },
          isSearch: true
        },
        {
          label: '型号',
          prop: 'model',
          filters: [],
          isFilter: false
        },
        {
          label: '产品名称',
          prop: 'productName',
          filters: [],
          isFilter: false
        },
        {
          label: '附件',
          prop: 'enclosure',
          filters: [],
          isFilter: false,
          isSpecialButton: true,
          width: 120,
          searchShow: true,
          buttonList: [
            {
              name: '附件管理',
              event: 'seeFile'
            }
          ]
        },
        {
          label: '第一层原因',
          prop: 'firstReason',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: []
          }
        },
        {
          label: '第二层原因',
          prop: 'secondReason',
          filters: [],
          isFilter: false
        },
        {
          label: '制单日期',
          prop: 'prepdate',
          filters: [],
          isFilter: false,
          search: {
            type: 'date'
          },
          isSearch: true
        },
        {
          label: '要求归零时间',
          prop: 'limtLoopZeroTime',
          filters: [],
          isFilter: false,
          search: {
            type: 'date'
          }
        },
        {
          label: '发现人',
          prop: 'discover',
          filters: [],
          isFilter: false
        },
        {
          label: '型号管理员编号',
          prop: 'modelAdministratorNo',
          filters: [],
          isFilter: false
        },
        {
          label: '型号管理员',
          prop: 'modelAdministrator',
          filters: [],
          isFilter: false
        },
        {
          label: '责任单位',
          prop: 'responsibleDepart',
          filters: [],
          isFilter: false,
          search: {
            type: 'dept'
          }
        },
        {
          label: '责任部门',
          prop: 'responsibleDepartment',
          filters: [],
          isFilter: false,
          search: {
            type: 'dept'
          }
        },
        {
          label: '责任人',
          prop: 'personLiable',
          filters: [],
          isFilter: false
        },
        {
          label: '问题发生环节',
          prop: 'problemLink',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: 'problemLink'
          }
        },
        {
          label: '问题概述',
          prop: 'problemOverview',
          filters: [],
          isFilter: false
        },
        {
          label: '问题定位及原因分析',
          prop: 'problemLocationReason',
          filters: [],
          isFilter: false
        },
        {
          label: '归零措施',
          prop: 'zeroMeasure',
          filters: [],
          isFilter: false
        },
        {
          label: '故障模式',
          prop: 'faultMode',
          filters: [],
          isFilter: false
        },
        {
          label: '故障机理',
          prop: 'faultMechanism',
          filters: [],
          isFilter: false
        },
        {
          label: '技术工作准则或禁忌',
          prop: 'techWorkGuidelineTaboo',
          filters: [],
          isFilter: false
        },
        {
          label: '可能涉及的产品类别',
          prop: 'linkProductionClass',
          filters: [],
          isFilter: false
        },
        {
          label: '涉及本单位的产品',
          prop: 'linkProduction',
          filters: [],
          isFilter: false
        },
        {
          label: '涉及型号',
          prop: 'linkModel',
          filters: [],
          isFilter: false
        },
        {
          label: '涉及系统',
          prop: 'linkSys',
          filters: [],
          isFilter: false
        },
        {
          label: '举一反三措施及落实情况',
          prop: 'implementation',
          filters: [],
          isFilter: false
        },
        {
          label: '举一反三产品代号及产品批次号',
          prop: 'needDrawInference',
          filters: [],
          isFilter: false
        },
        {
          label: '举一反三工作完成情况记录',
          prop: 'finishedRecord',
          filters: [],
          isFilter: false
        },
        {
          label: '所属系统',
          prop: 'belongSys',
          filters: [],
          isFilter: false
        },
        {
          label: '问题发生时间',
          prop: 'problemTime',
          filters: [],
          isFilter: false,
          search: {
            type: 'date'
          }
        },
        {
          label: '状态',
          prop: 'state',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: []
          }
        },
        {
          label: '归零时间',
          prop: 'loopZeroTime',
          filters: [],
          isFilter: false,
          search: {
            type: 'date'
          },
          isSearch: true
        },
        {
          label: '问题名称',
          prop: 'loopZeroName',
          filters: [],
          isFilter: false
        },
        {
          label: '问题编号',
          prop: 'productNumber',
          filters: [],
          isFilter: false
        }
      ], // 表头
      searchInfo: {
        expressions: 'like'
      }, // 搜索内容
      tableData: [{ productCode: '产品代号', updateBtnShow: true, delBtnShow: true }, { productCode: '产品代号2' }], // 表格数据
      districts: districts.districts, // 省市级联数据
      selectValue: {}, // 省市级联选中数据
      layoutList: [
        {
          gutter: 50,
          col: [
            {
              name: 'header',
              span: 6
            },
            {
              name: 'header1',
              span: 6
            },
            {
              name: 'header2',
              span: 6
            },
            {
              name: 'header3',
              span: 6
            }
          ]
        },
        {
          gutter: 50,
          col: [
            {
              name: 'main',
              span: 6
            },
            {
              name: 'main2',
              span: 6
            },
            {
              name: 'main3',
              span: 6
            },
            {
              name: 'main3',
              span: 6
            }
          ]
        }
      ],
      value2: [],
      options: [{
        value: 1,
        label: '一级 1'
      }, {
        value: 4,
        label: '二级 1-1'
      }, {
        value: 9,
        label: '三级 1-1-1'
      }, {
        value: 10,
        label: '三级 1-1-2'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components: {
    Pagination: () => import('../../packages/Pagination/index.vue'),
    SearchBar: () => import('../../packages/search-main/index.vue'),
    ExportAndAdd: () => import('../../packages/table-btn/index.vue'),
    FormTable: () => import('../../packages/table-main/index.vue'),
    FiveLinkage: () => import('../../packages/fiveLinkage/index.vue'),
    // TopMiddle: () => import('../../packages/gridLayout/index.vue'),
    // myTest: () => import('../../packages/test/test.vue'),
    Search: () => import('../../packages/Search/index.vue')
  },
  created () {
  },
  mounted () {
  },
  methods: {
    initPage (val) {
      console.log(`${val}  pagination`)
      console.log(this.page, this.pageSize)
    },
    searchFor (input) {
      console.log(input)
      // 判断输入值是否在历史记录中存在
      // const result = this.historyList.findIndex(item => item.value === input)
      // 不存在保存在历史记录中
      // if (result === -1) {
      //   this.historyList.unshift({ id: this.historyList.length + '', value: input })
      // }
    },
    handleAdd () {
      this.tableData.push({ productCode: `产品代号${parseInt(Math.random() * 1000)}` })
    },
    handleMultiDelete () {
      this.tableData.shift()
    },
    setTree (val) {
      this.$refs.tree.setCheckedKeys(val)
    },
    handleCheck (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      // console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys)
      if (this.value2.includes(checkedNodes.id)) {
        this.value2.splice(this.value2.findIndex(item => item === checkedNodes.id), 1)
      } else {
        this.value2.push(checkedNodes.id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
