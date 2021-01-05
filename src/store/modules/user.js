/* eslint-disable no-undef */
// import { store } from '../../../src/store'
import {
  login,
  logout,
  getInfo
} from '@/api/user'
// import { login, logout, getInfo } from '@/api/user'
import {
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'

const state = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    // console.log('NNNNNNNNNNNNNNN888888888888888888881NNNNNNNNNNNNNN')
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
 
    const {
      username,
      password
    } = userInfo
    console.log(userInfo)
   
    return new Promise((resolve, reject) => {
      //改登录参数
      let loginQuery = {
        model: {
          account: username.trim(),
          password: password
        },
        terminal: {
          code: "0",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      };
      // loginQuery.model = this.loginForm;
      // console.log(loginQuery);
      login(loginQuery).then(response => { //{account: username.trim(), password: password} 原来的参数
        const {
          data
        } = response
        commit('SET_TOKEN', data.token) //存在vuex中   
        const {
          roles,
          name,
          account,//自己增加的
          avatar,
          introduction
        } = data
        // commit('SET_ROLES', roles)
        commit('SET_ROLES', account)//修改内容
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        localStorage.setItem('token', JSON.stringify(data.token)) //存在localStorage中
        setToken(data.token) //存在cookie中
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // getInfo({ Extractor: state.token }).then(response => {
      getInfo().then(response => {
        if (response.status !== 200) { // 由于mockjs 不支持自定义状态码只能这样hack
          reject('error')
        }
        // eslint-disable-next-line no-const-assign
        // data = {
        //   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //   introduction: ' am a super administrator',
        //   name: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //   permissions: ['*:*:*'],
        //   roles: ['admin']
        // }
        const data = response.data
        // const { data } = response
        if (!data) {
          reject('验证失败，请重新登录。')
        }
        // console.log(data)
        const {
          roles,
          name,
          avatar,
          introduction
        } = data
        // console.log('获取到权限用户')
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo:角色必须是非空数组！')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        // console.log('查看roles:' + store.getters.roles)
        resolve(response)
      }).catch(error => {
        // reject('getInfo报错了报错了!')
        reject(error)
      })
    })
  },

  // user logout 退出系统
  logout({
    commit,
    state,
    dispatch
  }) {
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRR8888888888888888888')
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // removeRoles()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {
          root: true
        })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 刷新token
  refreshToken({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      refreshtoken({
        token: state.token
      }).then(response => {
        const {
          token
        } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      // removeRoles()
      // config.headers['Authorization'] = ''
      // if (!store.getters.token) {
      // config.headers['Authorization'] = ''
      // }
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  data() {
    return
  }
}
