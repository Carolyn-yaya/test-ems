<template>
  <div ref="pieChartRef" style="height: 200px"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  setup () {
    const pieChartRef = ref()
    const state = reactive({
      chart: null
    })
    onMounted(() => {
      initChart()
    })
    const initChart = () => {
      state.chart = echarts.init(pieChartRef.value, 'macarons')
      state.chart.clear()
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          icon: 'circle',
          itemWidth: 10,
          orient: 'vertical',
          right: 0,
          top: '25%'
        },
        grid: {

        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '75%'],
            right: '25%',
            bottom: 20,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 10200, name: '已完成' },
              { value: 735, name: '已分配' },
              { value: 580, name: '处理中' },
              { value: 484, name: '待验收' },
              { value: 400, name: '已失效' }
            ]
          }
        ]
      }
      state.chart.setOption(option)
    }
    return {
      pieChartRef,
      ...toRefs(state),
      initChart
    }
  }
})
</script>

<style>
</style>
