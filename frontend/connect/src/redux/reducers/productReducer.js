import { ActionTypes } from "../contants/action-type";
const initialState = {
    products:[
        {
           id:1,
           title:"aman gupta",
           category:"programmer",
        }
    ],
};
export function productReducer(state=initialState,{type,payload}){
   switch(type){
       case ActionTypes.SET_PRODUCTS:
           return state;
       default:
           return state;            
        } 
};