<template>
  <v-layout column justify-center align-center>
  
    <template v-if="loading > 0">
      Loading
    </template>
    <!-- Actual view -->
    <template v-else>
      <vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>
    </template>
  
  </v-layout>
</template>

<script>
import gql from 'graphql-tag';

const allCompanySalesQuery = gql`
		query {
		  allCompanySaleses(orderBy: year_ASC) {
		    id
		    year
		    sales
		    expenses
		  }
		}
`;

export default {
  // Local state
  data: () => ({
    rows: [],
    loading: 0,
    columns: [{
      'type': 'string',
      'label': 'Year'
    }, {
      'type': 'number',
      'label': 'Sales'
    }, {
      'type': 'number',
      'label': 'Expenses'
    }],
    // allCompanySales: [
    //   ['2004', 1000, 400],
    //   ['2005', 1170, 460],
    //   ['2006', 660, 1120],
    //   ['2007', 1030, 540]
    // ],
    options: {
      title: 'Company Performance',
      hAxis: {
        title: 'Year',
        minValue: '2004',
        maxValue: '2007'
      },
      vAxis: {
        title: '',
        minValue: 300,
        maxValue: 1200
      },
      width: 900,
      height: 500,
      curveType: 'function'
    },

  }),
  // Apollo GraphQL
  apollo: {
    // Local state 'posts' data will be updated
    // by the GraphQL query result
    allCompanySaleses: {
      // GraphQL query
      query: allCompanySalesQuery,
      // Will update the 'loading' attribute
      // +1 when a new query is loading
      // -1 when a query is completed
      loadingKey: 'loading',
      update(data) {
        return data
      },
      // Optional result hook
      result({ data, loader, networkStatus }) {
        console.log("We got some result!")

        // let chartRows = data.allCompanySaleses.map(record => [record.year, record.sales, record.expenses])
        let chartRows = data.allCompanySaleses.map(function (record) {
          return [record.year.toString(), record.sales, record.expenses];
        });
        this.rows = chartRows
      },
      // Error handling
      error(error) {
        debugger
        console.error('We\'ve got an error!', error)
      },
    },

  },
}
</script>