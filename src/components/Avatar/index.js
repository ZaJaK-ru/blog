/* eslint-disable no-param-reassign */
import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import styles from './Avatar.module.scss'

import noimage from './noimage.svg'

const imageOnError = (event) => {
  event.currentTarget.src = noimage
}

function Avatar({ user, createdAt }) {
  return (
    <div className={styles.avatar}>
      <div className={styles.avatar__info}>
        <div className={styles.avatar__name}>{user.username}</div>
        {createdAt && (
          <div className={styles.avatar__date}>
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </div>
        )}
      </div>
      <img
        className={styles.avatar__img}
        src={user.image || noimage}
        alt={user.username}
        onError={imageOnError}
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
