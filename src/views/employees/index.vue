<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportEmployees"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addEmployees"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="员工头像">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterFormOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onSave(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <AddEmployees :visible.sync="isShowAddEmployees"></AddEmployees>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from './components/addEmployees.vue'
const { exportExcelMapPath, hireType } = employees
export default {
  data() {
    return {
      employeesList: [],
      total: 0,
      pages: {
        page: 1,
        size: 10,
      },
      isShowAddEmployees: false,
    }
  },

  created() {
    this.getEmployeesInfo()
  },

  methods: {
    async getEmployeesInfo() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employeesList = rows
      this.total = total
      console.log(this.employeesList)
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesInfo()
    },
    formatterFormOfEmployment(row, column, cellValue, index) {
      const formatterItem = employees.hireType.find(
        (item) => item.id === cellValue,
      )
      return formatterItem ? formatterItem.value : '未知'
    },
    async onSave(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeesInfo()
      } catch (error) {
        console.log(error)
      }
    },
    addEmployees() {
      this.isShowAddEmployees = true
    },
    async exportEmployees() {
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      })
      const { export_json_to_excel } = await import('@/vendor')
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return item[exportExcelMapPath[h]] === hire.id
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data,
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
  },
  components: {
    AddEmployees,
  },
}
</script>

<style scoped lang="less"></style>
