import request from '@/utils/request'

/**
 * 获取组织架构列表
 * @returns promise
 */
export function getDeptsApi() {
  return request({
    url: '/company/department',
  })
}

/**
 * 删除部门
 * @param {Number} id
 * @returns promise
 */
export function delDeptsApi(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE',
  })
}
