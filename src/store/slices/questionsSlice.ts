import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

interface QuestionsState {
  questions: Question[];
  loading: boolean;
}

const initialState: QuestionsState = {
  questions: [],
  loading: false,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setQuestions, setLoading} = questionsSlice.actions;
export default questionsSlice.reducer;
