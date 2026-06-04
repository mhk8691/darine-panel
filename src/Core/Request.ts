import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import APP_URL from './APP_URL'

export interface ApiResponse<DataType> {
    statusCode: string
    status: number
    message: string
    data: DataType
}

const api = axios.create({
    baseURL: APP_URL,
    withCredentials: true,
})

let isRefreshing = false
let failedQueue: {
    resolve: (value?: any) => void
    reject: (reason?: any) => void
}[] = []

const processQueue = (error: any = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve()
        }
    })

    failedQueue = []
}

api.interceptors.request.use(
    (config: any) => {
        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config

        if (error.response?.status === 401 && !originalRequest?._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    })
                }).then(() => api(originalRequest))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                await api.post('/auth/refresh')

                processQueue()

                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError)

                window.location.href = '/login'

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error.response?.data ?? error)
    },
)

export async function query<DataType>(options: AxiosRequestConfig): Promise<DataType> {
    const response = await api(options)

    return response.data as DataType
}

export default api