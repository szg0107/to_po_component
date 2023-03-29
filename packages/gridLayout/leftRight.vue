<template>
  <at-container>
    <at-aside :width="getAsideWidth+'px'"><slot name="aside"/></at-aside>
    <at-main><slot name="main"/></at-main>
  </at-container>
</template>

<script>
export default {
  name: 'leftRight',
  asideWidth: {
    type: Number,
    default: 300
  },
  computed: {
    getAsideWidth () {
      return Number.isNaN(Number(this.asideWidth)) ? 300 : this.asideWidth
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
