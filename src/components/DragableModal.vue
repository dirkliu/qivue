<template>
    <div class="dragable-modal" 
        v-show="value" 
        :style="styleMap" 
        v-drag>
        <div class="btns">
            <span class="btn" @click="onClose" v-show="!hideClose">
                <i class="el-icon-close" :style="styleCloseIcon"></i>
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
    methods: {
        onClose () {
            this.$emit('beforeClose')
            this.$emit('input', false)
        },
        setCloseStyle() {
            Object.assign(this.styleCloseIcon, this.closeIconStyle)
        },
    },
    created () {
        this.setCloseStyle();
        Object.assign(this.styleMap, {
            width: this.width || '400px',
            height: this.height || '400px',
            left: this.left || null,
            right: this.right || null,
            top: this.top || null,
            bottom: this.bottom || null,
            zIndex: this.zIndex || 100
        })
        if (!this.styleMap.left && !this.styleMap.right) {
            let width = +this.styleMap.width.replace(/\px/g, '')
            this.styleMap.left = (document.body.clientWidth - width) / 2 + 'px'
        }
        if (!this.styleMap.top && !this.styleMap.bottom) {
            let height = +this.styleMap.height.replace(/\px/g, '')
            this.styleMap.top = (document.body.clientHeight - height) / 2 + 'px'
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
