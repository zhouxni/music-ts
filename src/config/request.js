import axios from 'axios'

const instance = axios.create({
    timeout:6000
})
instance.interceptors.request.use(config=>{
    return config
},error=>{
    return Promise.reject(error)
})

instance.interceptors.response.use(response=>{
   return response.data.code===200?response.data:Promise.reject()
},error=>{
    return Promise.reject(error)
})

export default instance.request;