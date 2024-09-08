import { Link, useNavigate, Outlet } from 'react-router-dom'
import { Button, Flex, Layout, Typography } from 'antd'

import { deleteCookie } from '../utils/cookie'

import Person from './Person'

const { Header, Content } = Layout
const { Title } = Typography

const PageLayout = ({ user }: { user: { username: string | undefined; image: string | undefined | null } }) => {
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#EBEEF3' }}>
      <Header
        style={{ backgroundColor: '#fff', padding: '0 1rem', position: 'sticky', top: 0, zIndex: 1, height: '5rem' }}
      >
        <Flex justify="space-between" align="center" style={{ height: '100%' }} wrap>
          <Link to="/">
            <Title
              title="Not really"
              translate="no"
              style={{ fontSize: 18, minWidth: '7.5rem', margin: 0, padding: 5 }}
            >
              Very Cool Blog Platform
            </Title>
          </Link>
          <Flex gap="large" align="center">
            {user.username ? (
              <>
                <Button
                  size="large"
                  onClick={() => navigate('/new-post')}
                  style={{ borderColor: 'lime', color: 'lime', fontSize: '1.1rem' }}
                >
                  Create Post
                </Button>
                <Link to="/profile">
                  <Person image={user.image || '/cat.avif'} username={user.username} />
                </Link>
                <Button
                  onClick={() => {
                    deleteCookie('token')
                    window.location.reload()
                  }}
                  style={{
                    borderColor: '#696',
                    color: '#696',
                    whiteSpace: 'pre-wrap',
                    padding: '1.5rem 1rem',
                    fontSize: '1.1rem',
                    lineHeight: 1.1,
                  }}
                >
                  {'Log ⛥\n⛧ Out'}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/sign-in')} size="large" type="text" style={{ fontSize: '1.3rem' }}>
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/sign-up')}
                  size="large"
                  style={{ borderColor: 'lime', color: 'lime', padding: '1.5rem 1.2rem', fontSize: '1.3rem' }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Header>
      <Content>
        <Flex vertical align="center" style={{ height: '100%', padding: '1.5rem 0.5rem' }}>
          <Outlet />
        </Flex>
      </Content>
    </Layout>
  )
}

export default PageLayout
