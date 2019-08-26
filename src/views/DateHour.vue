<template>
  <div class="dateHourGrids">
    日期小时格子选择器
    <day-hour-grids></day-hour-grids>
  </div>
</template>

<script>
  import DayHourGrids from '../lib/components/DayHourGrids.vue'
  export default {
    data () {
      return {}
    },

    components: {
      DayHourGrids
    }
  }
</script>