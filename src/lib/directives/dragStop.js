import Vue from 'vue'
 
// v-dragStop: 弹窗拖拽
Vue.directive('dragStop', {
  bind(el, binding) {
    el.style.cursor = binding.value || 'default'
    el.onmousedown = (e) => {
        e.stopPropagation()
    }
  }
})
