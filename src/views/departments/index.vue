<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <TreeTools
          @add="showAddDept"
          :isRoot="true"
          :treeNode="company"
        ></TreeTools>
        <!-- 树形结构 -->
        <el-tree :data="treeData" :props="defaultProps">
          <template v-slot="scoped">
            <TreeTools
              @add-success="loadDepts"
              @add="showAddDept"
              @remove="loadDepts"
              @edit="showEdit"
              :treeNode="scoped.data"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
      <addDept
        ref="addDept"
        :visible.sync="dialogVisible"
        :currentNode="currentNode"
      ></addDept>
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
      currentNode: {},
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
      loading: false,
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading = true
      const res = await getDeptsApi()
      this.treeData = transListtoTree(res.depts, '')
      this.loading = false
      console.log(res)
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptsId(val.id)
    },
  },
  components: {
    TreeTools,
    addDept,
  },
}
</script>

<style scoped lang="less"></style>
