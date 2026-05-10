import request from '@/utils/requests'

export function login(user) {
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: user
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export default {
  login,
  logout
}