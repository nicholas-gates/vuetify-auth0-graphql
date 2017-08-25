<template>
    <div id="chart_div" class="chart">
    </div>
</template>

<script>

export default {
    // middleware: 'authenticated',
    data: () => ({
    }),
    computed: {
    },
    mounted() {
        // debugger

        // Set a callback to run when the Google Visualization API is loaded.
        this.$charts.load(this.drawChart);
        window.addEventListener('resize', this.drawChart);
    },
    methods: {
        submit: function(event) {
        },
        onResize() {
            this.drawChart();
        },
        drawChart: function() {
            debugger
            const charts = this.$charts;
            // Create the data table.
            var data = new charts.api.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Mushrooms', 3],
                ['Onions', 1],
                ['Olives', 1],
                ['Zucchini', 1],
                ['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {
                'title': 'How Much Pizza I Ate Last Night',
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new charts.api.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }
}
</script>

<style scoped>
.chart {
    width: 100%;
    min-height: 450px;
}
</style>