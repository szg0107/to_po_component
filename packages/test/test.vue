<template>
<div>
  <div id="echarts" style="width: 500px;height: 500px"></div>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'myTest',
  data () {
    return {
      lineData: [150, 230, 224, 218, 135, 147, 260],
      Interval: null
    }
  },
  mounted () {
    this.initEcharts()
  },
  beforeRouteLeave () {
    clearInterval(this.Interval)
  },
  methods: {
    initEcharts () {
      const myChart = echarts.init(document.getElementById('echarts'))
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.lineData,
            type: 'line'
          }
        ]
      })
      this.IntervalFun(myChart)
    },
    IntervalFun (myChart) {
      const that = this
      this.Interval = setInterval(() => {
        const newLineData = []
        that.lineData.forEach(item => {
          const random = Math.random()
          let num = 0
          if (random > 0.5) {
            num = item + Math.floor(Math.random() * (10 - 1) + 1)
          } else {
            num = item - Math.floor(Math.random() * (10 - 1) + 1)
          }
          newLineData.push(num)
        })
        that.lineData = newLineData
        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: that.lineData,
              type: 'line'
            }
          ]
        }
        myChart.setOption(option)
        console.log(1111)
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
