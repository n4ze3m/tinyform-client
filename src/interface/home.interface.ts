export interface HomeForm {
    forms: Form[]
}

export interface Form {
    _id: string
    name: string
    slug: string
    url: string
    is_public: boolean
    created_at: string
}