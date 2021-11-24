import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {ReactComponent as Close} from '../assets/images/close.svg';
import { AppDispatch, useAppSelector } from "../redux";
import { setDataDefault } from "../redux/reducer";
import { Registration } from "./Registration";

export const RegistrationModal = () => {
  const [open, setOpen] = useState<Boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const signIn = useAppSelector(state => state.user.isSignIn);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <div className='regModal' style={{display: open ? 'flex' : 'none'}}>
      <div className='regModal__wrap'>
        <div className='regModal__btn'>
          <div className='regModal__btn-close'><Close onClick={() => {
            setOpen(false);
            dispatch(setDataDefault({ini: 'openRegistration', data: false}));
            document.body.style.overflow = '';
          }} /></div>
        </div>
        <ul className='regModal__links'>
          <li onClick={() => {
            dispatch(setDataDefault({ini: 'isSignIn', data: true}));
          }} className={signIn ? 'regModal-link-active' : ''}>Sign In</li>
          <li onClick={() => {
            dispatch(setDataDefault({ini: 'isSignIn', data: false}));
          }} className={!signIn ? 'regModal-link-active' : ''}>Sign Up</li>
        </ul>
        <div className='regModal__wrap-form'>
          <Registration />
        </div>
      </div>
    </div>
  )
}