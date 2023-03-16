<template>
  <!-- 菜单栏 -->
  <div class="table-btn">
    <slot></slot>
    <at-button v-if="isAdd" @click="handleAdd" type="primary" icon="el-icon-plus">新增</at-button>
    <at-button v-if="isDel" @click="handleMultiDelete" type="danger" icon="el-icon-delete">删除</at-button>
    <at-button v-if="isHandle" @click="handleRequest" type="primary" icon="el-icon-bell">{{ isHandle_text }}</at-button>
    <at-button @click="exportExcl(1)" type="primary" icon="el-icon-download" v-if="exportShow">导出当前</at-button>
    <at-button @click="exportExcl(2)" type="primary" icon="el-icon-download" v-if="exportShow">导出所有</at-button>
  </div>
</template>

<script>
export default {
  name: 'ExportAndAdd',
  data () {
    return {}
  },
  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    isDel: {
      type: Boolean,
      default: true
    },
    isHandle: {
      type: Boolean,
      default: false
    },
    isHandle_text: {
      type: String,
      default: '申请'
    },
    // 导出按钮显示
    exportShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /** 新增 */
    handleAdd () {
      this.$emit('handleAdd')
    },
    /** 批量删除 */
    handleMultiDelete () {
      this.$emit('handleMultiDelete')
    },
    handleRequest () {
      this.$emit('handleRequest')
    },
    /** 导出Excl val为1 导出当前 2导出所有 */
    exportExcl (val) {
      this.$emit('exportExcl', val)
    }
  }
}
</script>
<style scoped lang="scss">
.table-btn {
  display: flex;
}
/deep/ .el-button {
  padding: 0 8px;
  height: 32px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 2px;
}
/deep/ .el-button--danger {
  background-color: #fa163c;
  border-radius: 2px;
  border: none;
}
</style>
