/* eslint-disable default-param-last */
import { LOGIN_USER, LOGOUT_USER } from './constants'

const initialState = {
  isAuth: localStorage.getItem('isAuth') === 'true' || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
}

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return { ...state, isAuth: true, user: payload }
    case LOGOUT_USER:
      return { ...state, isAuth: false, user: null }
    default:
      return state
  }
}
export default AuthReducer
