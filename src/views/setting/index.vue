<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first"
          ><el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="地址">
              <template slot-scope="{ row }">
                <el-button size="small" type="success">编辑</el-button>
                <el-button size="small" type="primary">主要按钮</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="removeRole(row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              layout="sizes, prev, pager, next"
              @size-change="handleSizeChange"
              :total="total"
              :page-sizes="[3, 5, 10, 20]"
              @current-change="currentPage"
              :page-size="pageSize"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="CompanyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="CompanyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="CompanyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="CompanyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="dialogClose"
    >
      <el-form
        ref="formRole"
        label-width="100px"
        :model="addRoleForm"
        :rules="addRoleRule"
      >
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="onSaveRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleApi, getRolseApi, removeRolseApi } from '@/api/role.js'
import { getCompanyApi } from '@/api/setting.js'

getCompanyApi
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 10,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleRule: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
      CompanyInfo: {},
    }
  },

  created() {
    this.getRole()
    this.getCompany()
  },

  methods: {
    async getRole() {
      const { rows, total } = await getRoleApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      console.log(rows)
      this.tableData = rows
      this.total = total
    },
    currentPage(val) {
      this.page = val
      this.getRole()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRole()
    },
    closeAdd() {
      this.addDialogVisible = false
    },
    async onSaveRole() {
      this.$refs.formRole.validate()
      const res = await getRolseApi(this.addRoleForm)
      console.log(res)
      this.$message.success('新增成功')
      this.addDialogVisible = false
      this.getRole()
    },
    dialogClose() {
      this.addRoleForm.name = ''
      this.addRoleForm.description = ''
    },
    async removeRole(id) {
      await removeRolseApi(id)
      this.$message.success('删除成功')
      this.getRole()
    },
    async getCompany() {
      const res = await getCompanyApi(this.$store.state.user.userInfo.companyId)
      this.CompanyInfo = res
      console.log(res)
    },
  },
}
</script>

<style scoped lang="less"></style>
