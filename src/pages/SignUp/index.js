/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styles from './SignUp.module.scss'

import { login } from '../../redux/actions'
import axios from '../../axios'

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
    axios
      .post('/users', { user: data })
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
        }
      })
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
          Password
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
        <label className={styles.label} htmlFor="password2">
          Repeat password
          <input
            id="password1"
            className={styles.input}
            type="password"
            style={errors.password1 && { borderColor: ' #F5222D' }}
            {...register('password1', {
              required: 'Please input your password confirmation.',
              minLength: {
                value: 8,
                message: 'Your password needs to be at least 8 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be at maximum 40 characters.',
              },
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
            {...register('checkbox', {
              required: 'Please accept the terms and conditions to continue',
            })}
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
