import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux";
import { setDataDefault } from "../redux/reducer";
import { RegistrationModal } from "./RegistrationModal";

export const Footer = () => {
  const reg = useAppSelector(state => state.user.openRegistration);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className='home__footer'>
        <div className='home__footer-wrap'>
          <p>Already have an account?</p>
          <p onClick={() => {
            dispatch(setDataDefault({ini: 'openRegistration', data: true}))
          }}>Sign in</p>
        </div>
        <div className='home__footer-wrap'>
          <p>Privacy</p>
          <p>Terms of Use</p>
          <p>Coockies</p>
        </div>
      </div>
      {reg ? <RegistrationModal /> : null}
    </>
  )
}