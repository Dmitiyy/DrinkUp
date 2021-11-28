import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validate } from 'email-validator';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Password } from "../assets/images/password.svg";
import { AppDispatch } from "../redux";
import { setDataDefault } from "../redux/reducer";
import { useHttp } from "../hooks/useHttp";
import { ReactComponent as Eclose } from "../assets/images/eclose.svg";

export const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [policy, setPolicy] = useState(false);
  const [passwordType, setPasswordType] = useState<Boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordError, setPasswordError] = useState<Boolean>(false);
  const [emailError, setEmailError] = useState<Boolean>(false);
  const [response, loading, error, getResults] = useHttp({type: 'POST'});
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [disLoad, setDisLoad] = useState<Boolean>(false);
  const [fDis, setFDis] = useState<Boolean>(true);

  useEffect(() => {
    if (response) {
      setCookie('user', JSON.stringify(response), {
        maxAge: (60 * 60 * 24) * 5
      });
      navigate('/');
      document.body.style.overflow = '';
    }
  }, [response]);

  useEffect(() => {
    if (emailValue.length !== 0 && passwordValue.length !== 0 && policy) {
      setFDis(false);
    } else {setFDis(true)};
  }, [emailValue, passwordValue, policy]);

  return (
    <div className='signUp'>
      <label htmlFor="email">E-mail</label>
      <input type="email" id='email' placeholder='E-mail' 
      className={emailError ? 'input-error' : ''}
      onChange={(e) => {
        setEmailValue(e.target.value);
      }} />
      {emailError ? (<p className='reg-error'>Please, enter a valid email</p>) : null}
      <label htmlFor="password">Password</label>
      <div className={passwordError ? 'input-error-p' : ''}>
        <input type={passwordType ? 'text' : 'password'} 
        id='password' placeholder='Password' 
        onChange={(e) => {
          setPasswordValue(e.target.value);
        }} />
        <div>
          {
            passwordType ? (
              <Eclose className='eclose' onClick={() => {setPasswordType(!passwordType)}} />
            ) : (
              <Password className='eclose' onClick={() => {setPasswordType(!passwordType)}} />
            )
          }
        </div>
      </div>
      {passwordError ? (<p className='reg-error'>Password must contain more than 8 symbols, and at least one capital letter, special character</p>) : null}
      <button className={disLoad || fDis ? 'btn-loading' : ''} onClick={async () => {
        const formData = {
          login: emailValue,
          password: passwordValue
        };

        if (!validate(formData.login)) {setEmailError(true)} 
        else {setEmailError(false)};
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (formData.password.length < 8 || !format.test(formData.password) ||
        !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password)
        || !/\d/.test(formData.password)) {setPasswordError(true)}
        else {setPasswordError(false)};

        if (validate(formData.login) && formData.password.length >= 8 && /[A-Z]/.test(formData.password) 
        && format.test(formData.password) && /[a-z]/.test(formData.password) && /\d/.test(formData.password)
        && policy && !fDis) {
          setDisLoad(true);
          await getResults('identity/signup', formData);
          setDisLoad(false);
        }
      }}>{disLoad ? 'LOADING' : 'SIGN UP'}</button>
      {error ? (<p className='log-error'>User with current email is already registered</p>) : null}
      <div className='signUp__policy'>
        <div className='checkbox' onClick={() => setPolicy(!policy)}>
          {policy ? (<p>✔</p>) : null}
        </div>
        <p>By signing up you agree to <span>TOU and Privacy Policy</span></p>
      </div>
      <div className='signUp__text'>
        <p>Already have an account?</p>
        <p onClick={() => {
          dispatch(setDataDefault({ini: 'isSignIn', data: true}));
        }}>Sign in</p>
      </div>
    </div>
  )
}