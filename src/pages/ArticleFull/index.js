/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Spin, Alert } from 'antd'
import styles from './ArticleFull.module.scss'
import { getArticle as apiGetAtricle } from '../../apiService'

import Article from '../../components/Article'

function ArticleFull() {
  const user = useSelector((state) => state.user)
  const [article, setArticle] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { slug } = useParams()

  const getArticle = async () => {
    setLoading(true)

    const config = user
      ? {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      : {}
    try {
      const { data } = await apiGetAtricle(slug, config)
      setArticle(data.article)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArticle()
  }, [slug])

  if (error) return <Alert message={error.message} type="error" showIcon />

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Spin size="large" />
      </div>
    )
  }

  if (article) {
    return (
      <div className={styles.wrapper}>
        <Article article={article} isFull />
      </div>
    )
  }
}

export default ArticleFull
