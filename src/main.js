import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
import directives from './directive'
import './icons'

import SvgIcon from './icons/svgIcon.vue'
import CollapseRow from '@/components/CollapseRow'
import BaseTable from '@/components/vxeTable/BaseTable'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import './styles/vex-table.scss'

import './styles/index.less'

moment.locale('zh-cn')

const app = createApp(App)
app.use(store)
  .use(router)
  .use(Antd)
  .use(VXETable)
  .mount('#app')

app.component(CollapseRow.name, CollapseRow)
  .component(SvgIcon.name, SvgIcon)
  .component(BaseTable.name, BaseTable)

for (const directive in directives) {
  app.directive(directive, directives[directive])
}
