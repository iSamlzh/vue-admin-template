import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api_server/admin/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
