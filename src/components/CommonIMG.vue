<template>
  <img :src="src" :style="`width:100%;height:${width}px`" :onerror="defaultImg" />
</template>
<script>
export default {
  name: 'CommonImg',
  props: {
    src: {
      type: String,
      default: '../assets/imgs/default.png'
    },
    width: {
      type: Number,
      default: 180
    }
  },
  computed: {
    defaultImg() {
      return 'this.src="' + require('../assets/imgs/default.png') + '"'
    }
  }
}
</script>