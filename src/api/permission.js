import request from '@/utils/request'

// 获取权限
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params,
  })
}

export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data,
  })
}
