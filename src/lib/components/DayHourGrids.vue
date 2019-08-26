<template>
  <div class="day-hour-grids"
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove"
    @mouseup="onMuseUp">
    <div class="day-hour-header">
      <div class="item-header"></div>
      <div class="hours">
        <div class="hour-item" v-for="n in 24" :key="n">{{n - 1}}</div>
      </div>
    </div>
    <div class="day-item" v-for="(day, index) in dayHours" :key="index">
      <div class="item-header">{{day.text}}</div>
      <div class="hours">
        <div class="hour-item" 
          v-for="(hour, index) in day.hours" 
          :key="index"
          :class="hour.checked && 'on'"
          @click="onSelectHour(hour, $event)">    
        </div>
      </div>
    </div>

    <div class="select-box" v-show="selectArea" 
      :style="{left: selectLeft, top: selectTop, width: selectWidth, height: selectHeight}">    
    </div>
  </div>
</template>

<script>
  var dayHourJson = []
  for (let i = 1; i <= 7; i++) {
    var day = {
      day: i,
      text: '星期' + ['一', '二', '三', '四','五','六','日'][i - 1],
      hours: []
    }
    for (let k = 0; k < 24; k++) {
      day.hours.push({
        hour: i,
        checked: false
      })
    }
    dayHourJson.push(day)
  }

  export default {
    data () {
      return {
        selectArea: null,
        pageLeft: 0, // 组件至页面左边的距离，
        pageTop: 0,
        dayHours: dayHourJson
      }
    },

    computed: {
      selectLeft () {
        if (!this.selectArea) {
          return 0
        }
        return Math.min(this.selectArea.startX, this.selectArea.endX) - this.pageLeft + 'px'
      },

      selectTop () {
        if (!this.selectArea) {
          return 0
        }
        return Math.min(this.selectArea.startY, this.selectArea.endY) - this.pageTop + 'px'       
      },

      selectWidth () {
        if (!this.selectArea) {
          return 0
        }
        return Math.abs(this.selectArea.startX - this.selectArea.endX) + 'px'
      },

      selectHeight () {
        if (!this.selectArea) {
          return 0
        }
        return Math.abs(this.selectArea.startY - this.selectArea.endY) + 'px'        
      }
    },

    methods: {
      _setPageLeft () {
        var pageLeft = this.$el.offsetLeft
        var parent = this.$el.offsetParent
        while(parent != null){
            pageLeft += parent.offsetLeft + parent.clientLeft
            parent = parent.offsetParent
        }
        this.pageLeft = pageLeft
      },

      _setPageTop () {
        var pageTop = this.$el.offsetTop
        var parent = this.$el.offsetParent
        while(parent != null){
            pageTop += parent.offsetTop + parent.clientTop
            parent = parent.offsetParent
        }
        this.pageTop = pageTop       
      },

      onSelectHour (hour, event) {
        hour.checked = !hour.checked
      },

      onMouseDown (event) {
        this.selectArea = {
          startX: event.pageX,
          startY: event.pageY,
          endX: event.pageX,
          endY: event.pageY
        }
      },

      onMouseMove (event) {
        if (this.selectArea) {
          Object.assign(this.selectArea, {
            endX: event.pageX,
            endY: event.pageY
          })
        }
      },

      onMuseUp (event) {
        this.selectArea = null
      }
    },

    mounted () {
      this._setPageLeft()
      this._setPageTop()
    }
  }
</script>

<style lang="scss">
.day-hour-grids {
  position: relative;
  .day-item {
    display: flex;

    .item-header {
      width: 60px;
      line-height: 22px;
    }
  }

  .day-hour-header {
    display: flex;
    .item-header {
      width: 60px;
    }

    .hours .hour-item {
      height: 15px;
      text-align: left;
      background-color: transparent;
    }
  }

  .hours {
    display: flex;
    flex-grow: 1;

    .hour-item {
      border-collapse: collapse;
      width: calc(100% * 1 / 24);
      height: 22px;
      margin: 1px;
      flex-shrink: 1;
      flex-grow: 1;
      text-align: center;
      background-color: #ebedf0;
      cursor: pointer;

      &.on {
        background-color: #7bc96f;
      }
    }
  }

  .select-box {
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #c6e48b;
  }
}
</style>
