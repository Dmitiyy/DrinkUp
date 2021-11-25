import { useState } from "react"
import axios from 'axios';

interface IProps {type: string};

export const useHttp = ({type}: IProps) => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const baseUrl: string = 'https://www.drinkup.somee.com';
  
  let isMounted = true;
  
  const getResults = async (url: string, data: any) => {
    const generatedUrl = `${baseUrl}/${url}`;
    try {
      setLoading(true);
      setError(false);

      if (type === 'GET') {
        const result = await axios.get(generatedUrl, data);
        
        if(isMounted ){
          setResponse(result.data);
        }
      } else if (type === 'POST') {
        const result = await axios.post(generatedUrl, data);
        setResponse(result.data);
      }
      
      setLoading(false);
      setError(false);
      return () => {
        isMounted = false;
      };
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  return [response, loading, error, getResults];
}