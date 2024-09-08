import { Button, message } from 'antd'
import { useState, type ReactElement } from 'react'

import Like from '../../components/Like'

import { useDislikeMutation, useLikeMutation } from './likeButtonApiSlice'

type LikeButtonType = (n: number, favorited: boolean, auth?: boolean, slug?: string) => ReactElement

const LikeButton: LikeButtonType = (favoritesCount, favorited, auth, slug) => {
  const [count, setCount] = useState(favoritesCount)
  const [favoritedState, setFavoritedState] = useState(favorited)
  const [like] = useLikeMutation()
  const [dislike] = useDislikeMutation()

  return (
    <Button
      type="text"
      onClick={() => {
        if (!auth) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          message.warning('Please login first')
          return
        }
        setCount((c) => c + (favoritedState ? -1 : 1))
        setFavoritedState(!favoritedState)

        if (!slug) return

        if (favoritedState) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          dislike(slug)
            .unwrap()
            .catch(() => setFavoritedState(true))
        } else {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          like(slug)
            .unwrap()
            .catch(() => setFavoritedState(false))
        }
      }}
    >
      <Like active={favoritedState} /> {count}
    </Button>
  )
}

export default LikeButton
