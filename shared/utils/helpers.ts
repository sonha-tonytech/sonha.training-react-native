import {
  CREATE_NEW,
  LOADING,
  MODAL,
  REMOVE_ONE,
  UPDATE_ONE,
} from '../../sclice/crudSclice';
import {AppDispatch} from '../../store';
import {ItemData} from '../type/data';

const createQuote = (dispatch: AppDispatch, data: ItemData) => {
  dispatch(LOADING(true));
  dispatch(CREATE_NEW(data));
  setTimeout(() => {
    dispatch(LOADING(false));
    dispatch(MODAL(false));
  }, 1000);
};
const updateQuote = (dispatch: AppDispatch, data: ItemData) => {
  dispatch(LOADING(true));
  dispatch(UPDATE_ONE(data));
  setTimeout(() => {
    dispatch(LOADING(false));
    dispatch(MODAL(false));
  }, 1000);
};
const deleteQuote = (dispatch: AppDispatch, id: string) => {
  dispatch(REMOVE_ONE(id));
};
const handleShowModal = (dispatch: AppDispatch, isShow: boolean) => {
  dispatch(MODAL(isShow));
};

export {handleShowModal, createQuote, updateQuote, deleteQuote};
