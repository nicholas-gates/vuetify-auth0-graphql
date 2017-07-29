<template>
  <v-layout column justify-center align-center>
  
    <router-link to="inspire/child">Child</router-link>
  
    <router-view></router-view>
  
    <img src="/v.png" alt="Vuetify.js" class="mb-5" width="75px" />
    <blockquote>
      &#8220;First, solve the problem. Then, write the code.&#8221;
      <footer>
        <small>
          <em>&mdash;John Johnson</em>
        </small>
      </footer>
    </blockquote>
  </v-layout>
</template>
