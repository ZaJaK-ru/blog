import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.scss'

import noimage from './noimage.svg'

function Avatar({ user, createdAt }) {
  return (
    <div className={styles.avatar}>
      <div className={styles.avatar__info}>
        <div className={styles.avatar__name}>{user.username}</div>
        {createdAt && <div className={styles.avatar__date}>02 Jan 2023</div>}
      </div>
      <img
        className={styles.avatar__img}
        src={user.image || noimage}
        alt={user.username}
      />
    </div>
  )
}

export default Avatar

Avatar.defaultProps = {
  createdAt: '',
}

Avatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }).isRequired,
  createdAt: PropTypes.string,
}
