import {AxiosRequestConfig} from 'axios'
import {StringParam, NumberParam, QueryParamConfig, ObjectParam, JsonParam} from 'use-query-params'

type Order = 1 | -1
const OrderParam: QueryParamGenericConfig<Order | null> = {
    encode(value: Order | null | undefined) {
        return String(value)
    },

    decode(strValue: string | (string | null)[] | null | undefined): Order | null {
        if (strValue === null || strValue === undefined) {
            return null
        }
        if (Array.isArray(strValue)) {
            return 1
        }
        const integer = parseInt(strValue)
        return integer > 0 ? 1 : -1
    },
}

type QueryParamGenericConfig<T> = QueryParamConfig<T | null | undefined, T>

export type UserQueryParamType = {
    sort?: QueryParamGenericConfig<string>
    order?: QueryParamGenericConfig<-1 | 1>
    skip?: QueryParamGenericConfig<number>
    limit?: QueryParamGenericConfig<number>
    regex?: QueryParamGenericConfig<{[key: string]: string}>
    filter?: QueryParamGenericConfig<{[key: string]: string}>
}

type QueryType = {
    sort?: string | null
    order?: Order | null
    skip?: number | null
    limit?: number | null
    regex?: {[key: string]: string | undefined} | null
    filter?: {[key: string]: string | undefined} | null
    date?: {[key: string]: {from?: Date; to?: Date}} | null
}

export type ApiParams = QueryType & {
    data?: any
    onUploadProgress?: AxiosRequestConfig<any>['onUploadProgress']
}

export function createQueryParam() {
    return {
        sort: StringParam,
        order: OrderParam,
        skip: NumberParam,
        limit: NumberParam,
        regex: ObjectParam,
        filter: ObjectParam,
        date: JsonParam,
    }
}

export function paramParser(url: string, params?: ApiParams) {
    if (params && Object.keys(params).length > 0) {
        const paramList: string[] = []
        if (params.sort) {
            paramList.push(`sort=${params.sort}`)
        }
        if (params.order) {
            paramList.push(`order=${params.order}`)
        }
        if (params.regex && Object.keys(params.regex).length > 0) {
            let regex = {}
            for (const [key, value] of Object.entries(params.regex)) {
                if (value && value !== '') regex[key] = value
            }
            paramList.push(`regex=${JSON.stringify(regex)}`)
        }
        if (params.filter && Object.keys(params.filter).length > 0) {
            let filter = {}
            for (const [key, value] of Object.entries(params.filter)) {
                if (value && value !== '') {
                    filter[key] = value
                }
            }
            paramList.push(`filter=${JSON.stringify(filter)}`)
        }
        if (params.date && Object.keys(params.date).length > 0) {
            let date = {}
            for (const [key, value] of Object.entries(params.date)) {
                if (value && (value.from || value.to)) {
                    date[key] = value
                }
            }
            paramList.push(`date=${JSON.stringify(date)}`)
        }
        if (params.skip !== undefined) {
            paramList.push(`skip=${params.skip}`)
        }
        if (params.limit !== undefined) {
            paramList.push(`limit=${params.limit}`)
        }
        url += '?' + paramList.join('&')
    }
    return url
}
