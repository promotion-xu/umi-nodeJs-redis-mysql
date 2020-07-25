import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useIntl, request } from 'umi'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import { useBlogList } from './hooks'
import styles from './index.less'

function Analysis() {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<string>('')
  const [currentBlog, setCurrentBlog] = useState<object>({})
  const [count, setCount] = useState<number>(0)
  const typeRef = useRef()
  const currentBlogRef = useRef()
  const { formatMessage } = useIntl()
  const blogList = useBlogList(count)
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 150,
      key: 'id'
    },
    {
      title: 'author',
      dataIndex: 'author',
      width: 150,
      key: 'author'
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: 'operation',
      key: 'operation',
      render: (text: string | number, record: any) => {
        return (
          <>
            <Button onClick={() => handleShowDialog('edit', record)}>编辑</Button>
            <Button onClick={() => handleDeleteBlog(record.id)}>删除</Button>
          </>
        )
      }
    }
  ];

  const handleCancel = useCallback(() => {
    setDialogVisible(false)
  }, [])

  const handleDeleteBlog = useCallback(async id => {
    const res = await request(`/api/blob/del?id=${id}`, {
      method: 'post',
    })
    const { errno } = res
    if (errno === 0) {
      message.success('删除成功')
      setCount(count => count + 1)
    }
  }, [])

  const handleConfirm = useCallback(() => {
    console.log(typeRef.current, currentBlogRef.current)
    if (typeRef.current === 'add') {
      form.validateFields().then(async values => {
        const res = await request('/api/blob/new', {
          method: 'post',
          data: values
        })
        const { errno } = res
        if (errno === 0) {
          setDialogVisible(false)
          message.success('新建成功')
          setCount((count) => count + 1)
          return
        }
        return message.error('新建失败')
      })
      return
    }
    form.validateFields().then(async values => {
      const res = await request(`/api/blob/update?id=${currentBlogRef.current.id}`, {
        method: 'post',
        data: { ...values }
      })
      const { errno } = res
      if (errno === 0) {
        message.success('更新成功')
        setCount(count => count + 1)
        setDialogVisible(false)
      }
    })
  }, [])

  const handleShowDialog = useCallback((type: string, detail?: any) => {
    setDialogVisible(true)
    setDialogType(() => type)
    typeRef.current = type
    if (type === 'add') {
      currentBlogRef.current = { title: '', content: '' }
      return
    }
    currentBlogRef.current = detail
  }, [])


  return (
    <div className={styles.analysis}>
      <div className={styles.btns}>
        <Button onClick={() => handleShowDialog('add')} type="primary">{formatMessage({ id: 'ADD_BLOG' })}</Button>
      </div>
      <div className={styles.table}>
        <Table rowKey="id" columns={columns} dataSource={blogList} pagination={{ pageSize: 50 }} scroll={{ y: 500 }} />
      </div>
      {dialogVisible && <Modal
        title={dialogType === 'add' ? formatMessage({ id: 'ADD_BLOG' }) : formatMessage({ id: 'UPDATE_BLOG' })}
        visible={dialogVisible}
        onCancel={handleCancel}
        onOk={handleConfirm}
        destroyOnClose
      >
        <Form form={form} initialValues={dialogType === 'edit' && {
          title: currentBlog.title,
          content: currentBlog.content,
        }}>
          <Form.Item name="title" label="标题">
            <Input></Input>
          </Form.Item>
          <Form.Item name="content" label="内容">
            <Input.TextArea name="content"></Input.TextArea>
          </Form.Item>

        </Form>
      </Modal>}
    </div>
  )
}

Analysis.title = 'ANALYSIS_TITLE'
Analysis.layout = 'PRO_LAYOUT'
Analysis.requireSignin = true
// Analysis.access = 'canReadDashboardAnalysis'

export default Analysis
