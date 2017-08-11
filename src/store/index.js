export const state = () => ({
  sidebar: false,
  user: null
  // user: window ? JSON.parse(window.localStorage.getItem('user') || '[]') : null
})

// export const state = {
//   todos: JSON.parse(window.localStorage.getItem(user) || '[]')
// }

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar
  },
  SET_USER(state, user) {
    state.user = user || null
  },
  updateUser(state, payload) {
    state.user[payload.field] = payload.value
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  }
}