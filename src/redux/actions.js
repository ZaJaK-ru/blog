import { LOGIN_USER, LOGOUT_USER } from './constants'

export const login = (user) => {
  localStorage.setItem('isAuth', true)
  localStorage.setItem('user', JSON.stringify(user))
  return { type: LOGIN_USER, payload: user }
}

export const logout = () => {
  localStorage.setItem('isAuth', false)
  localStorage.removeItem('user')
  return { type: LOGOUT_USER }
}
