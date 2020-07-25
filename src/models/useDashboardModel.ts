import { useCallback, useState } from 'react'
import { request } from 'umi'

interface IBlogList {
  id: number
  title: string
  content: string
  createTime: number
  author: string
}

export default function useDashboardModel() {
  const [blogList, setBlogList] = useState<IBlogList[]>()
  const getBlogList = useCallback(async () => {
    const res = await request('/api/blob/list')
    if (res.errno === 0) {
      setBlogList(res.data)
    }
  }, [])

  return {
    getBlogList,
    blogList
  }
}
