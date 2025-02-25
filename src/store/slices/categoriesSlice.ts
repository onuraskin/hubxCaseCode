import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Image {
  url: string;
}

interface Category {
  id: number;
  title: string;
  name: string;
  rank: number;
  image: Image;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      // rank'e göre sıralama
      state.categories = action.payload.sort((a, b) => a.rank - b.rank);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setCategories, setLoading} = categoriesSlice.actions;
export default categoriesSlice.reducer; 