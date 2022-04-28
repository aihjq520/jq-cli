import { useCallback, useEffect, useState } from 'react'

import { FailResponse, Response } from 'api/base/responses'
import { PaginationResponse } from 'api/common/response'

const useData = <T>(
  apiFn: () => Promise<FailResponse | Response<T>>,
  defaultData?: T
) => {
  const [data, setData] = useState<T>()

  const fetchData = useCallback(async () => {
    setData(undefined)
    const res = await apiFn()
    if (res.success && res.data) {
      setData(res.data)
      return
    }
    setData(defaultData ? defaultData : ({} as T))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, updateData: fetchData }
}

/**
 *  分页Hook
 * @example 
 * usePaginationTable(forestApi.factoryList.bind(forestApi), {
      page_size: 8
    })
 * @param fetchDataFunction 获取列表函数
 * @param args 获取列表函数参数
 * @returns
 */
export const usePaginationTable = <T, P>(
  fetchDataFunction: (
    args: P
  ) => Promise<FailResponse | Response<PaginationResponse<T>>>,
  args: Omit<P, 'page'>
) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState<number>()
  const [listInfo, setListInfo] = useState<T[] | undefined>(undefined)
  const argStr = JSON.stringify(args)

  const updateList = useCallback(
    async (page = 1) => {
      setListInfo(undefined)
      const res = await fetchDataFunction({
        page_size: 10,
        ...JSON.parse(argStr),
        page
      })
      if (res.success && res.data?.list) {
        setListInfo(res.data.list)
        setCount(res.data.total_pages)
        return
      }
      setListInfo([])
    },
    [argStr]
  )

  useEffect(() => {
    setCurrentPage(1)
    updateList(1)
  }, [updateList])

  const onChangePage = (newPage: number) => {
    setCurrentPage(newPage)
    updateList(newPage)
  }

  return {
    data: listInfo,
    count: count,
    page: currentPage,
    onChangePage,
    updateList: () => updateList(currentPage),
    setData: (newData: T[]) => setListInfo(newData)
  }
}

export default useData
