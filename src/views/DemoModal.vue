<template>
  <div class="demo-modal-page">
    移动弹窗
    <dragable-modal ref="modal" class="demo-modal" width="600px" height="600px" right="20px" bottom="20px" v-model="visible">
      <div class="modal-content">
        弹窗示例
      </div>
    </dragable-modal>      
  </div>
</template>

<script>
import DragableModal from '../lib/components/DragableModal.vue'
export default {
  data () {
    return {
      visible: true
    }
  },

  components: {
    DragableModal
  },

  methods: {},

  created () {}
}
</script>

<style lang="scss">
.demo-modal {
  background-color: #000;
}
</style>