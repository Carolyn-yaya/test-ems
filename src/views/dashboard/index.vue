<template>
  <div class="dashboard">
    <a-row :gutter="15" style="height: 100%">
      <a-col :span="8" class="flex-col" >
        <a-card class="flex-2">
          <map-chart />
        </a-card>
        <a-card class="mt15 flex-1">
          <template #title>
            <div class="a-card-title">
              <div class="title-text">
                <span>今日点检</span>
              </div>
              <a-tree-select
                v-model:value="spotStore"
                style="width: 160px"
                :tree-data="storeData"
                tree-checkable
                allow-clear
                search-placeholder="门店"
                placeholder="门店"
              />
            </div>
          </template>
          <div>已分配（71）</div>
          <a-progress :percent="71" :strokeWidth="16" :showInfo="false" />
          <div>待验收（22）</div>
          <a-progress :percent="30" :strokeWidth="16" strokeColor="#F75F68" :showInfo="false" />
          <div>已完成（16）</div>
          <a-progress :percent="16" :strokeWidth="16" strokeColor="#5753FF" :showInfo="false" />
        </a-card>
      </a-col>
      <a-col :span="16" class="flex-col">
        <a-row :gutter="15">
          <a-col :span="8">
            <a-card>
              <template #title>
                <div class="a-card-title">
                  <div class="title-text">
                    <span>在线员工</span>
                  </div>
                </div>
              </template>
              <div style="text-align: center">
                <a-progress
                  type="circle"
                  :percent="30"
                  :width="166"
                  :strokeWidth="8"
                  strokeColor="#5753FF"
                >
                  <template #format>
                    <svg-icon class="svg-qunzu" icon-class="qunzu"></svg-icon>
                  </template>
                </a-progress>
                <div style="margin-top: 20px">111人在线</div>
              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card>
              <template #title>
                <div class="a-card-title">
                  <div class="title-text">
                    <span>工单</span>
                  </div>
                  <a-tree-select
                    v-model:value="spotStore"
                    style="width: 160px"
                    :tree-data="storeData"
                    tree-checkable
                    allow-clear
                    search-placeholder="门店"
                    placeholder="门店"
                  />
                </div>
              </template>
              <order-pie-chart />
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card>
              <template #title>
                <div class="a-card-title">
                  <div class="title-text">
                    <span>报警统计</span>
                  </div>
                  <a-tree-select
                    v-model:value="spotStore"
                    style="width: 160px"
                    :tree-data="storeData"
                    tree-checkable
                    allow-clear
                    search-placeholder="门店"
                    placeholder="门店"
                  />
                </div>
              </template>
              <alarm-pie-chart />
            </a-card>
          </a-col>
        </a-row>
        <alarm-list class="flex-1" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import MapChart from './components/MapChart'
import OrderPieChart from './components/OrderPieChart'
import AlarmPieChart from './components/AlarmPieChart'
import AlarmList from './components/AlarmList'

import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Dashboard',
  components: { MapChart, OrderPieChart, AlarmPieChart, AlarmList },
  setup () {
    const state = reactive({
      storeData: [],
      spotStore: [],
      riskValue: null
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less">
.dashboard {
  .flex-col {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .flex-1 {
    flex: 1;
    height: 100%;
  }
  .flex-2 {
    flex: 2;
    .ant-card-body {
      height: 100%;
    }
  }
  .a-card-title {
    display: flex;
    justify-content: space-between;
    .title-text {
      position: relative;
      &::before {
        content: '';
        width: 4px;
        height: 20px;
        background: #007538;
        position: absolute;
        left: 0;
        top: 2px;
      }
      span {
        padding-left: 10px;
        font-size: 16px;
        font-weight: 800;
      }
    }
  }
  .svg-qunzu {
    color: #cccccc;
    font-size: 50px;
  }
}
</style>
