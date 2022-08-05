<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools
          @add="dialogVisible = true"
          :isRoot="true"
          :treeNode="company"
        ></TreeTools>
        <!-- 树形结构 -->
        <el-tree :data="treeData" :props="defaultProps">
          <template v-slot="scoped">
            <TreeTools
              @add="dialogVisible = true"
              @remove="loadDepts"
              :treeNode="scoped.data"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
      <addDept :visible="dialogVisible"></addDept>
    </div>
  </div>
</template>

<script>
import { getDeptsApi } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import { transListtoTree } from '@/utils'
import addDept from './components/add-dept.vue'

export default {
  data() {
    return {
      dialogVisible: false,
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      company: { name: '传智教育', manager: '负责人' },
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi()
      this.treeData = transListtoTree(res.depts, '')
      console.log(res)
    },
  },
  components: {
    TreeTools,
    addDept,
  },
}
</script>

<style scoped lang="less"></style>
