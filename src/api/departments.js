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
/**
 * 添加部门
 * @param {*} id
 * @returns
 */
export function addDeptsApi(data) {
  return request({
    url: `/company/department`,
    method: 'POST',
    data,
  })
}
/**
 * 编辑部门
 * @param {*} id
 * @returns
 */
export function titleDeptsApi(id) {
  return request({
    url: `/company/department/${id}`,
  })
}
/**
 * 编辑详情
 * @param {*} id
 * @returns
 */
export function editDeptsApi(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data,
  })
}
