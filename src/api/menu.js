import request from '@/utils/requests'

export function getMenuRoutes() {
  return request({
    url: '/system/menu/getRouters',
    method: 'get',
  })
}
