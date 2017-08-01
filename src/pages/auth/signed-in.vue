<template>
    <p>
        Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash, getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
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
        this.$router.replace('/')
    }
}
</script>