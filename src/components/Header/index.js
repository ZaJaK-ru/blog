import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions'
import Avatar from '../Avatar'
import styles from './Header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.isAuth)
  const user = useSelector((state) => state.user)

  const avatar = user ? <Avatar user={user} /> : null

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.header__logo}>
        Realworld Blog
      </Link>
      {isAuth ? (
        <div className={styles.menu}>
          <Link to="/new-article">
            <button
              className={`${styles.btn} ${styles.btn__create}`}
              type="button"
            >
              Create article
            </button>
          </Link>
          <Link to="/profile">{avatar}</Link>
          <button
            className={`${styles.btn} ${styles.btn__logout}`}
            type="button"
            onClick={() => {
              dispatch(logout())
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.menu}>
          <Link to="/sign-in">
            <button className={styles.btn} type="button">
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button
              className={`${styles.btn} ${styles.btn__signup}`}
              type="button"
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
