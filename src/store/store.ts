import {applyMiddleware, combineReducers, createStore} from "redux";
import {searchReducer} from "./app-reducer";
import thunkMiddleware from "redux-thunk";


let rootReducer = combineReducers({
  app: searchReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;