import { createStore } from 'redux'
import AuthReducer from './reducer'

const store = createStore(AuthReducer)

export default store
