/* eslint-disable react/prop-types */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as routes from './routes'
import styles from './App.module.scss'

import Header from './components/Header'
import Articles from './pages/Articles'
import ArticleFull from './pages/ArticleFull'
import NewArticle from './pages/NewArticle'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function ProtectedRoute(user, children) {
  if (!user) {
    return <Navigate to={routes.signInPath} replace />
  }

  return children
}

export default function App() {
  const user = useSelector((state) => state.user)

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path={routes.rootPath} element={<Articles />} />
        <Route path={routes.articlesPath} element={<Articles />} />
        <Route path={routes.articleFullPath} element={<ArticleFull />} />
        <Route
          path={routes.editPath}
          element={ProtectedRoute(user, <NewArticle />)}
        />
        <Route path={routes.signInPath} element={<SignIn />} />
        <Route path={routes.signUpPath} element={<SignUp />} />
        <Route
          path={routes.profilePath}
          element={ProtectedRoute(user, <Profile />)}
        />
        <Route
          path={routes.newArticlePath}
          element={ProtectedRoute(user, <NewArticle />)}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
