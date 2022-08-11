import request from '@/utils/request'

export function getCompanyApi(id) {
  return request({
    url: `/company/${id}`,
  })
}
