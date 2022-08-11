import request from '@/utils/request'

export function getRoleApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}

export function getRolseApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}

export function removeRolseApi(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE',
  })
}
