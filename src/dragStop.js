import Vue from 'vue'
 
// v-dialogDrag: 弹窗拖拽
Vue.directive('dragStop', {
  bind(el, binding, vnode, oldVnode) {
    el.style.cursor = binding.value || 'default'
    el.onmousedown = (e) => {
        e.stopPropagation()
    }
  }
})
