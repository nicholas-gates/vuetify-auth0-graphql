// import { getUserFromLocalStorage } from '~/utils/auth'

// export default function ({ store, redirect }) {
//     this.$store.commit('SET_USER', getUserFromLocalStorage());

//     if (!store.getters.isAuthenticated) {
//         return redirect('/auth/sign-in')
//     }
// }

export default function ({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/auth/sign-in')
  }
}