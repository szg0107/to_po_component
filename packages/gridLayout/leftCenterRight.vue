<template>
  <at-container>
    <at-aside :width="getAsideWidth+'px'"><slot name="aside"/></at-aside>
    <at-main><slot name="main"/></at-main>
    <at-aside :width="getSectionWidth+'px'"><slot name="section"/></at-aside>
  </at-container>
</template>

<script>
export default {
  name: 'leftCenterRight', // 左中右布局
  props: {
    asideWidth: {
      type: Number,
      default: 300
    },
    sectionWidth: {
      type: Number,
      default: 300
    }
  },
  computed: {
    getAsideWidth () {
      return Number.isNaN(Number(this.asideWidth)) ? 300 : this.asideWidth
    },
    getSectionWidth () {
      return Number.isNaN(Number(this.sectionWidth)) ? 300 : this.sectionWidth
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.el-aside {
  background-color: #3E5E90;
  text-align: center;
}

.el-main {
  background-color: #254679;
  text-align: center;
  min-height: 50px;
}
</style>
