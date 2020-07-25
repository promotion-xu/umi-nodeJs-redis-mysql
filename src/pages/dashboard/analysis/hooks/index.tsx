import { useCallback, useState, useEffect } from 'react'
import { request } from 'umi'

interface IBlogList {
  id: number
  title: string
  content: string
  createTime: number
  author: string
}

// export const useBlogList = useCallback(async () => {
//   const [blogList, setBlogList] = useState()
//   const res = await request('/api/blob/list')
//   if (res.errno === 0) {
//     setBlogList(res.data)
//   }
//   return blogList
// }, [])

export const useBlogList = (count: number) => {
  const [blogList, setBlogList] = useState()
  useEffect(() => {
    request('/api/blob/list').then(res => {
      setBlogList(res.data)
    })
  }, [count])
  return blogList
}

