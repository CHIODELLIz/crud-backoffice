import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': `${process.env.VUE_APP_API_URL}/api`,
    'access-control-allow-headers': 'Authorization',
  },
})

const getAllUsers = async () => {
  return axios.request({
    method: 'GET',
    url: '/api/users',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateUser = async ({ id, ...data }) => {
  return axios.request({
    method: 'patch',
    url: `/api/users/${id}`,
    data: { id: id, ...data },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}
const saveUser = async (data: Record<string, string>) => {
  return axios.request({
    method: 'POST',
    url: '/api/users',
    data,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const deleteUser = async id => {
  return axios.request({
    method: 'DELETE',
    url: `/api/users/${id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export default {
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
}
