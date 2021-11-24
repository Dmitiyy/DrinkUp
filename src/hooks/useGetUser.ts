import { useCookies } from "react-cookie";

export const useGetUser = () => {
  const [cookies] = useCookies(['user']); 
  const currentUser = cookies.user ? cookies.user : false;
  
  const isLogIn = cookies.user && cookies.user.length !== 0 ? true : false;
  return [currentUser, isLogIn];
}