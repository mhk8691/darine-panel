export type PaginationType = {
    pages: number
    next: string
    previous: string
}

export type PaginatedResponse<T> = {
    results: T
    pagination: PaginationType
}
