import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api_server/admin/city_server/shop/list',
    method: 'get',
    params
  })
}

export function edit(data) {
  return request({
    url: '/api_server/admin/city_server/shop/edit',
    method: 'post',
    data: data
  })
}

export function getCityList(params) {
  return request({
    url: '/api_server/admin/city_server/city/list',
    method: 'get',
    params
  })
}

export function getClassifyList(params) {
  return request({
    url: '/api_server/admin/city_server/classify/list',
    method: 'get',
    params
  })
}

export function getRankList(params) {
  return request({
    url: '/api_server/admin/city_server/rank/list',
    method: 'get',
    params
  })
}

export function getPinpaiApplyList(params) {
  return request({
    url: '/api_server/admin/apply/list',
    method: 'get',
    params
  })
}

export function getArticleList(params) {
  return request({
    url: '/api_server/admin/article/list',
    method: 'get',
    params
  })
}

export function editArticle(data) {
  return request({
    url: '/api_server/admin/article/add',
    method: 'post',
    data
  })
}