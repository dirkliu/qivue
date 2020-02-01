import Vue from 'vue'
 
// v-dialogDrag: 弹窗拖拽
Vue.directive('drag', {
  bind (el) {
      el.style.cursor = 'move'
 
    el.onmousedown = (e) => {
      // 鼠标按下，计算鼠标距离元素左边界和上边界的距离
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
 
      document.onmousemove = function (event) {
        // 通过事件委托，计算移动元素的距离
        const l = event.clientX - disX
        const t = event.clientY - disY

        // 移动当前元素
        // 必须在视口内
        if (el.clientWidth + l < document.body.clientWidth && l > 0) {
            el.style.left = `${l}px`
        } else if (el.clientWidth + l >= document.body.clientWidth) {
            el.style.left = `${document.body.clientWidth - el.clientWidth}px`
        } else {
          el.style.left = 0
        }
        if (el.clientHeight + t < document.body.clientHeight && t > 0) {
            el.style.top = `${t}px`
        } else if (el.clientHeight + t >= document.body.clientHeight) {
            el.style.top = `${document.body.clientHeight - el.clientHeight}px`
        } else {
            el.style.top = 0
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
