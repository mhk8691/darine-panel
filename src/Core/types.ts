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
export type UserType = {
        id: number
        phone_number: string
        first_name: string
        last_name: string
        profile_picture: string | null
        is_active: boolean
        is_staff: boolean
        is_superuser: boolean
        role: string
        date_joined: string
}