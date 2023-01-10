/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../../redux/actions'
import axios from '../../axios'

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

  const onSubmit = (data) => {
    axios
      .post('/users/login', { user: data })
      .then((res) => {
        dispatch(login(res.data?.user))
        navigate('/')
      })
      .catch((err) => {
        if (err.response) {
          setError('password', {
            type: 'server',
            message: 'Email or password invalid',
          })
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
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
          Password
          <input
            id="password"
            className={styles.input}
            type="password"
            style={errors.password && { borderColor: ' #F5222D' }}
            {...register('password', {
              required: 'Enter password',
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
