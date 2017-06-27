const state = {
    username:''
}

const getters = {
    username: state => state.username,
}

const actions = {
    saveName({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            commit('saveName', data)
        })
    },
    deleName({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('deleName');
        })
    },
}

const mutations = {
    saveName(state, data) {
        state.username = data;
    },
    deleName(state) {
        state.username = ''; 
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
