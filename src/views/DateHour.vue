<template>
  <div class="dateHourGrids">
    日期小时格子选择器
    <day-hour-grids v-model="dayHours" @input="onSelectChange"></day-hour-grids>
  </div>
</template>

<script>
  import DayHourGrids from '../lib/components/DayHourGrids.vue'
  export default {
    data () {
      return {
        dayHours: []
      }
    },

    methods: {
      onSelectChange (value) {
        console.log('value:', this.dayHours)
      }
    },

    components: {
      DayHourGrids
    }
  }
</script>