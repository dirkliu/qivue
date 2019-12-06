import Vue from 'vue'
 
// v-dialogDrag: 弹窗拖拽
Vue.directive('drag', {
  bind (el) {
      el.style.cursor = 'move'
 
    el.onmousedown = (e) => {
      // 鼠标按下，计算鼠标距离元素左边界和上边界的距离
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
 
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动元素的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        // 必须在视口内
        if (el.clientWidth + l < document.body.clientWidth && l > 0) {
            el.style.left = `${l}px`
        }
        if (el.clientHeight + t < document.body.clientHeight && t > 0) {
            el.style.top = `${t}px`
        }
      }
 
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
  },

  inserted () {
    console.log('inserted')
  },

  update () {
    console.log('update')
  },

  componentUpdated () {
    console.log('componentUpdated')
  },

  unbind () {
    console.log('unbind')
  }
})
