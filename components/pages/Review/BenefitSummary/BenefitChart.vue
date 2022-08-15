<template>
  <v-card class="v-card-Chart" max-width="600">
    <v-sheet class="v-sheet-Chart">
      <chart-test :chart-data="dataCollection"></chart-test>
    </v-sheet>
  </v-card>
</template>

<script>
import ChartTest from "@/utils/chart/lineChart";

export default {
  components: {
    ChartTest,
  },
  data() {
    return {
      dataCollection: null,
    };
  },
  created() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.dataCollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Main One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Main One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 4)) + 5;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
