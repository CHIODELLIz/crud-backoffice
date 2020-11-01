import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': `${process.env.VUE_APP_API_URL}/api`,
    'access-control-allow-headers': 'Authorization',
  },
})

const signIn = async (data: Record<string, string>) => {
  return axios.request({
    method: 'POST',
    url: '/api/authenticate/signIn',
    data,
  })
}

const getDetails = async () => {
  return axios.request({
    method: 'GET',
    url: '/api/users/profile',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export default {
  signIn,
  getDetails,
}
