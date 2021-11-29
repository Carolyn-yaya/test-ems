import axios from 'axios'
import { Modal, notification } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { createVNode } from 'vue'

const service = axios.create({
  baseURL: '/web',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.request.responseType === 'blob') {
      return response
    } else if (response.data && response.data instanceof Array) { // 后台返回异常数据结构处理
      return { data: response.data, code: 200 }
    } else if (response.data && response.data.code === 401) {
      Modal.confirm({
        content: '退出登录',
        icon: createVNode(ExclamationCircleOutlined),
        onOk () {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        },
        cancelText: 'Cancel',
        onCancel () {
          Modal.destroyAll()
        }
      })
      store.dispatch('user/logout').then(() => {
        location.reload()
      })
    } else if (response.data && response.data.code === 500) {
      notification({
        message: response.data.data || response.data.message,
        type: 'error'
      })
    } else if (response.data && response.data.code !== 200) {
      notification({
        message: response.data && response.data.message,
        type: 'warning'
      })
    }
    return response.data // 仅return返回data数据
  },
  error => {
    console.log(error.response)
    notification.error({
      title: `网络错误${error.response ? '，状态码：' + error.response.status : '！'}`,
      message: error.response && error.response.data.message || error.message || '网络错误，请求失败！'
    })
    return Promise.reject(error)
  }
)

export default service
