/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { nanoid } from 'nanoid'
import { Alert, Popconfirm, message } from 'antd'
import { favoriteArticle, deleteArticle } from '../../apiService'
import * as routes from '../../routes'

import Avatar from '../Avatar'

import styles from './Article.module.scss'

function Article({ article, isFull }) {
  const [articleLoc, setArticleLoc] = useState(article)
  const [error, setError] = useState(null)
  const isAuth = useSelector((state) => state.isAuth)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  let config = {}

  if (isAuth) {
    config = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    }
  }

  const {
    createdAt,
    tagList,
    slug,
    title,
    favoritesCount,
    favorited,
    author,
    description,
    body,
  } = articleLoc

  const favoritedHandler = async () => {
    try {
      if (isAuth) {
        const res = await favoriteArticle(slug, favorited, config)
        setArticleLoc(res.data?.article)
      } else {
        navigate(routes.signInPath)
      }
    } catch (e) {
      setError(e)
    }
  }

  const tags = tagList.map((tag) => {
    if (tag.trim().length > 0) {
      return (
        <span
          className={`${styles.article__tag} ${
            isFull ? null : styles.overflow
          }`}
          key={nanoid()}
        >
          {tag}
        </span>
      )
    }
    return false
  })

  const confirm = async () => {
    try {
      await deleteArticle(slug, config)
      message.success('Article has been deleted')
      navigate(routes.rootPath, { replace: true })
    } catch (err) {
      message.error(`Error ${err.status}`)
    }
  }

  if (error) return <Alert message={error.message} type="error" showIcon />

  return (
    <div className={`${styles.article} ${isFull ? styles.articlefull : null}`}>
      <div className={styles.article__header}>
        <div className={styles.article__left}>
          <div className={styles.article__top}>
            {!isFull ? (
              <Link
                to={`/articles/${slug}`}
                className={`${styles.article__title} ${
                  isFull ? null : styles.overflow
                }`}
              >
                {title}
              </Link>
            ) : (
              <div className={styles.article__title}>{title}</div>
            )}
            {favorited ? (
              <HeartFilled
                onClick={favoritedHandler}
                className={styles.article__heart}
                style={{ fontSize: '16px', color: 'red' }}
              />
            ) : (
              <HeartOutlined
                onClick={favoritedHandler}
                className={styles.article__heart}
                style={{ fontSize: '16px' }}
              />
            )}
            <div className={styles.article__like}>{favoritesCount}</div>
          </div>
          <div
            className={`${styles.article__tags} ${
              isFull ? null : styles.article__tagsnowrap
            }`}
          >
            {tags}
          </div>
          <div
            className={`${styles.article__description} ${
              isFull ? null : styles.overflow
            }`}
          >
            {description}
          </div>
        </div>
        <div className={styles.article__right}>
          <Avatar user={author} createdAt={createdAt} />
          {user?.username === article.author.username && isFull ? (
            <div className={styles.article__control}>
              <Popconfirm
                placement="left"
                title="Are you sure to delete this article?"
                description="Delete the article"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <button
                  className={`${styles.btn} ${styles.btn__delete}`}
                  type="button"
                >
                  Delete
                </button>
              </Popconfirm>
              <Link to="edit">
                <button
                  className={`${styles.btn} ${styles.btn__edit}`}
                  type="button"
                >
                  Edit
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.article__body}>
        {isFull && (
          <div className={styles.article__markdown}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
