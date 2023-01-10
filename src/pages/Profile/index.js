/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Profile.module.scss'

import { login } from '../../redux/actions'
import axios from '../../axios'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    const config = {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    }

    axios
      .put('/user', { user: data }, config)
      .then((res) => {
        dispatch(login(res.data?.user))
        navigate('/')
      })
      .catch((err) => {
        if (err.response) {
          const serverErrors = err.response.data.errors
          if (serverErrors.username) {
            setError('username', {
              type: 'server',
              message: 'Something went wrong with username',
            })
          }
          if (serverErrors.email) {
            setError('email', {
              type: 'server',
              message: 'Something went wrong with email',
            })
          }
          if (serverErrors.password) {
            setError('password', {
              type: 'server',
              message: 'Something went wrong with password',
            })
          }
          if (serverErrors.image) {
            setError('image', {
              type: 'server',
              message: 'Something went wrong with image',
            })
          }
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Profile</h2>
        <label className={styles.label} htmlFor="username">
          Username
          <input
            id="username"
            className={styles.input}
            type="text"
            style={errors.userName && { borderColor: ' #F5222D' }}
            {...register('username', {
              required: 'Enter username',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to be at maximum 20 characters.',
              },
            })}
          />
          {errors.username && (
            <span className={styles.error}>{`${errors.username.message}`}</span>
          )}
        </label>
        <label className={styles.label} htmlFor="email">
          Email address
          <input
            id="email"
            className={styles.input}
            type="text"
            style={errors.email && { borderColor: ' #F5222D' }}
            {...register('email', {
              required: 'Enter email',
              minLength: {
                value: 6,
                message: 'Your email needs to be at least 6 characters.',
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{`${errors.email.message}`}</span>
          )}
        </label>
        <label className={styles.label} htmlFor="password">
          New password
          <input
            id="password"
            className={styles.input}
            type="password"
            style={errors.password && { borderColor: ' #F5222D' }}
            {...register('password', {
              required: 'Enter valid password',
              minLength: {
                value: 8,
                message: 'Your password needs to be at least 8 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be at maximum 40 characters.',
              },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{`${errors.password.message}`}</span>
          )}
        </label>
        <label className={styles.label} htmlFor="image">
          Avatar image (url)
          <input
            id="image"
            className={styles.input}
            type="text"
            style={errors.image && { borderColor: ' #F5222D' }}
            {...register('image', {
              required: 'Enter valid url',
              minLength: {
                value: 6,
                message: 'Your url needs to be at least 8 characters.',
              },
              maxLength: {
                value: 120,
                message: 'Your url needs to be at maximum 40 characters.',
              },
            })}
          />
          {errors.image && (
            <span className={styles.error}>{`${errors.image.message}`}</span>
          )}
        </label>
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default Profile
