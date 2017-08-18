<template>
    <v-layout column justify-center>
        <v-flex xs12>
    
            <v-card class="secondary elevation-0">
    
                <v-container fluid>
    
                    <v-alert error icon="new_releases" v-bind:value="showError">
                        {{submitError}}
                    </v-alert>
    
                    <v-subheader class="grey--text text--lighten-1 primary mb-5">Create User</v-subheader>
    
                    <v-text-field disabled name="email" label="Email" :value="loggedUser.email" dark></v-text-field>
    
                    <v-text-field disabled name="name" label="Your Name" :value="loggedUser.name" @input="updateName" dark></v-text-field>
    
                    <v-checkbox label="Subscribe to Email" v-model="emailSubscription" dark></v-checkbox>
    
                    <v-btn light v-on:click.native="submit">Submit</v-btn>
    
                </v-container>
            </v-card>
    
        </v-flex>
    
    </v-layout>
</template>

<script>
import gql from 'graphql-tag';
import { mapGetters, mapState } from 'vuex'

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }`

export default {
    // Local state
    data: () => ({
        // email: 'mickey@mouse.com',
        // name: '',
        emailSubscription: true,
        submitError: '',
        showError: false,
    }),
    computed: {
        ...mapGetters(['loggedUser']),
        ...mapState({
            message: state => state.obj.message
        })

    },
    methods: {
        submit: function (event) {

            this.showError = false;

            const variables = {
                idToken: window.localStorage.getItem('token'),
                emailAddress: this.loggedUser.email,
                name: this.loggedUser.name,
                emailSubscription: this.emailSubscription,
            }

            // debugger

            // // `this` inside methods points to the Vue instance
            // alert('Hello ' + this.name + '!')
            // // `event` is the native DOM event
            // if (event) {
            //     alert(event.target.tagName)
            // }

            // We save the user input in case of an error
            // const newTag = this.newTag
            // We clear it early to give the UI a snappy feel
            // this.newTag = ''
            // Call to the graphql mutation
            this.$apollo.mutate({
                // Query
                mutation: createUser,
                // Parameters
                variables,
                // Update the cache with the result
                // The query will be updated with the optimistic response
                // and then with the real result of the mutation
                update: (store, { data: { newTag } }) => {
                    // debugger
                    // Read the data from our cache for this query.
                    // const data = store.readQuery({ query: TAGS_QUERY })
                    // // Add our tag from the mutation to the end
                    // data.tags.push(newTag)
                    // // Write our data back to the cache.
                    // store.writeQuery({ query: TAGS_QUERY, data })
                },
                // Optimistic UI
                // Will be treated as a 'fake' result as soon as the request is made
                // so that the UI can react quickly and the user be happy
                // optimisticResponse: {
                // __typename: 'Mutation',
                // addTag: {
                //     __typename: 'Tag',
                //     id: -1,
                //     label: newTag,
                // },
                // },
            }).then((data) => {
                // debugger
                // Result
                // console.log(data)
                this.$router.replace('/')
            }).catch((error) => {
                // Error
                this.submitError = error.message
                this.showError = true
                console.error(error)
            })

        },
        updateName(value) {
            debugger
            this.$store.commit('updateUser', {
                field: 'name',
                value
            })
        }
    }
}
</script>
