<template>
  <el-dialog
    @open="onOpen"
    title="分配角色"
    :visible="Visible"
    width="50%"
    @close="onClose"
  >
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleApi } from '@/api/role'
import { getUserDetails } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      roleIds: [],
      roles: [],
    }
  },

  created() {},

  methods: {
    async getRoleList() {
      const { rows } = await getRoleApi()
      this.roles = rows
    },
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetails(this.employees)
      this.roleIds = roleIds
    },
    onOpen() {
      this.getRoleList()
      this.getEmployeesRoles()
    },
    onClose() {
      this.$emit('onClose')
    },
    async assignRoles() {
      if (!this.roleIds.length) return this.$message.error('请选择要分配的权限')
      await assignRoles({
        id: this.employees,
        roleIds: this.roleIds,
      })
      this.$message.success('设置成功')
      this.onClose()
    },
  },
  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
    employees: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="less"></style>
