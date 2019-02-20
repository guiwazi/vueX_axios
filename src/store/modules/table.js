import axios from 'axios'
const module = {
  namespaced: true,
  state: {
    tableList: [],
    tableListCount: 0
  },
  mutations: {
    tableList (state, list) {
      state.tableList = list
    },
    tableListCount (state, list) {
      state.tableListCount = list
    }
  },
  actions: {
    addInfo ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post(
          `/addInfo`,
          params
        ).then(res => {
          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 列表和分页
    getTableList ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post(
          `/getTableList`,
          {
            params: {
              limit: params.limit,
              offset: params.offset
            }
          }
        ).then(res => {
          commit('tableListCount', res.data.meta.count)
          commit('tableList', res.data.data)
          resolve(res.data)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    modifyInfo ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.put(
          `/modifyInfo`,
          params
        ).then(res => {
          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteInfo ({state, commit}, _id) {
      return new Promise((resolve, reject) => {
        axios.delete(
          `/deleteInfo/${_id}`
        ).then(res => {
          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    searchInfo ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post(
          `/searchInfo`,
          {
            params
          }
        ).then(res => {
          commit('tableListCount', res.data.meta.count)
          commit('tableList', res.data.data)
          resolve(res.data)
        })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default module
