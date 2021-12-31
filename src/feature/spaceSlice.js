import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async () => { 
    return fetch(
      `https://api.spacexdata.com/v3/launches`
    ).then((res) => res.json())
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: null,
  },
  reducers:{
    filterByMissionName: (state, action) => {
      state.list = state.list.filter((item)=> item.mission_name.toLowerCase().includes(action.payload));
     },
    filterByLaunchYear: (state, action) => {
     state.list = state.list.filter((item)=> item.launch_year.includes(action.payload));
    },
    filterByStatus:(state, action) =>{
        state.list = state.list.filter((item)=> item.launch_success===action.payload);
    },
    filterByLastLaunchYear:(state, action) =>{
      const todayDate = new Date()
      const startDayOfPrevYear = moment(todayDate).subtract(action.payload, 'year').startOf('year').format('LLLL')
      const lastDayOfPrevYear = moment(todayDate).subtract(action.payload, 'year').endOf('year').format('LLLL')
      state.list = state.list.filter((item)=> {return moment(item.launch_date_local).isBetween(startDayOfPrevYear, lastDayOfPrevYear)} );
  },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.list = payload
      state.status = 'success'
    },
    [getPosts.rejected]: (state, action) => {
      state.status = 'failed'
    },
  },
})

export const { filterByLaunchYear,filterByStatus, filterByLastLaunchYear, filterByMissionName } = postsSlice.actions

export default postsSlice.reducer
