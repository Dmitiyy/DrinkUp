import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {ReactComponent as Close} from '../assets/images/close.svg';
import { AppDispatch } from '../redux';
import { setDataDefault } from '../redux/reducer';
import { RegistrationModal } from './RegistrationModal';

export const UnRegisterModal = () => {
  const [open, setOpen] = useState<Boolean>(true);
  const [showReg, setShowReg] = useState<Boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else if (showReg) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      <div className='unreg-modal' style={{display: open ? 'flex' : 'none'}}>
        <div className='unreg-modal-wrap'>
          <div className='unreg-modal-close'><Close onClick={() => {
            setOpen(false);
          }} /></div>
          <h2>This function is only available to registered users. Sign up or sign in for full access!</h2>
          <div className='unreg-modal-btns'>
            <button onClick={() => {
              setShowReg(true);
              setOpen(false);
              dispatch(setDataDefault({ini: 'isSignIn', data: true}));
            }}>Sign in</button>
            <button onClick={() => {
              setShowReg(true);
              setOpen(false);
              dispatch(setDataDefault({ini: 'isSignIn', data: false}));
            }}>SIGN UP</button>
          </div>
        </div>
      </div>
      {showReg ? (<RegistrationModal />) : null}
    </>
  )
}