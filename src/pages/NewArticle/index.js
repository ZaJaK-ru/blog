/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import { Alert } from 'antd'
import { getArticle, newArticle, updateArticle } from '../../apiService'
import * as routes from '../../routes'

import styles from './NewArticle.module.scss'

function NewArticle() {
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.user)
  const { slug } = useParams()
  const isEditing = Boolean(slug)

  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getArticle(slug, {})
        const article = res.data?.article

        setValue('title', article?.title)
        setValue('description', article?.description)
        setValue('body', article?.body)
        setValue('tagList', article?.tagList)
      } catch (err) {
        setError(err)
      }
    }

    if (slug) fetchData()
  }, [slug])

  const onSubmit = async (data) => {
    const config = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    }

    try {
      const res = isEditing
        ? await updateArticle(slug, data, config)
        : await newArticle(data, config)

      const newSlug = isEditing ? slug : res.data?.article?.slug

      navigate(`${routes.articlesPath}/${newSlug}`)
    } catch (err) {
      setError(err)
    }
  }

  if (error) return <Alert message={error.message} type="error" showIcon />

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {isEditing ? <h2>Edit article</h2> : <h2>Create new article</h2>}
        <label className={styles.label} htmlFor="title">
          Title
          <input
            id="title"
            className={styles.input}
            type="text"
            style={errors.title && { borderColor: ' #F5222D' }}
            {...register('title', { required: 'Enter title' })}
          />
          {errors.title && (
            <span className={styles.error}>{`${errors.title.message}`}</span>
          )}
        </label>

        <label className={styles.label} htmlFor="description">
          Short description
          <input
            id="description"
            className={styles.input}
            type="text"
            style={errors.description && { borderColor: ' #F5222D' }}
            {...register('description', { required: 'Enter description' })}
          />
          {errors.description && (
            <span className={styles.error}>
              {`${errors.description.message}`}
            </span>
          )}
        </label>

        <label className={styles.label} htmlFor="body">
          Text
          <textarea
            id="body"
            className={styles.textarea}
            rows="7"
            placeholder="Text"
            style={errors.description && { borderColor: ' #F5222D' }}
            {...register('body', { required: 'Enter body' })}
          />
          {errors.body && (
            <span className={styles.error}>{`${errors.body.message}`}</span>
          )}
        </label>
        <div className={styles.tags}>
          <div>
            {fields.map((tag, index) => (
              <div
                key={tag.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '5px',
                }}
              >
                <input
                  key={tag.id}
                  type="text"
                  placeholder="Tag"
                  id={`tagList[${index}]`}
                  name={`tagList[${index}]`}
                  className={styles.input}
                  {...register(`tagList.${index}`, {
                    required: {
                      value: true,
                      message: 'Enter tag or delete',
                    },
                  })}
                />
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btn__delete}`}
                  onClick={(e) => {
                    e.preventDefault()
                    remove(index)
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className={styles.tags__add}>
            <button
              className={`${styles.btn} ${styles.btn__add}`}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                append('')
              }}
            >
              Add&nbsp;tag
            </button>
          </div>
        </div>
        {errors.tagList && (
          <span className={styles.error}>{`${errors.tagList.message}`}</span>
        )}

        <button className={`${styles.btn} ${styles.btn__send}`} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default NewArticle
