const props = {
  type: String,
  height: [String, Number],
  maxHeight: [String, Number],
  size: {
    type: String,
    default: 'small'
  },
  stripe: {
    type: Boolean,
    default: true
  },
  highlightHoverRow: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true
  },
  round: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  resizable: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  headerCellClassName: [String, Function],
  rowClassName: [String, Function],
  cellClassName: [String, Function],
  cellStyle: [String, Function],
  scrollX: {
    type: Object,
    default: () => {
      return {
        enabled: true
      }
    }
  },
  scrollY: {
    type: Object,
    default: () => {
      return {
        enabled: true
      }
    }
  },
  // 合并行 对应的map
  // 如果有值 会根据对应的规则合并 行
  // { 列的属性：对应的用来判断是否合并 的值 的属性} eg{type: typeId}
  mergeRowMap: {
    type: Object,
    default: () => {}
  },
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  list: {
    type: Array,
    required: true,
    default: () => []
  },
  // 表格上方操作按钮
  operate: {
    type: Object,
    default: () => {}
  },
  // 表格操作列
  actions: {
    type: Object,
    default: () => {}
  },
  // ==== column
  showIndex: {
    type: Boolean,
    default: false
  },
  showRadio: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  showPager: {
    type: Boolean,
    default: true
  },
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  total: {
    type: Number,
    default: 0
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [20, 50, 100]
    }
  },
  treeConfig: {
    type: Object
  }
}

export default props
