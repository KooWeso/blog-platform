import { useSearchParams } from 'react-router-dom'
import { List, Spin } from 'antd'

import Post from '../../components/Post'
import ContentWrapper from '../../components/ContentWrapper'
import { useAppSelector } from '../../app/hooks'
import LikeButton from '../likeButton/LikeButton'
import { selectProfile } from '../profile/profileSlice'

import st from './posts.module.scss'
import { useGetPostsQuery } from './postsApiSlice'

const Posts = () => {
  // XXX redundunt loading state
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' })
  const { data, isError, isLoading, isSuccess } = useGetPostsQuery(Number(searchParams.get('page')) ?? 1)
  const { username } = useAppSelector(selectProfile)

  if (isError) {
    return <h1 style={{ color: 'red' }}>Server Error</h1>
  }

  return (
    <>
      {isLoading && <Spin size="large" style={{ position: 'absolute', top: 150, right: 50, zIndex: 10 }} />}

      <List
        grid={{ gutter: 16, column: 1 }}
        split={false}
        itemLayout="vertical"
        size="large"
        dataSource={isSuccess ? data.articles : []}
        loading={isLoading}
        pagination={
          isSuccess && data.articlesCount
            ? {
                onChange: (p: number) => {
                  setSearchParams({ page: p.toString() })
                },
                pageSize: 6,

                current: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1,
                align: 'center',
                total: data.articlesCount,
                showTotal: (total) => `\u00B7 ${total} post${String(total).endsWith('1') ? '' : 's'} \u00B7`,
                showSizeChanger: false,
              }
            : false
        }
        renderItem={(item) => {
          return (
            <List.Item key={item.slug} className={st.posts}>
              <ContentWrapper className={st.posts__wrapper}>
                <Post data={item} auth={!!username} likeComponent={LikeButton} />
              </ContentWrapper>
            </List.Item>
          )
        }}
      />
    </>
  )
}

export default Posts
