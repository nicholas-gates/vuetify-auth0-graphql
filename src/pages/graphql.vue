<template>
  <v-layout column justify-center align-center>

    <h1>GraphQL Demo</h1>

    <div class="post-list">
      <!-- If there is one or more queries loading -->
      <template v-if="loading > 0">
        Loading
      </template>
      <!-- Actual view -->
      <template v-else>
        <ul>
          <!-- Post list items -->
          <li v-for="post in allPosts" :key="post.id">
            {{ post.description }} ; link: {{ post.imageUrl }}
          </li>
        </ul>
      </template>
    </div>

  </v-layout>
</template>

<script>
// Vue component definition

import gql from 'graphql-tag';

// GraphQL query
const postsQuery = gql`
  query {
    allPosts {
      id
      imageUrl
      description
    }
  }
`;

export default {
  // Local state
  data: () => ({
    // You can initialize the 'posts' data here
    allPosts: [],
    loading: 0,
  }),
   asyncData (context) {
    debugger
    return { project: 'nuxt' }
  },
  // Apollo GraphQL
  apollo: {
    // Local state 'posts' data will be updated
    // by the GraphQL query result
    allPosts: {
      // GraphQL query
      query: postsQuery,
      // Will update the 'loading' attribute
      // +1 when a new query is loading
      // -1 when a query is completed
      loadingKey: 'loading',
    },
  },
};
</script>