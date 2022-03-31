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
  getRequest(request: string, location: string, userAgent: string, pageSize: number) {
    return instance.get(`${request}&num=${pageSize}`, {headers:{'x-proxy-location': location, 'x-user-agent': userAgent}})
  }
}

export type EntriesType = {
  id: string
  description: string
  link: string
  title: string
}
