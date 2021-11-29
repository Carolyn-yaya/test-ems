<template>
  <div ref="mapChartRef" style="height: 100%"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import * as echarts from 'echarts'
import jiangsu from '@/assets/geo/jiangsu.json'

export default defineComponent({
  setup () {
    const mapChartRef = ref()
    const state = reactive({
      chart: null
    })
    onMounted(() => {
      initChart()
    })
    const initChart = () => {
      state.chart = echarts.init(mapChartRef.value, 'macarons')
      state.chart.clear()
      echarts.registerMap('js', jiangsu)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center'
          // feature: {
          //   dataView: { readOnly: false },
          //   restore: {},
          //   saveAsImage: {}
          // }
        },
        series: [
          {
            name: '江苏13区人口密度',
            type: 'map',
            mapType: 'js', // 自定义扩展图表类型
            label: {
              show: true
            },
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            data: [
              { name: '徐州', value: 20057.34 },
              { name: '连云港', value: 15477.48 },
              { name: '宿迁', value: 31686.1 },
              { name: '淮安', value: 6992.6 },
              { name: '盐城', value: 44045.49 },
              { name: '扬州', value: 40689.64 },
              { name: '泰州', value: 37659.78 },
              { name: '南京', value: 45180.97 },
              { name: '镇江', value: 55204.26 },
              { name: '南通', value: 21900.9 },
              { name: '常州', value: 4918.26 },
              { name: '无锡', value: 5881.84 },
              { name: '苏州', value: 4178.01 }
            ]
          }
        ]
      }
      state.chart.setOption(option)
    }
    return {
      mapChartRef,
      ...toRefs(state),
      initChart
    }
  }
})
</script>

<style>
</style>
