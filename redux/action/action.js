import { ADD_ITEM, REMOVE_ITEM } from "../actionTypes";
export const addItem = (data) => {
  return { type: ADD_ITEM, payload: data };
};
export const removeItem = (index) => {
  return { type: REMOVE_ITEM, payload: index };
};
