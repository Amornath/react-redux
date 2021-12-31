import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "../feature/spaceSlice";


export default configureStore({
  reducer: {
    posts: postsReducer
  },
})
