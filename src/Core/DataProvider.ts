import {ApiResponse, query} from './Request'
import {AxiosRequestConfig} from 'axios'
import {ApiParams} from './QueryParams'
import APP_URL from './APP_URL'

async function HttpRequest<DataType>(url: string, options) {
    options.headers = {
        ...options.headers,
        'Accept-language': 'fa',
    }
    if (localStorage.getItem('user')) {
        const userObj = JSON.parse(localStorage.getItem('user') || '')
        options.headers.Authorization = 'Bearer ' + userObj.token
    }
    const data = await query<DataType>({url: url, ...options})
    return data
}
export class DataProvider {
    static baseUrl = APP_URL
    static post = async <DataType>(resource: string, params?: ApiParams) => {
        const url = `${this.baseUrl}/${resource}`
        const options: AxiosRequestConfig = {
            method: 'post',
        }
        if (params && params.data) {
            options.data = params.data
        }
        if (params && params.onUploadProgress) {
            options.onUploadProgress = params.onUploadProgress
        }
        const data = await HttpRequest<ApiResponse<DataType>>(url, options)
        return data
    }
    static async get<DataType>(resource: string, params?: ApiParams) {
        const url = `${this.baseUrl}/${resource}`
        const options: AxiosRequestConfig = {
            method: 'get',
        }
        if (params && params.data) {
            options.data = params.data
        }
        if (params) {
            options.params = params
        }
        if (params && params.onUploadProgress) {
            options.onUploadProgress = params.onUploadProgress
        }
        const data = await HttpRequest<ApiResponse<DataType>>(url, options)
        return data
    }

    static async patch<DataType>(resource: string, params?: ApiParams) {
        const url = `${this.baseUrl}/${resource}`
        const options: AxiosRequestConfig = {
            method: 'PATCH',
        }
        if (params && params.data) {
            options.data = params.data
        }
        if (params && params.onUploadProgress) {
            options.onUploadProgress = params.onUploadProgress
        }
        const data = await HttpRequest<ApiResponse<DataType>>(url, options)
        return data
    }
    static async put<DataType>(resource: string, params?: ApiParams) {
        const url = `${this.baseUrl}/${resource}`
        const options: AxiosRequestConfig = {
            method: 'PUT',
        }
        if (params && params.data) {
            options.data = params.data
        }
        if (params && params.onUploadProgress) {
            options.onUploadProgress = params.onUploadProgress
        }
        const data = await HttpRequest<ApiResponse<DataType>>(url, options)
        return data
    }

    static async delete<DataType>(resource: string, params?: ApiParams) {
        const url = `${this.baseUrl}/${resource}`
        const options: AxiosRequestConfig = {
            method: 'DELETE',
        }
        if (params && params.data) {
            options.data = params.data
        }
        if (params && params.onUploadProgress) {
            options.onUploadProgress = params.onUploadProgress
        }
        const data = await HttpRequest<ApiResponse<DataType>>(url, options)
        return data
    }
}
