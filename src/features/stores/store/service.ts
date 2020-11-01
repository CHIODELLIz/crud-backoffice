import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': `${process.env.VUE_APP_API_URL}/api`,
    'access-control-allow-headers': 'Authorization',
  },
})

const getAllStores = async () => {
  return axios.request({
    method: 'GET',
    url: '/api/stores',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateStore = async ({ id, ...data }) => {
  return axios.request({
    method: 'patch',
    url: `/api/stores/${id}`,
    data: { id: id, ...data },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}
const saveStore = async (data: Record<string, string>) => {
  return axios.request({
    method: 'POST',
    url: '/api/stores',
    data,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const deleteStore = async id => {
  return axios.request({
    method: 'DELETE',
    url: `/api/stores/${id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export default {
  getAllStores,
  saveStore,
  updateStore,
  deleteStore,
}
