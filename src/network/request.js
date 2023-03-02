import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/hy66',
  timeout: 5000
})

instance.interceptors.request.use(
  config => config,
  err => err
)
instance.interceptors.response.use(
  res => res.data
)

export function request(config) {
  // return new Promise((resolve, reject) => {
  //   instance(config)
  //     .then(res => {
  //       resolve(res)
  //     })
  //     .catch(err => {
  //       reject(err)
  //     })
  // })
  return instance(config)
}