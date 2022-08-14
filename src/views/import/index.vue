<template>
  <div class="dashboard-container">
    <UploadExcel
      :beforeUpload="excelSuccess"
      :onSuccess="success"
    ></UploadExcel>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { mapKeyPath } = employees
import { importEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess(file) {
      if (!file.name.endsWith('.xlsx')) {
        this.$message.error('请上传xlsx文件')
        return false
      }
      return true
    },
    async success({ header, results }) {
      const newList = results.map((item) => {
        const obj = {}
        for (let key in mapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            date.setFullYear(date.getFullYear() - 70)
            obj[mapKeyPath[key]] = formatTime(date)
          } else {
            obj[mapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(newList)
      this.$message.success('导入成功')
      console.log(newList)
    },
  },
}
</script>

<style scoped lang="less"></style>
