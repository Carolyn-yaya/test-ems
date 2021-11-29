<template>
  <div class="WorkOrderList">
    <a-form layout="inline">
      <collapse-row :collapse="collapse">
        <a-col :xl="6" :xxl="4">
          <a-form-item label="工单编号">
            <a-input v-model="query.orderNum" placeholder="工单编号">
              <template #suffix>
                <SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="6" :xxl="4">
          <a-form-item label="工单类型">
            <a-select v-model="query.orderType" placeholder="工单类型" allow-clear>
              <a-select-option value="1">维修</a-select-option>
              <a-select-option value="2">维保</a-select-option>
              <a-select-option value="3">点检</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xl="6" :xxl="4">
          <a-form-item label="门店">
            <a-tree-select
              v-model:value="query.store"
              style="width: 100%"
              :tree-data="storeData"
              tree-checkable
              allow-clear
              search-placeholder="门店"
              placeholder="门店"
            />
          </a-form-item>
        </a-col>

        <template v-slot:suffix>
          <a-col :xl="6" :xxl="4">
            <!-- <template v-slot:suffix> -->
            <a-button type="primary">查 询</a-button>
            <a-button>重 置</a-button>
            <a-button
              :class="['collapse-btn', {'up-ward': !collapse }]"
              @click="collapse = !collapse"
            >
              <DownOutlined />
              {{ collapse ? '展开' : '折叠' }}
            </a-button>
            <!-- </template> -->
          </a-col>
        </template>
        <template v-slot:collapse>
          <a-col :xl="6" :xxl="4">
            <a-form-item label="工单名称">
              <a-input v-model="query.orderNum" placeholder="工单名称">
                <template #suffix>
                  <SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :xxl="4">
            <a-form-item label="来源">
              <a-select v-model="query.source" placeholder="来源" allow-clear>
                <a-select-option value="1">告警</a-select-option>
                <a-select-option value="2">维保</a-select-option>
                <a-select-option value="3">点检</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :xxl="4">
            <a-form-item label="状态">
              <a-select v-model="query.status" placeholder="状态" allow-clear>
                <a-select-option value="1">已分配</a-select-option>
                <a-select-option value="2">处理中</a-select-option>
                <a-select-option value="3">待验收</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :xxl="4">
            <a-form-item label="创建时间">
              <a-range-picker
                v-model:value="timeRange"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                @change="handleTimeChange"
              />
            </a-form-item>
          </a-col>
        </template>
      </collapse-row>
    </a-form>
    <base-table
      v-bind="tableDef"
      :page-num="query.pageNum"
      :page-size="query.pageSize"
      :total="tableDef.list.length"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { SearchOutlined, DownOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'WorkOrderList',
  components: { SearchOutlined, DownOutlined },
  setup () {
    const query = reactive({
      orderNum: '',
      orderType: '',
      store: [],
      orderName: '',
      source: '',
      status: '',
      createStartTime: '',
      createEndTime: '',
      pageNum: 1,
      pageSize: 20
    })
    const state = reactive({
      selectedRowKeys: [],
      timeRange: [],
      collapse: true,
      storeData: []
    })
    const tableDef = reactive({
      operate: {
        lbtns: [{ name: '批量失效' }]
      },
      actions: {
        width: 150,
        btns: [{ name: '详情' }, { name: '失效' }, { name: '处理' }]
      },
      columns: [
        { prop: 'orderNum', key: 'orderNum', label: '工单编号', width: 180 },
        { prop: 'orderType', key: 'orderType', label: '工单类型', width: 120, align: 'center' },
        { prop: 'store', key: 'store', label: '门店', width: 140 },
        { prop: 'orderName', key: 'orderName', label: '工单名称', width: 160 },
        { prop: 'source', key: 'source', label: '来源', width: 80, align: 'center' },
        { prop: 'frequency', key: 'frequency', label: '频率', width: 80, align: 'center' },
        { prop: 'describe', key: 'describe', label: '描述', width: 160 },
        { prop: 'emergency', key: 'emergency', label: '紧急程度', width: 120, align: 'center' },
        { prop: 'handler', key: 'handler', label: '当前处理人', width: 140 },
        { prop: 'createTime', key: 'createTime', label: '创建时间', width: 160, align: 'center' },
        { prop: 'requiredTime', key: 'requiredTime', label: '要求时间', width: 160, align: 'center' },
        { prop: 'deadTime', key: 'deadTime', label: '失效时间', width: 160, align: 'center' },
        { prop: 'finishTime', key: 'finishTime', label: '完成时间', width: 160, align: 'center' },
        { prop: 'status', key: 'status', label: '状态', width: 100, align: 'center' }
      ],
      list: [
        { orderNum: 'R1008-20210525-0001', orderType: '维修', store: '新沂店-1008', orderName: '打印机维修', source: '告警', frequency: '-', describe: '打印机无法工作', emergency: '一般', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '已分配' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0002', orderType: '维修', store: '新沂店-1008', orderName: '空凋零部件更换', source: '点检', frequency: '-', describe: '零部件老化', emergency: '严重', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '处理中' },
        { orderNum: 'R1008-20210525-0003', orderType: '维修', store: '新沂店-1008', orderName: '项目名称', source: '维保', frequency: '-', describe: '-', emergency: '紧急', handler: '李工,王工……', createTime: '2021-5-25 16:09:15', requiredTime: '-', deadTime: '-', finishTime: '-', status: '待验收' }
      ]
    })
    const antTableRef = ref()

    const handleTimeChange = time => {
      if (time.length === 0) return
      query.createStartTime = time[0]
      query.createEndTime = time[1]
    }
    const onSelectChange = selectedRowKeys => {
      state.selectedRowKeys = selectedRowKeys
    }
    const handlePageChange = ({ currentPage, pageSize }) => {
      query.pageNum = currentPage
      query.pageSize = pageSize
    }
    const emergencyColor = ({ emergency }) => {
      let color = 'rgba(0, 0, 0, 0.85)'
      switch (emergency) {
        case '一般':
          color = '#1F9ADD'
          break
        case '紧急':
          color = '#E07F0A'
          break
        case '严重':
          color = '#D44038'
          break
      }
      return color
    }

    onMounted(() => {})
    return {
      query,
      antTableRef,
      ...toRefs(state),
      tableDef,
      handleTimeChange,
      handlePageChange,
      onSelectChange,
      emergencyColor
    }
  }
})
</script>

<style lang="less">
.WorkOrderList {
  display: flex;
  flex-direction: column;
  .ant-btn {
    margin: 0 2px;
  }
  .ant-form-item-label {
    width: 60px;
  }
}
</style>
