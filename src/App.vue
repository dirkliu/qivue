<template>
  <div id="app">
    <ul>
      <li @click="move">移动</li>
    </ul>
    <demo-modal ref="demoModal" v-model="visible"></demo-modal>
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
    move () {
      // console.log('this.$refs.demoModal:', )
      this.$refs.demoModal.$refs.modal.moveTo({
        bottom: '50px',
        right: '50px'
      })
    }
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
  text-align: center;
  color: #2c3e50;
}
</style>
