import { Button, Flex, Typography, Tag, Popconfirm, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { ReactElement } from 'react'

import Person from './Person'

const { Paragraph } = Typography

interface PostProps {
  data: {
    title: string
    description: string | undefined
    tagList: string[]
    createdAt: string
    favoritesCount: number
    favorited?: boolean
    slug?: string
    author: {
      username: string
      image: string
    }
  }
  auth?: boolean
  sameAuthor?: boolean
  opened?: boolean
  deleteMethod?: (slug: string) => void
  likeComponent?: (n: number, favorited: boolean, auth?: boolean, slug?: string) => ReactElement
}

const confirm = () => {
  return message.success('Post was successfully deleted')
}

const cancel = () => {
  // eslint-disable-next-line no-void
  void message.info('ok', 0.6)
}

const Post = ({
  data: {
    title,
    description,
    tagList,
    createdAt,
    favoritesCount,
    slug,
    favorited = false,
    author: { image, username },
  },
  auth = false,
  sameAuthor = false,
  opened = false,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  deleteMethod = undefined,
  likeComponent = undefined,
}: PostProps) => {
  const navigate = useNavigate()

  return (
    <Flex gap="small" justify="space-between" style={{ flex: 1 }}>
      <Flex gap="small" vertical>
        <Flex gap="small">
          <Link style={{ fontSize: 18 }} to={`/posts/${slug}`} title={title.substring(40)}>
            {title.length > 30 && !opened ? `${title.substring(0, 40)}...` : title}
          </Link>
          {likeComponent && likeComponent(favoritesCount, favorited, auth, slug)}
        </Flex>
        <Flex gap="small" wrap>
          Tags:
          {tagList &&
            tagList.map((tag: string | null, i) => {
              if (!tag) {
                return null
              }
              if (i === 7 && !opened) {
                return (
                  <Tag color="blue" key="more" title={tagList.slice(7).join(', ')}>
                    + {tagList.length - 7} more
                  </Tag>
                )
              }
              if (i > 7 && !opened) {
                return null
              }
              return (
                <Tag key={`${tag}-${i.toString()}`} title={tag.substring(10)}>
                  {tag.length > 15 ? `${tag.substring(0, 10)}...` : tag}
                </Tag>
              )
            })}
        </Flex>
        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
          {'Description: '}
          {description && description.length > 140 && !opened ? `\n${description.substring(0, 140)}...` : description}
        </Paragraph>
      </Flex>
      <Flex style={{ flexShrink: 0 }} vertical gap="middle" align="end">
        <Person username={username} image={image} createdAt={createdAt} />
        {opened && sameAuthor && slug && (
          <Flex gap="middle">
            <Popconfirm
              title="Are you sure to delete this post?"
              description="Post will be deleted forever."
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onConfirm={async () => {
                await confirm()
                deleteMethod!(slug)
                navigate('/posts')
              }}
              onCancel={cancel}
              okText="Yes please"
              cancelText="No thanks"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button onClick={() => navigate(`/posts/${slug}/edit`)} style={{ borderColor: 'lime', color: 'lime' }}>
              Edit
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default Post
