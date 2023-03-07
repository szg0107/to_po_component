<template>
  <!-- 菜单栏 -->
  <div class="table-btn">
    <slot></slot>
    <el-button v-if="isAdd" @click="handleAdd" type="primary" icon="el-icon-plus">新增</el-button>
    <el-button v-if="isDel" @click="handleMultiDelete" type="danger" icon="el-icon-delete">删除
    </el-button>
    <el-button v-if="isHandle" @click="handleRequest" type="primary" icon="el-icon-bell">
      {{ isHandle_html }}
    </el-button>
    <el-button @click="exportTody" type="primary" icon="el-icon-download" v-if="exportShow">导出当前
    </el-button>
    <el-button @click="exportAll" type="primary" icon="el-icon-download" v-if="exportShow">导出所有
    </el-button>
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
    isHandle_html: {
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
    exportTody () {
      this.$parent.exportExecl(1)
    },
    exportAll () {
      this.$parent.exportExecl(2)
    }
  }
}
</script>
<style scoped lang="scss">
.table-btn {
  display: flex;
  .upload-demo {
    margin-right: 10px;
  }
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
