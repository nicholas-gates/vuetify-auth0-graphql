import Vue from 'vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
const config = require('~/config.json')

let networkInterface = createNetworkInterface({
  uri: config.GRAPHQL_ENDPOINT,
  transportBatching: true,

});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('token')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    }
    next()
  },
}])

// Create the apollo client
const apolloClient = new ApolloClient({
  connectToDevTools: true,
  networkInterface,
  // queryTransformer: addTypename,
  dataIdFromObject: r => r.id,
});

// Install the vue plugin
// With the apollo client instance
// Vue.use(VueApollo, {
//   apolloClient,
// });

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient,
  },
  defaultClient: apolloClient,
})

// export default apolloProvider;

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.apolloProvider = apolloProvider
}