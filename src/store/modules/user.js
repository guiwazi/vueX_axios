import axios from 'axios'
const module = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    userInfo (state, list) {
      state.userInfo = list
    }
  },
  actions: {
    getReg ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post(
          `/reg`,
          params
        ).then(res => {
          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    login ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post(
          `/login`,
          params
        ).then(res => {
          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    userInfo ({state, commit}, _id) {
      return new Promise((resolve, reject) => {
        axios.get(
          `/userInfo/${_id}`
        ).then(res => {
          commit('userInfo', res.data)
          resolve(res.data)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    editUserInfo ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.put(
          `/editUserInfo`,
          params
        ).then(res => {
          console.log('修改后的用户信息', res)
          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default module
