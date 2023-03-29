<template>
  <div>
    <at-row v-for="(row,index) in layoutList" :key="index" :gutter="row.gutter">
      <at-col class="grid-content" v-for="(col,index2) in row.col"
              :span="col.span" :offset="col.offset" :key="index-index2">
        <slot :name="col.name" />
      </at-col>
    </at-row>
  </div>
</template>

<script>
export default {
  name: 'gridLayout', // 栅格布局
  props: {
    /** 布局列表 数据格式
     * layoutList: [
      {
        gutter: 50,
        col: [
            {
              name: 'header',
              span: 12
            },
          ]
       }
     ] // 布局集合 */
    layoutList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
// 奇数
.el-col:nth-child(odd){
  background: #3E5E90;
}
// 偶数
.el-col:nth-child(even){
  background: #254679;
}
</style>
