import { createSlice } from '@reduxjs/toolkit'

interface IState {
  name: string
}

const initialState = {name: 'Dmitry'} as IState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hello(state) {
      console.log(state.name);
    }
  }
})

export const {hello} = userSlice.actions;
export default userSlice.reducer;