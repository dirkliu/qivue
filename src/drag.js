import Vue from 'vue'
 
// v-dialogDrag: 弹窗拖拽
Vue.directive('drag', {
  bind(el, binding, vnode, oldVnode) {
      el.style.cursor = 'move'
 
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
    const sty = el.currentStyle || window.getComputedStyle(el, null)
    console.log('sty:', sty)
 
    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop

      console.log('onmousedown: el.offsetLeft:', el.offsetLeft)
      console.log('onmousedown: el.offsetTop:', el.offsetTop)

      console.log('disX:', disX)
      console.log('disY:', disY)
 
      // 获取到的值带px 正则匹配替换
      let styL, styT;
 
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      };

      console.log('styL:', styL)
      console.log('styT:', styT)
 
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        console.log('onmousemove e.clientX:', e.clientX)
        console.log('onmousemove e.clientX:', e.clientY)
        console.log('onmousemove l:', l)
        console.log('onmousemove t:', t)
 
        // 移动当前元素
        el.style.left = `${l}px`
        el.style.top = `${t}px`
 
        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      }
 
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
  }
})
