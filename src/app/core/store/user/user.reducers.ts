import { createFeature, createReducer, on } from '@ngrx/store';
import { State } from '../../models/state.model';
import { StoreCollection } from '../../enums/store-collections.enum';
import { UserModel } from '../../models/user.model';
import {
  loginFailure,
  loginSuccess,
  loginUser,
  registerFailure,
  registerSuccess,
  registerUser,
} from './user.actions';

const initialState: State<UserModel> = {
  isLoading: false,
  isLoaded: false,
  data: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, action) => {
    return { ...state, isLoading: true, isLoaded: false };
  }),
  on(loginFailure, (state, action) => {
    return {
      error: action.error,
      data: null,
      isLoading: false,
      isLoaded: true,
    };
  }),
  on(loginSuccess, (state, action) => {
    return {
      data: action.user,
      error: null,
      isLoading: false,
      isLoaded: true,
    };
  }),
  on(registerUser, (state, action) => {
    return { ...state, isLoading: true };
  }),
  on(registerSuccess, (state, action) => {
    return { ...state, isLoading: false };
  }),
  on(registerFailure, (state, action) => {
    return { ...state, error: action.error, isLoading: false };
  })
);

export const userFeature = createFeature({
  name: StoreCollection.USER,
  reducer: userReducer,
});
