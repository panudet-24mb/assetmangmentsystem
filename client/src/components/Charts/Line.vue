<template>

      <canvas id="graph" width="400" height="400"></canvas>

</template>

<script>
import Chart from 'chart.js'
export default {
  components: {
  },
  mounted: function () {
    var ctx = document.getElementById('graph').getContext('2d')
    var bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            label: '# of Vote',
            data: [12, 45, 67]
          }]
      }
    })
    console.log(bar)
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>