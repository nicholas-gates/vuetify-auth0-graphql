<template>
  <v-layout column justify-center align-center>
  
    <h1>LOGIN</h1>
  
    <nuxt-link v-if="isAuthenticated" to="/secret">Top Secret</nuxt-link>
    <nuxt-link v-if="!isAuthenticated" to="/auth/sign-in">Sign In</nuxt-link>
    <nuxt-link v-else to="/auth/sign-off">Sign Off</nuxt-link>
  
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['isAuthenticated'])
}
</script>
