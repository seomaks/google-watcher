import {Dispatch} from "redux";
import {EntriesType, searchAPI} from "../api/api";

const initialState = {
  status: 'idle' as RequestStatusType,
  entries: [] as Array<EntriesType>,
  request: '',
  country: 'US',
  userAgent: 'desktop',
  pageSize: 20,
  isMobile: false
}

export const searchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-STATUS':
      return {...state, status: action.status}
    case 'app/SET-DATA':
      return {...state, entries: action.entries}
    case 'app/SET-COUNTRY':
      return {...state, country: action.country}
    case 'app/SET-REQUEST':
      return {...state, request: action.request}
    case 'app/IS-MOBILE':
      return {...state, isMobile: action.isMobile}
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

export const isRequestAC = (request: string) =>
  ({type: 'app/SET-REQUEST', request} as const)

export const isMobileAC = (isMobile: boolean) =>
  ({type: 'app/IS-MOBILE', isMobile} as const)

// thunks
export const searchTC = (request: string, country: string, userAgent: string, pageSize: number, isMobile: boolean) => async (dispatch: Dispatch) => {
  dispatch(isStatusAC('loading'))
  userAgent = isMobile ? 'mobile' : 'desktop'
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
type isRequestActionType = ReturnType<typeof isRequestAC>
type isMobileActionType = ReturnType<typeof isMobileAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType =
  isResponseActionType
  | isStatusActionType
  | isCountryActionType
  | isRequestActionType
  | isMobileActionType
