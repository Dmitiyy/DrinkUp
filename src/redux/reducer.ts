import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TCocktail } from '../components/Cocktails';

interface IState {
  selectedCocktail: TCocktail;
}

interface IDefaultPayload {
  data: any;
  ini: string;
}

const initialState = {
  selectedCocktail: {}
} as IState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDataDefault(state: any, action: PayloadAction<IDefaultPayload>) {
      state[action.payload.ini] = action.payload.data;
    }
  }
})

export const {setDataDefault} = userSlice.actions;
export default userSlice.reducer;