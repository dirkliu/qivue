<template>
  <div class="home">
    首页内容<a @click="onMp">小程序</a>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },

    created () {
      console.log('home wx:', wx)
    },

    methods: {
      onMp () {
        wx.miniProgram.navigateTo({
          appId: 'wx58792522c082de20',
          url: '/pages/index/index'
        })
      }
    }
  }
</script>
