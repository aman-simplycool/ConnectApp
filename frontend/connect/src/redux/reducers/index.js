import {combineReducers}from "redux"
import { productReducer } from "./productReducer";
export const rootReducers=combineReducers({
  product:productReducer,  
});
