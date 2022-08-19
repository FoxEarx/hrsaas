<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" v-model="activeName" name="first">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" v-model="activeName" name="second">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" v-model="activeName" name="third">
            <JoinInfo></JoinInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetails } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JoinInfo from './components/join-info.vue'

import Cookies from 'js-cookie'

export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('employeesCount') || 'first',
    }
  },

  created() {
    this.getUserDetails()
  },

  methods: {
    async getUserDetails() {
      const res = await getUserDetails(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookies.set('employeesCount', this.activeName)
    },
  },
  components: {
    UserInfo,
    JoinInfo,
  },
}
</script>

<style scoped lang="less"></style>
