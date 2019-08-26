<template>
  <div id="app">
    <ul>
      <li><a href="#/">首页</a></li>
      <li><a href="#/demoModal">可移动弹窗</a></li>
      <li><a href="#/dateHour">日期小时格子选择器</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import DemoModal from './components/DemoModal.vue'
export default {
  name: 'app',

  data () {
    return {
      visible: true
    }
  },

  methods: {
  },

  components: {
    DemoModal
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
