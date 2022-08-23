<template>
  <div class="main" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.inEcharts()
  },

  methods: {
    inEcharts() {
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '人员绩效表',
        },
        legend: {
          data: ['张三', '李四'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [50, 20, 60, 40, 70, 90],
                name: '张三',
              },
              {
                value: [20, 50, 28, 70, 42, 20],
                name: '李四',
              },
            ],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  height: 400px;
  width: 100%;
}
</style>
