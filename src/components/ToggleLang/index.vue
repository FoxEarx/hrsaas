<template>
  <div>
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        语言选择<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(value, key) in messages"
          :key="key"
          :disabled="key === $i18n.locale"
          :command="key"
          >{{ value.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import Cookies from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      this.$root.$i18n.locale = val
      this.$router.go(0)
      Cookies.set('lang', val)
    },
  },
}
</script>

<style scoped lang="less"></style>
