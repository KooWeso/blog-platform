/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Typography, Result, Alert, Space, Flex } from 'antd'

import ContentWrapper from '../../components/ContentWrapper'

import { useCreatePostMutation } from './createPostApiSlice'
import type { ServerValidationError } from './createPostApiSlice'

const { Title } = Typography

interface FormValues {
  title: string
  description: string
  body: string
  tags?: string[]
}

const CreatePost = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(0)
  const [redirectCount, setRedirectCount] = useState(6)
  const [createPost, { isError, isLoading, isSuccess }] = useCreatePostMutation()
  const [form] = Form.useForm()

  useEffect(() => {
    if (redirectCount <= 0) {
      clearInterval(status)
      navigate('/posts')
    }

    if (isSuccess && redirectCount === 6) {
      setStatus(setInterval(() => setRedirectCount((count) => count - 1), 1000))
      setRedirectCount(5)
    }
  }, [isSuccess, navigate, redirectCount, status])

  if (isError && status === 0) {
    return <Result status="error" title="Something went completely wrong! not good ￣へ￣" />
  }

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Your Post created successfully!"
        subTitle={`redirecting in ${redirectCount}...`}
      />
    )
  }

  return (
    <ContentWrapper vertical align="center" style={{ padding: '3rem 2rem', marginTop: '2rem' }} gap="middle">
      <Title level={2}>Create New Post</Title>

      <>
        <Form
          form={form}
          layout="vertical"
          name="createPost"
          initialValues={{}}
          style={{ width: 'min(50rem, 95vw)' }}
          requiredMark={false}
          labelCol={{ style: { padding: 0 } }}
          size="large"
          autoComplete="off"
          onFinish={(values: FormValues) => {
            if (form.isFieldsTouched()) {
              createPost(values)
                .unwrap()
                .catch((e: { status: number; data: ServerValidationError }) => {
                  setStatus(e.status)
                  form.setFields(Object.entries(e.data.errors).map(([key, value]) => ({ name: key, errors: [value] })))
                })
            }
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ type: 'string', required: true, message: 'Perhaps you forgot a title' }]}
          >
            <Input placeholder="Title of your post" />
          </Form.Item>

          <Form.Item
            label="Snort Description"
            name="description"
            rules={[{ type: 'string' }, { max: 300, message: 'Too much 🐱‍👤' }]}
          >
            <Input placeholder="Describe your post" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="body"
            rules={[
              { required: true, message: 'You have to write something, or maybe not', warningOnly: true },
              { max: 100000, message: 'This text is more than 100000 words 🐱‍👤', warningOnly: true },
            ]}
          >
            <Input.TextArea rows={20} placeholder="You can use Markdown" />
          </Form.Item>

          <Form.List name="tagList" initialValue={['']}>
            {(fields, { add, remove }) => {
              return (
                <Flex gap="middle">
                  <Flex gap="small" vertical>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align="baseline">
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[
                            { required: true, message: 'Tag cannot be empty' },
                            { max: 25, message: 'Too much 🐱‍👤' },
                            () => ({
                              validator(_, value: string) {
                                if (!/\s/g.test(value)) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(new Error('No whitespaces allowed'))
                              },
                            }),
                          ]}
                        >
                          <Input placeholder="Tag name" />
                        </Form.Item>
                        <Button color="red" type="text" danger title="Remove" onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Space>
                    ))}
                  </Flex>
                  <Form.Item style={{ alignSelf: 'flex-end' }}>
                    <Button ghost type="primary" onClick={() => add()}>
                      Add Tag
                    </Button>
                  </Form.Item>
                </Flex>
              )
            }}
          </Form.List>

          <Form.Item>
            <Button style={{ width: '40%' }} type="primary" htmlType="submit" loading={isLoading}>
              Send Post
            </Button>
          </Form.Item>
        </Form>
        {isError && status !== 422 && <Alert message="Unable to create your new Post, unfortunately" type="error" />}
      </>
    </ContentWrapper>
  )
}

export default CreatePost
