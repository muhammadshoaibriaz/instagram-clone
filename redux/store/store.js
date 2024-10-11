import { createStore } from "redux";
import { Reducer } from "../reducer/reducer";
export const myStore = createStore(Reducer);
