import {
  login,
  logout,
  getUserInfo,
  getUserMenuRoute
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import routers from '@/utils/routers'
import md5 from 'js-md5'

const getDefaultState = () => {
  return {
    token: getToken(),
    id: '',
    name: '',
    routes: [],
    permission: [],
    systemName: '',
    logo: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  },
  SET_SYSTEM_NAME: (state, systemName) => {
    state.systemName = systemName
  },
  SET_SYSTEM_LOGO: (state, logo) => {
    state.logo = logo
  }
}

const actions = {
  systemLogin ({ commit }, userInfo) {
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      login({
        loginName: userInfo.username.trim(),
        password: md5(userInfo.password)
      }).then(res => {
        if (res.code === 200) {
          resolve(res)
          commit('SET_TOKEN', res.data)
        } else {
          reject()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(res => {
        if (res.code === 200) {
          const {
            email,
            nickname,
            permits
          } = res.data
          commit('SET_ID', email)
          commit('SET_NAME', nickname)
          commit('SET_PERMISSION', permits)
          commit('SET_ROUTES', routers)
          resolve({
            ...res.data,
            ...{
              routers
            }
          })
        } else {
          reject()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout ({
    commit
  }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken ({
    commit
  }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
