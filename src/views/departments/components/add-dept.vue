<template>
  <el-dialog :title="show" :visible="visible" width="50%" @close="onClose">
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="请填写部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  titleDeptsApi,
  editDeptsApi,
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    const checkDepName = async (rules, val, callback) => {
      if (!this.formData.id) {
        const { depts } = await getDeptsApi()
        const filtersDept = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const isrepeat = filtersDept.some((item) => (item.name = val))
        isrepeat ? callback(new Error('部门名称重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        const isrepeat = this.currentNode.children.some(
          (item) => item.name === val,
        )
        isrepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    const checkDepCode = async (rules, val, callback) => {
      const { depts } = await getDeptsApi()
      let isrepeat
      if (this.formData.id) {
        isrepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === val)
      } else {
        isrepeat = depts.some((item) => item.code === val)
      }

      isrepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      employees: '',
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDepName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkDepCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    show() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
      console.log(123)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      if (this.formData.id) {
        await editDeptsApi(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')
      } else {
        await addDeptsApi(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')
      }
    },
    async getDeptsId(id) {
      this.formData = await titleDeptsApi(id)
    },
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="less"></style>
