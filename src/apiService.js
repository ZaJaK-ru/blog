/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import axios from './axios'

export const getArticles = async (limit, offset, config) => {
  const res = await axios.get(
    `articles?limit=${limit}&offset=${offset}`,
    config
  )

  return res
}

export const getArticle = async (slug, config) => {
  const res = await axios.get(`articles/${slug}`, config)

  return res
}

export const newArticle = async (data, config) => {
  const res = await axios.post('/articles', { article: data }, config)

  return res
}

export const updateArticle = async (slug, data, config) => {
  const res = axios.put(`/articles/${slug}`, { article: data }, config)

  return res
}

export const favoriteArticle = async (slug, favorite, config) => {
  const res = favorite
    ? await axios.delete(`/articles/${slug}/favorite`, config)
    : await axios.post(`/articles/${slug}/favorite`, {}, config)

  return res
}

export const deleteArticle = async (slug, config) => {
  const res = await axios.delete(`/articles/${slug}`, config)

  return res
}

export const signIn = async (data) => {
  const res = axios.post('/users/login', { user: data })

  return res
}

export const signUp = async (data) => {
  const res = axios.post('/users', { user: data })

  return res
}

export const updateUser = async (data, config) => {
  const res = axios.put('/user', { user: data }, config)

  return res
}
