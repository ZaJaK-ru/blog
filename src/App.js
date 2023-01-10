/* eslint-disable react/prop-types */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
    return <Navigate to="/sign-in" replace />
  }

  return children
}

export default function App() {
  const user = useSelector((state) => state.user)

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleFull />} />
        <Route
          path="/articles/:slug/edit"
          element={ProtectedRoute(user, <NewArticle />)}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={ProtectedRoute(user, <Profile />)} />
        <Route
          path="/new-article"
          element={ProtectedRoute(user, <NewArticle />)}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
