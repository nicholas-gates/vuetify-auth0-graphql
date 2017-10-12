<template>
    <p>
        Signing in...
    </p>
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
//        debugger
        const { token, secret } = extractInfoFromHash()

        //alert ("token: " + token)

        if (!checkSecret(secret) || !token) {
            console.error('Something happened with the Sign In request')
        }

        setToken(token)
        //alert ("post setToken: ")

        // const loggedUser = getUserFromLocalStorage()
        // this.$store.commit('SET_USER', loggedUser)
        this.$store.commit('SET_USER', getUserFromLocalStorage())

        //alert ("post store commit: ")

        this.$apollo.query({
            query: userQuery
        }).then((data) => {
            // Result
            // console.log(data)
            //alert ("post graphql query user: " + data.data.user)
            const route = (data.data.user === null) ? '/auth/createUser' : '/'

            //alert('routing to: ' + route)
            this.$router.replace(route)
        }).catch((error) => {
            //alert ("error post graphql query msg: " + error.message)
            // Error
            debugger
            this.submitError = error.message
            this.showError = true
            console.error(error)
        })
    }
}
</script>