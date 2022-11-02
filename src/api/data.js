import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const getFieldList = (param) => {
  return axios.request({
    url: `/one/fieldList`,
    method: 'get',
    params: param
  })
}

export const getOneDataList = (param) => {
  return axios.request({
    url: '/one/data',
    method: 'get',
    params: param,
  })
}

export const getTwoDataList = (param) => {
  return axios.request({
    url: '/two/data',
    method: 'get',
    params: param,
  })
}

export const getThreeDataList = (param) => {
  return axios.request({
    url: '/three/data',
    method: 'get',
    params: param,
  })
}
