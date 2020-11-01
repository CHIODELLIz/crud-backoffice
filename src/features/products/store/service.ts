import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': `${process.env.VUE_APP_API_URL}/api`,
    'access-control-allow-headers': 'Authorization',
  },
})

const getAllProducts = async () => {
  return axios.request({
    method: 'GET',
    url: '/api/products',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateProduct = async ({ id, ...data }) => {
  return axios.request({
    method: 'patch',
    url: `/api/products/${id}`,
    data: { id: id, ...data },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}
const saveProduct = async (data: Record<string, string>) => {
  return axios.request({
    method: 'POST',
    url: '/api/products',
    data,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const deleteProduct = async id => {
  return axios.request({
    method: 'DELETE',
    url: `/api/products/${id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export default {
  getAllProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
}
