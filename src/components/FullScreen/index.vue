<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="qp"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    qp() {
      console.log(1)
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
