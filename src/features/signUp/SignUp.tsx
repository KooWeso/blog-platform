import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Form, Input, Typography, Spin, Result, Alert, Checkbox } from 'antd'

import { useAppDispatch } from '../../app/hooks'
import { deleteCookie, setCookie } from '../../utils/cookie'
import ContentWrapper from '../../components/ContentWrapper'
import { addNewProfileValues } from '../profile/profileSlice'

import { useCreateProfileMutation } from './signUpApiSlice'
import type { ServerValidationError } from './signUpApiSlice'

const { Title, Text } = Typography

interface FormValues {
  username: string
  email: string
  password: string
}

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [status, setStatus] = useState(0)
  const [redirectCount, setRedirectCount] = useState(6)
  const [createProfile, { isError, isLoading, isSuccess }] = useCreateProfileMutation()
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

    return () => clearInterval(status)
  }, [isSuccess, navigate, redirectCount, status])

  if (isError && status === 0) {
    return <Result status="error" title="Something went completely wrong! not good ￣へ￣" />
  }

  if (isSuccess) {
    return (
      <Result status="success" title="Account created successfully!" subTitle={`redirecting in ${redirectCount}...`} />
    )
  }

  return (
    <ContentWrapper vertical align="center" style={{ padding: '3rem 2rem', marginTop: '2rem' }} gap="middle">
      <Title level={2}>Create New Account</Title>

      {isLoading && <Spin size="large" style={{ position: 'absolute', top: 50, right: 50 }} />}
      <>
        <Form
          form={form}
          layout="vertical"
          name="login"
          initialValues={{}}
          style={{ width: 'min(24rem, 80vw)' }}
          requiredMark={false}
          labelCol={{ style: { padding: 0 } }}
          size="large"
          autoComplete="on"
          onFinish={(values: FormValues) => {
            if (form.isFieldsTouched()) {
              createProfile(values)
                .unwrap()
                .then((res) => {
                  deleteCookie('token')
                  setCookie('token', res.user.token, 1)
                  dispatch(addNewProfileValues({ username: res.user.username, image: res.user.image }))
                })
                .catch((e: { status: number; data: ServerValidationError }) => {
                  setStatus(e.status)
                  form.setFields(Object.entries(e.data.errors).map(([key, value]) => ({ name: key, errors: [value] })))
                })
            }
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { type: 'string', required: true, message: 'Perhaps you forgot your name' },
              { min: 3, message: 'You have too short... name' },
              { max: 20, message: 'You have too long... name' },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'Invalid E-mail' },
              { required: true, message: 'Please input Email! or something will break... physically' },
            ]}
          >
            <Input placeholder="Random Email address will do just fine" type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input Password! (you cant change it later on)' },
              { min: 6, message: 'Your password needs to be at least 6 characters long' },
              { max: 40, message: 'This password is too long 🐱‍👤' },
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="password2"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please input Password! (you cant change it later on)' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('You SHOULD accept this agreement, or you will be banned!')),
              },
            ]}
          >
            <Checkbox>I agree to disagree</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isLoading}>
              Create
            </Button>
            <Form.Item style={{ textAlign: 'center', margin: 0 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Already have an account? <Link to="/sign-in">Sign In now!</Link>
              </Text>
            </Form.Item>
          </Form.Item>
        </Form>
        {isError && status !== 422 && <Alert message="Unable to create your signUp, unfortunately" type="error" />}
      </>
    </ContentWrapper>
  )
}

export default SignUp
