import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'

import { useAppSelector } from '../../app/hooks'
import Post from '../../components/Post'
import ContentWrapper from '../../components/ContentWrapper'
import { selectProfile } from '../profile/profileSlice'
import LikeButton from '../likeButton/LikeButton'

import { useDeleteSinglePostMutation, useGetSinglePostQuery } from './singlePostApiSlice'

const SinglePost = () => {
  const { username } = useAppSelector(selectProfile)
  const { slug } = useParams()
  const [deleteSinglePost] = useDeleteSinglePostMutation()
  const { data, isError, isSuccess } = useGetSinglePostQuery(String(slug))

  if (isError) {
    return <div>Post not found</div>
  }

  if (isSuccess) {
    const { article } = data

    return (
      <ContentWrapper vertical style={{ maxWidth: 'max(70vw, min(460px, 95vw))', padding: 20 }}>
        <Post
          data={article}
          opened
          sameAuthor={article.author.username === username}
          auth={!!username}
          deleteMethod={(slug2: string) => {
            deleteSinglePost(slug2).catch(() => null)
          }}
          likeComponent={LikeButton}
        />
        Content:
        <ReactMarkdown
          className="markdown-body"
          remarkRehypeOptions={{ allowDangerousHtml: true }}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {article.body.replace(/\n/gi, '  \n')}
        </ReactMarkdown>
      </ContentWrapper>
    )
  }
  return <div>Loading...</div>
}

export default SinglePost
