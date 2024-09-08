import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './app/hooks'
import PageLayout from './components/PageLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { addNewProfileValues, selectProfile } from './features/profile/profileSlice'
import { useGetProfileQuery } from './features/profile/profileApiSlice'
import Profile from './features/profile/Profile'
import SinglePost from './features/singlePost/SinglePost'
import SignIn from './features/signIn/SignIn'
import SignUp from './features/signUp/SignUp'
import Posts from './features/posts/Posts'
import EditPost from './features/editPost/EditPost'
import CreatePost from './features/createPost/CreatePost'

const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectProfile)
  const { data } = useGetProfileQuery()

  const profile = data?.user

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(addNewProfileValues({ username: profile?.username, image: profile?.image }))
  }, [dispatch, profile?.image, profile?.username])

  return (
    <Routes>
      <Route path="/" element={<PageLayout user={user} />}>
        <Route
          path="new-post"
          element={
            <ProtectedRoute user={user.username}>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path=":slug">
            <Route index element={<SinglePost />} />
            <Route path="edit" element={<EditPost />} />
          </Route>
        </Route>

        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="posts" replace />} />
        <Route path="" element={<Navigate to="posts" replace />} />
      </Route>
    </Routes>
  )
}

export default App
