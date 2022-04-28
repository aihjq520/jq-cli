export interface AbstractList<T> {
  list: T[]
}

export interface PaginationResponse<T> extends AbstractList<T> {
  total_pages: number
  total_count: number
}

export interface ListPagination {
  page?: number
  page_size?: number
}
