<template>
  <v-layout column justify-center align-center>

    <template v-if="loading > 0">
      Loading
    </template>
    <!-- Actual view -->
    <template v-else>
      <div id="chart_div" class="chart"></div>
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
  // middleware: 'authenticated',
  // Local state
  data: () => ({
    loading: 0,
    rows: [],
  }),
  mounted() {
    window.addEventListener('resize', this.drawChart);
  },
  methods: {

    drawChart: function() {
      const charts = this.$charts;
      // Create the data table.
      var data = new charts.api.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Sales');
      data.addColumn('number', 'Expenses');

      data.addRows(this.rows);

      // Set chart options
      var options = {
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
        height: 500,
        curveType: 'function'
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new charts.api.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  },
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
        let chartRows = data.allCompanySaleses.map(function(record) {
          return [record.year.toString(), record.sales, record.expenses];
        });
        this.rows = chartRows
        this.$charts.load(this.drawChart);
      },
      // Error handling
      error(error) {
        console.error('We\'ve got an error!', error)
      },
    },

  },
}
</script>

<style scoped>
.chart {
  width: 100%;
  min-height: 450px;
}
</style>