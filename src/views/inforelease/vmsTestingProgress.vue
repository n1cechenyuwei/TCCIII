<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="item.data" :scale="scale" v-for="(item, index) in aaa" :key="index">
      <v-tooltip :showTitle="false" dataKey="item*count" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie position="count" color="item" :v-style="pieStyle" :label="labelConfig" />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
  const DataSet = require('@antv/data-set');

  export default {
    data() {
      return {
        chardata: [],
        scale: "",
        height: 400,
        pieStyle: {
          stroke: "#fff",
          lineWidth: 1
        },
        labelConfig: ['count', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          }
        }],
        aaa: [
          {
            name: "111",
            data: [
              { item: '事例一', count: 40 },
              { item: '事例二', count: 21 },
              { item: '事例三', count: 17 },
              { item: '事例四', count: 13 },
              { item: '事例五', count: 9 }
            ]
          },
          {
            name: "2222",
            data: [
              { item: '事例1', count: 40 },
              { item: '事例2', count: 21 },
              { item: '事例3', count: 17 },
              { item: '事例4', count: 13 },
              { item: '事例5', count: 9 }
            ]
          }
        ]
      };
    },
    methods: {
      char() {
        const data1 = [
          { item: '事例一', count: 40 },
          { item: '事例二', count: 21 },
          { item: '事例三', count: 17 },
          { item: '事例四', count: 13 },
          { item: '事例五', count: 9 }
        ]
        this.scale = [{
          dataKey: 'percent',
          min: 0,
          formatter: '.0%',
        }];

        const dv = new DataSet.View().source(data1);
        dv.transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        });
        this.chardata = dv.rows;
        console.log(dv.rows)
      }
    },
    created() {
      // this.char()
    }
  };
</script>