import {Dispatch} from "redux";
import {EntriesType, searchAPI} from "../api/api";

const initialState = {
  status: 'idle' as RequestStatusType,
  entries: [] as Array<EntriesType>,
  request: '',
  country: 'US',
  userAgent: 'desktop',
  pageSize: 20,
}

export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-STATUS':
      return {...state, status: action.status}
    case 'app/SET-DATA':
      return {...state, entries: action.entries}
    case 'app/SET-COUNTRY':
      return {...state, country: action.country}
    case 'app/SET-USER-AGENT':
      return {...state, userAgent: action.userAgent}
    case 'app/SET-REQUEST':
      return {...state, request: action.request}
    default:
      return state
  }
}

// actions
export const isStatusAC = (status: RequestStatusType) =>
  ({type: 'app/SET-STATUS', status} as const)

export const isResponseAC = (entries: Array<EntriesType>) =>
  ({type: 'app/SET-DATA', entries} as const)

export const isCountryAC = (country: string) =>
  ({type: 'app/SET-COUNTRY', country} as const)

export const isUserAgentAC = (userAgent: string) =>
  ({type: 'app/SET-USER-AGENT', userAgent} as const)

export const isRequestAC = (request: string) =>
  ({type: 'app/SET-REQUEST', request} as const)

// thunks
export const searchTC = (request: string, country: string, userAgent: string, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch(isStatusAC('loading'))
  const res = await searchAPI.getRequest(request, country, userAgent, pageSize)
    .then(result => {
      return result.data.results
    })
    .catch((err) => {
      console.log(err);
    });
  dispatch(isResponseAC(res))
  dispatch(isStatusAC('succeeded'))
}

// types
export type InitialStateType = typeof initialState
type isResponseActionType = ReturnType<typeof isResponseAC>
type isStatusActionType = ReturnType<typeof isStatusAC>
type isCountryActionType = ReturnType<typeof isCountryAC>
type isUserAgentActionType = ReturnType<typeof isUserAgentAC>
type isRequestActionType = ReturnType<typeof isRequestAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType =
  isResponseActionType
  | isStatusActionType
  | isCountryActionType
  | isUserAgentActionType
  | isRequestActionType
