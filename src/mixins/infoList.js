// eslint-disable-next-line max-len
// import {getProductNo,getModelList,downLoadFile,getProductPlanIdList,getTableHead,} from '@/api/common';

export default {
  data () {
    return {
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
          isFilter: true
        },
        {
          label: '归零类别',
          prop: 'loopZeroClass',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: 'typeList'
          }
        },
        {
          label: '级别',
          prop: 'loopZeroGrade',
          filters: [],
          isFilter: false,
          search: {
            type: 'select',
            list: 'statisticalLevel'
          }
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
            list: 'firstList'
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
          }
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
            list: 'statusList'
          }
        },
        {
          label: '归零时间',
          prop: 'loopZeroTime',
          filters: [],
          isFilter: false,
          search: {
            type: 'date'
          }
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
      ],
      searchBarData: [],
      tableData: [{ productCode: '产品代号', updateBtnShow: true, delBtnShow: true }, { productCode: '产品代号2' }],
      multipleSelection: [],
      searchInfo: {
        expressions: 'like'
      },
      configTitle: ['新增', '编辑', '查看'],
      configIndex: 0,
      configDialogShow: false,
      seeDialogShow: false
    }
  },
  computed: {
    ids () {
      const ids = []
      this.multipleSelection.forEach((ele) => {
        ids.push(ele.id)
      })
      return ids.join(',')
    }
  },
  methods: {
    // 每页多少条改变事件
    sizeChange (val) {
      this.pageSize = val
    },
    // 页码改变事件
    pageChange (val) {
      this.page = val
    },
    multipleChange (val) {
      this.multipleSelection = val
    },
    renovateTable () {
      this.getTableData()
    },
    // 获取表格数据，val:自定义传参
    async getTableData (val = {}, callback = '') {
      const { data } = await this.getList(this.page, this.pageSize, { ...this.searchInfo, ...val })
      data.data.records.forEach((element) => {
        // eslint-disable-next-line eqeqeq
        if (element.fileInfoList && element.fileInfoList.length == 0) {
          if (element.fileIds.split(',')[0]) {
            // eslint-disable-next-line no-param-reassign
            element.fileInfoList = element.fileIds.split(',')
          }
        }
      })
      // eslint-disable-next-line eqeqeq
      if (callback == 'callback') {
        this.page = data.data.current
        this.pageSize = data.data.size
        this.total = data.data.total
        return new Promise((resolve) => {
          resolve(data.data.records)
        })
      }
      this.tableData = data.data.records
      this.page = data.data.current
      this.pageSize = data.data.size
      this.total = data.data.total
      return new Promise((resolve) => {
        resolve(this.tableData)
      })
    },
    handleClose (done) {
      this.configDialogShow = false
      done()
    },
    fileDialogClose (done) {
      this.files = []
      done()
    },
    // 导出
    exportExecl (type) {
      let obj = {}
      // eslint-disable-next-line eqeqeq
      if (type == 1) {
        // 当前
        // eslint-disable-next-line eqeqeq
        obj = this.multipleSelection.length == 0
          ? {
              current: this.page,
              size: this.pageSize,
              ...this.searchInfo
            }
          : {
              ids: this.ids
            }
        // eslint-disable-next-line eqeqeq
      } else if (type == 2) {
        // 全部
        // eslint-disable-next-line no-unused-vars
        obj = {
          ...this.searchInfo
        }
      }
      /** downLoadFile(this.exportUrl, obj)
       .then((res) => {
          this.$message.success('导出成功');
        }); */
    },
    // 产品代号远程搜索
    async remoteMethod (query) {
      if (query !== '') {
        /** await getProductNo(query)
         .then((res) => {
            this.productNoList = res.data.data;
            this.productNoList.unshift({
              productCode: '无',
              productNumber: '',
            });
          }); */
      } else {
        this.productNoList = [
          {
            productCode: '无',
            productNumber: ''
          }
        ]
      }
    },
    async productMethod (query) {
      if (query !== '') {
        /** await getProductPlanIdList(query)
         .then((res) => {
            this.productPlanIdList = res.data.data;
          }); */
      } else {
        this.productPlanIdList = []
      }
    },
    // 型号规格远程搜索
    async modeListMethod (query) {
      if (query !== '') {
        /** await getModelList(query)
         .then((res) => {
            this.partsModelList = res.data.data;
          }); */
      } else {
        this.partsModelList = []
      }
    },
    // 打印
    formPrint (html) {
      this.$print(this.$refs[html])
    }
  },
  async mounted () {
    // 获取表头
    /** const tableHead = this.deepClone(this.tableHeadOld);
     // eslint-disable-next-line camelcase
     const new_searchBarData = [];
     // eslint-disable-next-line no-restricted-syntax
     for (const i in tableHead) {
      if (!tableHead[i].isHidden) {
        new_searchBarData.push(tableHead[i]);
      }
    }
     // eslint-disable-next-line camelcase
     this.searchBarData = new_searchBarData;
     this.tableHead = tableHead; */
    // 获取表头，上线放开
    /** await getTableHead(this.$route.path)
     .then((res) => {
        if (res.data.data == '') {
          this.tableHead = this.deepClone(this.tableHeadOld);
          return;
        }
        const head = JSON.parse(res.data.data);
        this.tableHead = head;
        this.tableHeadOld = this.deepClone(head);
      }); */
  }
}
