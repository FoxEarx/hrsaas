<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="isShowLeft">
          <i :class="LeftIcon"></i>
          <slot name="left-tag"></slot>
          <span></span>
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  data() {
    return {}
  },

  created() {},
  props: {
    isShowLeft: {
      type: Boolean,
      default: true,
    },
    LeftIcon: {
      type: String,
      default: 'el-icon-info',
    },
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.box-card {
  width: 100%;
}
</style>
