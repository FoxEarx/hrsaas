import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data mobile password
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}
/**
 *  员工基本信息
 * @returns
 */
export function getUserInfoApi() {
  return request({ url: '/sys/profile', method: 'POST' })
}

/**
 * 员工详细信息
 * @param {String} id
 * @returns promise
 */
export function getUserDetails(id) {
  return request({ url: `/sys/user/${id}` })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  })
}
