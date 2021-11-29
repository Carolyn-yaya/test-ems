<template>
  <div ref="alarmPieChartRef" style="height: 200px"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  setup () {
    const alarmPieChartRef = ref()
    const state = reactive({
      chart: null
    })
    onMounted(() => {
      initChart()
    })
    const initChart = () => {
      state.chart = echarts.init(alarmPieChartRef.value, 'macarons')
      state.chart.clear()
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          icon: 'circle',
          itemWidth: 10,
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '75%'],
            top: 0,
            bottom: 30,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              { value: 10200, name: '高' },
              { value: 735, name: '中' },
              { value: 580, name: '低' }
            ]
          }
        ]
      }
      state.chart.setOption(option)
    }
    return {
      alarmPieChartRef,
      ...toRefs(state),
      initChart
    }
  }
})
</script>

<style>
</style>
