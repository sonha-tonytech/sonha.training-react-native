import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import {ItemData} from '../shared/type/data';
import {User} from '../shared/type/user';
const CREATE_NEW: ActionCreatorWithPayload<ItemData> = createAction('add-new');
const MODAL: ActionCreatorWithPayload<boolean> = createAction('modal');
const LOADING: ActionCreatorWithPayload<boolean> = createAction('load');
const LOGIN: ActionCreatorWithPayload<boolean> = createAction('login');
const REMOVE_ONE: ActionCreatorWithPayload<string> = createAction('remove-one');
const UPDATE_ONE: ActionCreatorWithPayload<ItemData> =
  createAction('update-one');
const GET_DATA: ActionCreatorWithPayload<ItemData[]> = createAction('get-data');
const USER: ActionCreatorWithPayload<User | null> = createAction('user');

type InitialStateType = {
  modalOpen: boolean;
  loading: boolean;
  isLogin: boolean;
  list: ItemData[];
  user: User | null;
};

const initialState: InitialStateType = {
  modalOpen: false,
  loading: false,
  isLogin: false,
  list: [],
  user: null,
};
// Create new
const Quote = createReducer(initialState, builder => {
  builder.addCase(CREATE_NEW, (state, action) => {
    let prev = JSON.parse(JSON.stringify(state.list)) as ItemData[];
    prev.unshift({
      ...action.payload,
      body: {
        ...action.payload.body,
        updateAt: new Date(action.payload.body.updateAt).toISOString(),
      },
    });
    return {
      ...state,
      list: prev,
    };
  });

  //get many

  builder.addCase(GET_DATA, (state, action) => {
    return {
      ...state,
      list: action.payload,
    };
  });

  // Update one

  builder.addCase(UPDATE_ONE, (state, action) => {
    let prev = JSON.parse(JSON.stringify(state.list)) as ItemData[];
    const index = prev.findIndex(obj => obj.id === action.payload.id);
    if (index !== -1) {
      prev[index] = {
        ...action.payload,
        body: {
          ...action.payload.body,
          updateAt: new Date(action.payload.body.updateAt).toISOString(),
        },
      };
    }
    return {
      ...state,
      list: prev,
    };
  });

  // Delete one

  builder.addCase(REMOVE_ONE, (state, action) => {
    let prev = JSON.parse(JSON.stringify(state.list)) as ItemData[];
    const index = prev.findIndex(obj => obj.id === action?.payload);
    if (index !== -1) {
      prev.splice(index, 1);
    }
    return {
      ...state,
      list: prev,
    };
  });

  builder.addCase(MODAL, (state, action) => {
    return {
      ...state,
      modalOpen: action.payload,
    };
  });

  builder.addCase(LOADING, (state, action) => {
    return {
      ...state,
      loading: action.payload,
    };
  });

  builder.addCase(LOGIN, (state, action) => {
    return {
      ...state,
      isLogin: action.payload,
    };
  });

  builder.addCase(USER, (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  });
});

export default Quote;

export {
  CREATE_NEW,
  MODAL,
  LOADING,
  REMOVE_ONE,
  UPDATE_ONE,
  GET_DATA,
  LOGIN,
  USER,
};
