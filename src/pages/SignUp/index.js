/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styles from './SignUp.module.scss'
import { signUp } from '../../apiService'
import { login } from '../../redux/actions'
import * as e from '../../errors'
import * as routes from '../../routes'

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await signUp(data)
      dispatch(login(res.data?.user))
      navigate(routes.rootPath)
    } catch (err) {
      if (err.response) {
        const serverErrors = err.response.data.errors
        if (serverErrors.username) setError('username', e.server.username)
        if (serverErrors.email) setError('email', e.server.email)
        if (serverErrors.password) setError('password', e.server.password)
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new account</h2>
        <label className={styles.label} htmlFor="username">
          Username
          <input
            id="username"
            name="username"
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
        <label className={styles.label} htmlFor="password2">
          Repeat password
          <input
            id="password1"
            className={`${styles.input} ${
              errors.password1 && styles.errorborder
            }`}
            type="password"
            {...register('password1', {
              ...e.client.passwordConfirmation,
              validate: (value) =>
                value === watch('password') || 'Passwords dont match.',
            })}
          />
          {errors.password1 && (
            <span className={styles.error}>
              {`${errors.password1.message}`}
            </span>
          )}
        </label>
        <label className={styles.labelcheckbox} htmlFor="checkbox">
          <input
            className={styles.check}
            type="checkbox"
            name="checkbox"
            id="checkbox"
            {...register('checkbox', e.client.checkbox)}
          />
          <div>I agree to the processing of my personal information</div>
        </label>
        {errors.checkbox && (
          <span className={styles.error}>{`${errors.checkbox.message}`}</span>
        )}
        <button className={styles.button} type="submit">
          Create
        </button>
        <div className={styles.info}>
          Already have an account?
          <Link to="/sign-in">Sign In.</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
