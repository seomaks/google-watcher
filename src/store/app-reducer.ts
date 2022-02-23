import {Dispatch} from "redux";
import {EntriesType, searchAPI} from "../api/api";

const initialState = {
  status: 'idle' as RequestStatusType,
  entries: [] as Array<EntriesType>,
  country: ''
}

export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-STATUS':
      return { ...state, status: action.status }
    case 'app/SET-DATA':
      return { ...state, entries: action.entries }
    default:
      return state
  }
}

// actions
export const isStatusAC = (status: RequestStatusType) =>
  ({type: 'app/SET-STATUS', status} as const)

export const isResponseAC = (entries: Array<EntriesType>) =>
  ({type: 'app/SET-DATA', entries} as const)

// thunks
export const searchTC = (request: string, location: string, userAgent: string) => (dispatch: Dispatch) => {
  dispatch(isStatusAC('loading'))
  searchAPI.getRequest(request, location, userAgent)
    .then((res) => {
      dispatch(isResponseAC(res))
      dispatch(isStatusAC('succeeded'))
    })
}

// types
export type InitialStateType = typeof initialState
type isResponseActionType = ReturnType<typeof isResponseAC>
type isStatusActionType = ReturnType<typeof isStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = isResponseActionType | isStatusActionType
