import Axios, { AxiosInstance } from 'axios';

export const Api: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
