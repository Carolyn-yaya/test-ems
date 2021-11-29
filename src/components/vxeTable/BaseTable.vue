<template>
  <div class="base-table">
    <vxe-toolbar
      ref="xToolbar"
      size="small"
      v-if="operate"
    >
      <template #buttons>
        <span v-for="(btn, index) in operate.lbtns" :key="index">
          <vxe-button
            v-if="btn.dropdowns && btn.dropdowns.length > 0 && (btn.show ? btn.show(row) : true)"
            type="text"
            :content="btn.name"
            :transfer="true"
          >
            <template #dropdowns>
              <vxe-button
                type="text"
                v-for="(item, i) in btn.dropdowns"
                :key="i"
                :content="item.name"
                v-show="item.show ? item.show(row) : true"
                @click="item.fun(row)"
              />
            </template>
          </vxe-button>
          <vxe-button
            v-else
            type="text"
            :loading="btn.loading"
            :content="btn.name"
            v-show="btn.show ? btn.show(row) : true"
            @click="btn.fun(row)"
          />
        </span>
      </template>
      <template #tools>
        <vxe-button
          circle
          v-for="btn in operate.rbtns"
          :loading="btn.loading"
          :key="btn.name"
          :title="btn.name"
          :icon="btn.icon"
          @click="btn.fun(btn)"
        />
      </template>
    </vxe-toolbar>
    <div class="vxe-wrap">
      <vxe-table
        ref="xTable"
        round
        :stripe="stripe && !treeConfig"
        :highlight-hover-row="highlightHoverRow"
        :highlight-current-row="highlightCurrentRow"
        height="auto"
        auto-resize
        row-id="id"
        :tree-config="treeConfig"
        :resizable="resizable"
        :size="size"
        :border="border"
        :header-cell-class-name="headerCellClassName"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :scroll-x="scrollX"
        :scroll-y="scrollY"
        :loading="loading"
        :checkbox-config="treeConfig?null:{
          labelField: '',
          highlight: false,
          range: true,
        }"
        :data="list"
        :span-method="mergeRowMethod"
        @radio-change="({ row, column }) => emitEventHandler('radio-change', row, column)"
        @checkbox-all="({ checked, records }) => emitEventHandler('checkbox-all', checked, records)"
        @checkbox-change="({ checked, records }) =>emitEventHandler('checkbox-change', checked, records)"
        @current-change="({ row }) => emitEventHandler('current-change', row)"
      >
        <!-- 序号列 -->
        <vxe-table-column v-if="showIndex" type="seq" width="60" />
        <!-- 单选列 -->
        <vxe-table-column v-if="showRadio" type="radio" width="35">
          <template #header>
            <vxe-button type="text">取消</vxe-button>
          </template>
        </vxe-table-column>
        <vxe-table-column
          v-if="showCheckbox && columns && columns.length"
          type="checkbox"
          width="35"
        />
        <template v-for="column in columns" :key="column.prop">
          <vxe-table-column
            :field="column.prop"
            :title="column.label"
            :align="column.align"
            :fixed="column.fixed"
            :min-width="column.minWidth || column.width"
            :tree-node="column.treeNode"
            show-overflow
            show-header-overflow
          >
            <template #default="{ row }">
              <span v-if="column.slotName">
                <slot :name="column.slotName" :row="row" />
              </span>
              <span v-else-if="column.render" v-html="column.render(row)" />
              <span v-else>{{ row[column.prop] }}</span>
            </template>
          </vxe-table-column>
        </template>
        <vxe-table-column
          v-if="actions && actions.btns && actions.btns.length > 0"
          :width="actions.width"
          :align="actions.align || 'center'"
          title="操作"
          fixed="right"
        >
          <template #default="{ row }">
            <span v-for="(btn, index) in actions.btns" :key="index">
              <vxe-button
                v-if="btn.dropdowns && btn.dropdowns.length > 0 && (btn.show ? btn.show(row) : true)"
                type="text"
                :size="size"
                :content="btn.name"
                :transfer="true"
              >
                <template #dropdowns>
                  <vxe-button
                    type="text"
                    v-for="(item, i) in btn.dropdowns"
                    :key="i"
                    :content="item.name"
                    v-show="item.show ? item.show(row) : true"
                    @click="item.fun(row)"
                  />
                </template>
              </vxe-button>
              <vxe-button
                v-else
                type="text"
                :size="size"
                :content="btn.name"
                v-show="btn.show ? btn.show(row) : true"
                @click="btn.fun(row)"
              />
            </span>
          </template>
        </vxe-table-column>
        <template #empty>
          <span style="color: #ffffff; font-size: 16px">
            <p>暂无数据</p>
          </span>
        </template>
      </vxe-table>
    </div>
    <vxe-pager
      v-if="showPager"
      background
      :size="size"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      :page-sizes="pageSizes"
      :layouts="[
        'Total',
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'FullJump',
        'Sizes',
      ]"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import props from './props/base'
export default defineComponent({
  name: 'BaseTable',
  props,
  setup (props, { emit }) {
    const emitEventHandler = event => {
      emit(event, ...Array.from(arguments).slice(1))
    }
    // 分页处理
    const handlePageChange = ({ currentPage, pageSize }) => {
      emit('page-change', { currentPage, pageSize })
    }
    // 合并单元格
    const mergeRowMethod = ({ row, _rowIndex, column, visibleData }) => {
      if (props.mergeRowMap) {
        // 要合并的列的属性
        const fields = Object.keys(props.mergeRowMap)
        if (fields.includes(column.property)) {
          // 只有定义过的列 才进行行合并
          const field = props.mergeRowMap[column.property]
          const cellValue = row[field]
          // 当前行对应的用来判断合并的参数有值
          if (cellValue) {
            // 上一行的数据
            const prevRow = visibleData[_rowIndex - 1]
            // 下一行的数据
            let nextRow = visibleData[_rowIndex + 1]

            if (prevRow && prevRow[field] === cellValue) {
              // 说明之前已经判断过 return
              return { rowspan: 0, colspan: 0 }
            } else {
              // 没有判断过 while循环
              let countRowspan = 1
              while (nextRow && nextRow[field] === cellValue) {
                // 直到不需要合并为止
                nextRow = visibleData[++countRowspan + _rowIndex]
              }
              if (countRowspan > 1) {
                // 返回上面while的结果
                return { rowspan: countRowspan, colspan: 1 }
              }
            }
          }
        }
      }
    }
    return {
      ...toRefs(props),
      emitEventHandler,
      handlePageChange,
      mergeRowMethod
    }
  }
})
</script>

<style lang="less">
.base-table {
  height: 100%;
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .vxe-wrap {
    overflow: hidden;
    flex: 1;
  }
}
</style>
