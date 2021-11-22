import { useState } from "react"
import axios from 'axios';

interface IProps {
  url: string;
  data: any;
  type: string;
}

export const useHttp = ({url, data, type}: IProps) => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const baseUrl: string = 'http://www.drinkup.somee.com';

  const getResults = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await axios.get(`${baseUrl}/${url}`);
      setResponse(result);
      setLoading(false);
      setError(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  return [response, loading, error, getResults];
}