export interface Post {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    image: string
    following: boolean
  }
}

export interface PostsApiResponse {
  articles: Post[]
  articlesCount: number
}

export interface UserApiResponse {
  user: {
    email: string
    token: string
    username: string
    bio: string
    image: string | null
  }
}

export interface UserData {
  email?: string
  username: string | undefined
  bio?: string
  image: string | undefined | null
}

export interface ServerError {
  errors: {
    body: string[]
  }
}
