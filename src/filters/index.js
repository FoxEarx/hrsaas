import dayjs from 'dayjs'
//过滤器方法
export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
