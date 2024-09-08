import { useNavigate, Link } from 'react-router-dom'
import { Button, Form, Input, Typography } from 'antd'

import { useAppDispatch } from '../../app/hooks'
import ContentWrapper from '../../components/ContentWrapper'
import { deleteCookie, setCookie } from '../../utils/cookie'
import { addNewProfileValues } from '../profile/profileSlice'

import { useSignInMutation } from './signInApiSlice'

const { Title, Text } = Typography

const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [signIn] = useSignInMutation()

  return (
    <ContentWrapper vertical align="center" style={{ padding: '3rem 2rem', marginTop: '2rem' }} gap="middle">
      <Title level={2}>Sign In</Title>
      <Form
        form={form}
        layout="vertical"
        name="login"
        style={{ width: 'min(24rem, 80vw)' }}
        onFinish={(values: { email: string; password: string }) => {
          signIn(values)
            .unwrap()
            .then((res) => {
              deleteCookie('token')
              setCookie('token', res.user.token, 1)
              dispatch(addNewProfileValues({ username: res.user.username, image: res.user.image }))
              navigate('/posts')
            })
            .catch(() => {
              form.setFields([
                {
                  errors: ['Incorrect email or password'],
                  name: 'password',
                },
                {
                  errors: ['Incorrect email or password'],
                  name: 'email',
                },
              ])
            })
        }}
        requiredMark={false}
        labelCol={{ style: { padding: 0 } }}
        size="large"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          <Form.Item style={{ textAlign: 'center', margin: 0 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Don&apos;t have an account? <Link to="/sign-up">Register now!</Link>
            </Text>
          </Form.Item>
        </Form.Item>
      </Form>
    </ContentWrapper>
  )
}

export default SignIn
