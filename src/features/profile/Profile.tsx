import { useState } from 'react'
import { Button, Form, Input, Typography, Spin, Result, Alert } from 'antd'

import ContentWrapper from '../../components/ContentWrapper'

import { useEditProfileMutation, useGetProfileQuery } from './profileApiSlice'
import type { ServerValidationError } from './profileApiSlice'

const { Title } = Typography

interface FormValues {
  username: string
  email: string
  bio: string
  image: string
}

const Profile = () => {
  const [formSubmited, setFormSubmited] = useState(false)
  const [status, setStatus] = useState(0)
  const { data, isSuccess, isLoading, isError } = useGetProfileQuery()
  const [editProfile, { isError: editError, isLoading: editLoading }] = useEditProfileMutation()
  const [form] = Form.useForm()

  const user = data?.user

  if (isError) {
    return <Result status="error" title="Something went wrong!" />
  }

  return (
    <ContentWrapper vertical align="center" style={{ padding: '3rem 2rem', marginTop: '2rem' }} gap="middle">
      <Title level={2}>Edit Profile</Title>

      {isLoading && <Spin size="large" />}

      {isSuccess && user && (
        <>
          <Form
            form={form}
            layout="vertical"
            name="login"
            initialValues={{ ...user }}
            style={{ width: 'min(24rem, 80vw)' }}
            requiredMark={false}
            labelCol={{ style: { padding: 0 } }}
            size="large"
            autoComplete="off"
            onFinish={(values: FormValues) => {
              setFormSubmited(true)
              if (form.isFieldsTouched()) {
                editProfile(values)
                  .unwrap()
                  .catch((e: { status: number; data: ServerValidationError }) => {
                    setStatus(e.status)
                    form.setFields(
                      Object.entries(e.data.errors).map(([key, value]) => ({ name: key, errors: [value] }))
                    )
                  })
              }
            }}
          >
            <Form.Item label="Username" name="username" rules={[{ type: 'string' }]}>
              <Input placeholder="Change Username" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Invalid E-mail' }]}>
              <Input placeholder="Change Email address" type="email" />
            </Form.Item>
            <Form.Item label="Bio" name="bio">
              <Input type="text" placeholder="Change Info about yourself" />
            </Form.Item>
            <Form.Item name="image" label="Avatar Image (URL)" rules={[{ type: 'url', message: 'Invalid URL' }]}>
              <Input placeholder="Avatar Image" />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={editLoading}>
                Save
              </Button>
            </Form.Item>
          </Form>
          {editError && status !== 422 && <Alert message="Unable to edit profile" type="error" />}
          {formSubmited && !form.isFieldsTouched() && (
            <Alert message="You must change at least one field" type="warning" />
          )}
        </>
      )}
    </ContentWrapper>
  )
}

export default Profile
