import {Dispatch} from "redux";
import {EntriesType, searchAPI} from "../api/api";

const initialState = {
  entries: [] as Array<EntriesType>
}

export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-DATA':
      return { ...state, entries: action.entries }
    default:
      return state
  }
}

// actions
export const isResponseAC = (entries: Array<EntriesType>) =>
  ({type: 'app/SET-DATA', entries} as const)

// thunks
export const searchTC = (request: string, location: string) => (dispatch: Dispatch) => {
  searchAPI.getRequest(request, location)
    .then((res) => {
      dispatch(isResponseAC(res))
      console.log(res)
    })
}

// types
export type InitialStateType = typeof initialState
type isResponseActionType = ReturnType<typeof isResponseAC>
type ActionsType = isResponseActionType

