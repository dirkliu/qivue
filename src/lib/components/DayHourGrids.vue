<template>
  <div class="day-hour-grids">
    <div class="day-hour-content" @mousedown="onMouseDown">
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
    </div>

    <div class="select-box" v-show="selectArea" 
      :style="{left: selectLeft + 'px', top: selectTop + 'px', width: selectWidth + 'px', height: selectHeight + 'px'}">    
    </div>
    <div class="selected-day-hours" v-if="value.length">
      <div class="selected-headeer">选中的时间段：</div>
      <div class="select-day-item" v-for="(item, index) in value" :key="index">
        {{days[item.day - 1]}}:
        <span class="range-tag" v-for="(range, k) in item.hours"  :key="k">{{range.start}} - {{range.end}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  const DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  var dayHourJson = []
  for (let i = 1; i <= 7; i++) {
    var day = {
      day: i,
      text: DAYS[i - 1],
      hours: []
    }
    for (let k = 0; k < 24; k++) {
      day.hours.push({
        hour: k,
        checked: false
      })
    }
    dayHourJson.push(day)
  }

  export default {
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      }
    },

    data () {
      return {
        selectArea: null,
        pageLeft: 0, // 组件至页面左边的距离，
        pageTop: 0,
        gridHeight: 22, // 单个格子高度
        days: DAYS,
        dayHours: dayHourJson
      }
    },

    computed: {
      selectLeft () {
        if (!this.selectArea) {
          return 0
        }
        return Math.min(this.selectArea.startX, this.selectArea.endX)
      },

      selectTop () {
        if (!this.selectArea) {
          return 0
        }
        return Math.min(this.selectArea.startY, this.selectArea.endY)
      },

      selectWidth () {
        if (!this.selectArea) {
          return 0
        }
        return Math.abs(this.selectArea.startX - this.selectArea.endX)
      },

      selectHeight () {
        if (!this.selectArea) {
          return 0
        }
        return Math.abs(this.selectArea.startY - this.selectArea.endY)
      },

      selectRight () {
        return this.selectLeft + this.selectWidth
      },

      selectBottom () {
        return this.selectTop + this.selectHeight
      },

      gridWidth () {
        return (this.$el.offsetWidth - 80) / 24
      },

      // 矩形框的右下角的格子数， 四舍五入
      rightBottomGrid () {
        var position = {
          x: 0,
          y: 0
        }
        let selectorPosition = this.$el.getBoundingClientRect()
        let relativeLeft = this.selectRight - selectorPosition.left
        let relativeTop = this.selectBottom - selectorPosition.top
        if (relativeLeft > 70) {
          position.x = Math.round((relativeLeft - 70) / this.gridWidth)
          position.x > 24 && (position.x = 24)
        }
        if (relativeTop > 30) {
          position.y = Math.round((relativeTop - 30) / this.gridHeight)
          position.y > 7 && (position.y = 7)
        }
        return position
      }
    },

    methods: {
      _setModelValue () {
        this.$emit('input', this.dayHours.filter(item => item.hours.some(hour => hour.checked)).map(item => {
          return {
            day: item.day,
            hours: this._getRangesFromHours(item.hours.filter(hour => hour.checked))
          }
        }))
      },

      _setDayHours () {
        this.value.forEach(item => {
          console.log('day:', item.day)
          let dayHour = this.dayHours.find(dayItem => dayItem.day === item.day)
          item.hours.forEach(hourRange => {
            let start = +hourRange.start.split(':')[0]
            let end = +hourRange.end.split(':')[0]
            for (let i = start; i <= end; i++) {
              dayHour.hours[i].checked = true
            }
          })
        })
      },

      _getRangesFromHours (hours) {
        let ranges = []
        let currentRange = null
        hours.forEach((item, index) => {
          if (index === 0) {
            currentRange = {
              start: item.hour,
              end: item.hour
            }
          } else {
            if (currentRange.end + 1 === item.hour) {
              currentRange.end = item.hour
            } else {
              ranges.push({
                start: (currentRange.start > 9 ? currentRange.start : '0' + currentRange.start) + ':00',
                end: (currentRange.end > 9 ? currentRange.end : '0' + currentRange.end) + ':59'
              })
              currentRange = {
                start: item.hour,
                end: item.hour
              }
            }
          }

          if (index === hours.length - 1) {
            ranges.push({
              start: (currentRange.start > 9 ? currentRange.start : '0' + currentRange.start) + ':00',
              end: (currentRange.end > 9 ? currentRange.end : '0' + currentRange.end) + ':59'
            })
            return
          }
        })
        return ranges
      },

      _getLeftTopGrid () {
        let position = {
          x: 0,
          y: 0
        }
        let selectorPosition = this.$el.getBoundingClientRect()
        let relativeLeft = this.selectLeft - selectorPosition.left
        let relativeTop = this.selectTop - selectorPosition.top
        if (relativeLeft > 70) {
          position.x = Math.round((relativeLeft - 70) / this.gridWidth)
          position.x > 24 && (position.x = 24)
        }
        if (relativeTop > 30) {
          position.y = Math.round((relativeTop - 30) / this.gridHeight)
          position.y > 7 && (position.y = 7)
        }
        return position
      },

      _getRightBottomGrid () {
        var position = {
          x: 0,
          y: 0
        }
        let selectorPosition = this.$el.getBoundingClientRect()
        let relativeLeft = this.selectRight - selectorPosition.left
        let relativeTop = this.selectBottom - selectorPosition.top
        if (relativeLeft > 70) {
          position.x = Math.round((relativeLeft - 70) / this.gridWidth)
          position.x > 24 && (position.x = 24)
        }
        if (relativeTop > 30) {
          position.y = Math.round((relativeTop - 30) / this.gridHeight)
          position.y > 7 && (position.y = 7)
        }
        return position
      },

      onSelectHour (hour) {
        hour.checked = !hour.checked
        this._setModelValue()
      },

      // 鼠标按下，设置选中区域起始点
      onMouseDown (event) {
        this.selectArea = {
          startX: event.clientX,
          startY: event.clientY,
          endX: event.clientX,
          endY: event.clientY
        }
      },

      // 鼠标拖动， 设置选中区域边界
      onMouseMove (event) {
        if (this.selectArea) {
          Object.assign(this.selectArea, {
            endX: event.clientX,
            endY: event.clientY
          })
        }
      },

      _checkHoursByRect (leftTopGrid, rightBottomGrid) {
        var selectHours = this.dayHours.filter(item => {
          return item.day >= leftTopGrid.y + 1 && item.day < rightBottomGrid.y + 1
        }).map(item => item.hours).reduce((x, y) => x.concat(y), []).filter(item => {
          return item.hour >= leftTopGrid.x && item.hour < rightBottomGrid.x
        })
        var isAllChecked = selectHours.every(item => item.checked)
        selectHours.forEach(item => {
          item.checked = !isAllChecked
        })
      },

      // 鼠标释放，清除选中区域
      onMouseUp () {
        if (this.selectArea) {
          this._checkHoursByRect(this._getLeftTopGrid(), this._getRightBottomGrid())
          // 改变后的值返回值父组件的v-model中
          this._setModelValue()
          this.selectArea = null
          // 清除掉选中的文字
          document.getSelection().removeAllRanges()
        }
      }
    },

    created () {
      this._setDayHours()
    },

    mounted () {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },

    destroyed () {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }
</script>

<style lang="scss">
.day-hour-grids {
  position: relative;
  line-height: 25px;
  
  .day-hour-content {
    padding: 15px 10px;
  }

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
      line-height: 15px;
      text-align: left;
      background-color: transparent;
      font-size: 10px;
      border: none;
    }
  }

  .hours {
    display: flex;
    flex-grow: 1;

    .hour-item {
      border-collapse: collapse;
      width: calc(100% * 1 / 24);
      height: 22px;
      flex-shrink: 1;
      flex-grow: 1;
      text-align: center;
      background-color: #ebedf0;
      background-origin: content-box;
      cursor: pointer;
      border: 1px solid #fff;
      box-sizing: border-box;

      &.on {
        background-color: #7bc96f;
      }
    }
  }

  .select-box {
    width: 0;
    height: 0;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(198, 228, 139, 0.6);
  }

  .selected-day-hours {
    .range-tag {
      margin-right: 5px;
      padding: 0 5px;
      color: #409eff;
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
      border-radius: 4px;
    }    
  }
}
</style>
