<template>
  <el-dialog title="添加部门" :visible="visible" width="50%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped lang="less"></style>
