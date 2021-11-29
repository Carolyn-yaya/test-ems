<template>
  <a-card class="alarm-list mt15">
    <template #title>
      <div class="a-card-title">
        <div class="title-text">
          <span>报警列表</span>
        </div>
        <div>
          <a-tree-select
            v-model:value="options"
            style="width: 160px"
            :tree-data="storeData"
            tree-checkable
            allow-clear
            search-placeholder="门店"
            placeholder="门店"
          />
          <a-select
            v-model:value="riskValue"
            allow-clear
            style="width: 120px; margin-left: 10px"
            placeholder="请选择风险等级"
          >
            <a-select-option value="high">高</a-select-option>
            <a-select-option value="middle">中</a-select-option>
            <a-select-option value="low">低</a-select-option>
          </a-select>
        </div>
      </div>
    </template>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :scroll="{ y: '100%' }"
      :pagination="false"
    ></a-table>
  </a-card>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
const columns = [
  { title: '门店', dataIndex: 'store', width: 160 },
  { title: '报警信息', dataIndex: 'alarmInfo' },
  { title: '级别', dataIndex: 'riskLevel', width: 80, align: 'center' },
  { title: '报警发生时间', dataIndex: 'occurrenceTime', width: 160 }
]
const dataSource = [
  { store: '新沂店-1001', alarmInfo: '冷库门打开', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '冷库门打开', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' },
  { store: '新沂店-1001', alarmInfo: '深海鱼水域水质盐分超标', riskLevel: '高', occurrenceTime: '2021-6-22 16:57:16' }
]
export default defineComponent({
  name: 'AlarmList',
  props: {
    spotStore: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const state = reactive({
      riskValue: null,
      options: props.spotStore
    })
    return {
      ...toRefs(state),
      columns,
      dataSource
    }
  }
})
</script>

<style lang="less">
.alarm-list {
  .ant-card-body {
    height: calc(100% - 65px);
    overflow: auto;
  }
}
</style>
