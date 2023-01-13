/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './Profile.module.scss'
import { updateUser } from '../../apiService'
import { login } from '../../redux/actions'
import * as e from '../../errors'
import * as routes from '../../routes'

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

    try {
      const res = await updateUser(data, config)
      dispatch(login(res.data?.user))
      navigate(routes.rootPath)
    } catch (err) {
      if (err.response) {
        const serverErrors = err.response.data.errors
        if (serverErrors.username) setError('username', e.server.username)
        if (serverErrors.email) setError('email', e.server.email)
        if (serverErrors.password) setError('password', e.server.password)
        if (serverErrors.image) setError('image', e.server.image)
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Profile</h2>
        <label className={styles.label} htmlFor="username">
          Username
          <input
            id="username"
            className={`${styles.input} ${
              errors.username && styles.errorborder
            }`}
            type="text"
            {...register('username', e.client.username)}
          />
          {errors.username && (
            <span className={styles.error}>{`${errors.username.message}`}</span>
          )}
        </label>
        <label className={styles.label} htmlFor="email">
          Email address
          <input
            id="email"
            className={`${styles.input} ${errors.email && styles.errorborder}`}
            type="text"
            {...register('email', e.client.email)}
          />
          {errors.email && (
            <span className={styles.error}>{`${errors.email.message}`}</span>
          )}
        </label>
        <label className={styles.label} htmlFor="password">
          New password
          <input
            id="password"
            className={`${styles.input} ${
              errors.password && styles.errorborder
            }`}
            type="password"
            {...register('password', e.client.password)}
          />
          {errors.password && (
            <span className={styles.error}>{`${errors.password.message}`}</span>
          )}
        </label>
        <label className={styles.label} htmlFor="image">
          Avatar image (url)
          <input
            id="image"
            className={`${styles.input} ${errors.image && styles.errorborder}`}
            type="text"
            {...register('image', e.client.image)}
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
