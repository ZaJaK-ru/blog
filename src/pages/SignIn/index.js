/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../../redux/actions'
import { signIn } from '../../apiService'
import * as e from '../../errors'
import * as routes from '../../routes'

import styles from './SignIn.module.scss'

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data)
      dispatch(login(res.data?.user))
      navigate(routes.rootPath)
    } catch (err) {
      if (err.response) setError('password', e.server.emailOrPassword)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
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
          Password
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
        <button className={styles.button} type="submit">
          Login
        </button>
        <div className={styles.info}>
          Don’t have an account?
          <Link to="/sign-up">Sign Up.</Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn
