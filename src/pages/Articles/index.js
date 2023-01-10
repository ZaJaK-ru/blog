/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Pagination, Spin, Alert } from 'antd'
import styles from './Articles.module.scss'

import Article from '../../components/Article'

function Articles() {
  const user = useSelector((state) => state.user)
  const [articles, setArticles] = useState([])
  const [articlesCount, setArticlesCount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const getArticles = async () => {
    const limit = 5
    const offset = page > 1 ? (page - 1) * limit : 0
    setLoading(true)

    const config = user
      ? {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      : {}

    try {
      const { data } = await axios.get(
        `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
        config
      )
      setArticles(data.articles)
      setArticlesCount(data.articlesCount)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArticles()
  }, [page])

  if (error) return <Alert message={error.message} type="error" showIcon />

  return (
    <div className={styles.wrapper}>
      <div className={styles.articles}>
        {loading ? (
          <Spin size="large" />
        ) : (
          articles.map((article) => (
            <Article key={article.slug + article.createdAt} article={article} />
          ))
        )}
      </div>
      <Pagination
        className={styles.pagination}
        current={page}
        defaultCurrent={page}
        pageSize={5}
        total={articlesCount}
        onChange={(e) => setPage(e)}
      />
    </div>
  )
}

export default Articles
