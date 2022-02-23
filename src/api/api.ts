import axios from "axios";

const API_KEY = process.env.REACT_APP_RAPID_API_KEY

const instance = axios.create({
  baseURL: 'https://google-search3.p.rapidapi.com/api/v1/search/q=',
  headers: {
    'x-rapidapi-host': 'google-search3.p.rapidapi.com',
    // @ts-ignore
    'x-rapidapi-key': API_KEY
  }
});

export const searchAPI = {
  getRequest(request: string, location: string, userAgent: string) {
    return instance.get(`${request}`, {headers:{'x-proxy-location': location, 'x-user-agent': userAgent}})
      .then(response => {
        return response.data.results
      })
  }
}

export type EntriesType = {
  id: string
  description: string
  link: string
  title: string
}

// export type ResultType = {
//   result: Array<EntriesType>
// }
