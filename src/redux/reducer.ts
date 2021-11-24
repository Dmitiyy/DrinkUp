import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TCocktail } from '../components/Cocktails';

interface IState {
  isSignIn: Boolean;
  selectedCocktail: TCocktail;
  isCommunity: Boolean;
}

interface IDefaultPayload {
  data: any;
  ini: string;
}

const initialState = {
  isSignIn: false,
  isCommunity: false,
  selectedCocktail: {
    alcoholic: false,
    carbs: 0,
    description: '',
    fats: 0,
    glassType: '',
    id: 0,
    img: '',
    ingredients: [],
    name: '',
    proteins: 0,
    recipe: ''
  },
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