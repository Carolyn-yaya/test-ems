import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo () {
  return request({
    url: '/user/getUserInfoById',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserMenuRoute () {
  return request({
    url: '/user/getUserMenuRoute',
    method: 'get'
  })
}

// 获取系统名称
export function getUserSystemName () {
  return request({
    url: '/common/getUserSystemName',
    method: 'get'
  })
}

// 获取系统logo
export function getLogo () {
  return request({
    url: '/common/getLogo',
    method: 'get'
  })
}
