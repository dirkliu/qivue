<template>
    <div class="dragable-modal" 
        v-show="value" 
        :style="styleMap" 
        v-drag>
        <div class="btns">
            <span class="btn" @click="onClose" v-show="!hideClose">
                关闭
            </span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['value', 'width', 'height', 'top', 'left', 'right', 'bottom', 'zIndex', 'hideClose','closeIconStyle'],
    data () {
        return {
            styleMap: {},
            styleCloseIcon: {},
        }
    },

    computed: {
        computedWidth () {
            return this.styleMap && this.styleMap.width && +this.styleMap.width.replace(/\px/g, '') || 0
        },

        computedHeight () {
            return this.styleMap && this.styleMap.height && +this.styleMap.height.replace(/\px/g, '') || 0
        }
    },

    methods: {
        onClose () {
            this.$emit('beforeClose')
            this.$emit('input', false)
        },

        moveTo (options) {
            if (!options) {
                return 
            }
            let newStyleMap = {}
            if (options.left || options.left === 0) {
                newStyleMap.left = options.left
            } else if (options.right || options.right === 0){
                let right = +options.right.replace(/\px/g, '')
                newStyleMap.left = document.body.clientWidth - right - this.computedWidth + 'px'
            }
            if (options.top || options.top === 0) {
                newStyleMap.top = options.top
            } else if (options.bottom || options.bottom === 0) {
                let bottom = +options.bottom.replace(/\px/g, '')
                newStyleMap.top = document.body.clientHeight - bottom - this.computedHeight + 'px'
            }
            Object.assign(this.$el.style, newStyleMap)
        }
    },
    created () {
        Object.assign(this.styleMap, {
            width: this.width || '400px',
            height: this.height || '400px',
            left: this.left || null,
            top: this.top || null,
            zIndex: this.zIndex || 100
        })
        if (!this.styleMap.left) {
            let width = +this.styleMap.width.replace(/\px/g, '')
            if (this.right) {
                let right = +this.right.replace(/\px/g, '')
                this.styleMap.left = document.body.clientWidth - right - width + 'px'
            } else {
                this.styleMap.left = (document.body.clientWidth - width) / 2 + 'px'
            } 
        }
        if (!this.styleMap.top) {
            let height = +this.styleMap.height.replace(/\px/g, '')
            if (this.bottom) {
                let bottom = +this.bottom.replace(/\px/g, '')
                this.styleMap.top = document.body.clientHeight - bottom - height + 'px'
            } else {   
                this.styleMap.top = (document.body.clientHeight - height) / 2 + 'px'
            }

        }
    }
}
</script>

<style lang="scss">
.dragable-modal {
    position: fixed; 
    z-index: 100;
    background-color: #fff;
    overflow: auto;

    .btns {
        position: absolute;
        display: inline-block;
        right: 5px;
        top: 5px;
        line-height: 20px;
        z-index: 1;

        .btn {
            cursor: pointer;
        }
    }
}
</style>
