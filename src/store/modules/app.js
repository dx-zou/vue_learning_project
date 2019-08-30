import { TOGGLE_DEVICE, CHANGE_ACTIVEINDEX } from '../mutation-types'

const state = {
  device: 'desktop',
  activeIndex: ''
}

const mutations = {
  // 切换设备
  [TOGGLE_DEVICE]: (state, device) => {
    state.device = device
  },
  // 切换选中的菜单项index
  [CHANGE_ACTIVEINDEX]: (state, data) => {
    state.activeIndex = data
  }
}

const actions = {
  // 提交设备切换
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 提交菜单项切换
  changeActiveIndex ({ commit }, data) {
    commit('CHANGE_ACTIVEINDEX', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
