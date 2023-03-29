<template>
<at-container direction="vertical">
  <at-header :height="getHeaderHeight+'px'" ><slot name="header"/></at-header>
  <at-main><slot name="main"/></at-main>
  <at-footer :height="getFooterHeight+'px'" ><slot name="footer"/></at-footer>
</at-container>
</template>

<script>
export default {
  name: 'topMiddleBottom', // 上中下布局
  props: {
    headerHeight: {
      type: Number,
      default: 60
    },
    footerHeight: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {}
  },
  computed: {
    getHeaderHeight () {
      return Number.isNaN(Number(this.headerHeight)) ? 60 : this.headerHeight
    },
    getFooterHeight () {
      return Number.isNaN(Number(this.footerHeight)) ? 60 : this.footerHeight
    }
  }
}
</script>

<style scoped lang="scss">
.el-header, .el-footer {
  background-color: #3E5E90;
  text-align: center;
}

.el-aside {
  background-color: #D3DCE6;
  text-align: center;
}

.el-main {
  background-color: #254679;
  text-align: center;
  min-height: 50px;
}
</style>
