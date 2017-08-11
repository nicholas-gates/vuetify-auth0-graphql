<template>
    <p>
        Signing in...</p>
</template>

<script>
import gql from 'graphql-tag';
import { setToken, checkSecret, extractInfoFromHash, getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default {
    mounted() {

        const { token, secret } = extractInfoFromHash()

        if (!checkSecret(secret) || !token) {
            console.error('Something happened with the Sign In request')
        }

        setToken(token)

        // const loggedUser = getUserFromLocalStorage()
        // this.$store.commit('SET_USER', loggedUser)
        this.$store.commit('SET_USER', getUserFromLocalStorage())

        debugger
        this.$apollo.query({
            query: userQuery
        }).then((data) => {
            debugger
            // Result
            console.log(data)

            const route = (data.data.user === null) ? '/auth/createUser' : '/'

            this.$router.replace(route)
        }).catch((error) => {
            // Error
            debugger
            this.submitError = error.message
            this.showError = true
            console.error(error)
        })


    }
}
</script>