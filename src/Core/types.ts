export type PaginationType = {
    pages: number
    next: string
    previous: string
}

export type PaginatedResponse<T> = {
    results: T
    pagination: PaginationType
}

export type PropertyType = {
    id: number
    name: string
    value: string
}