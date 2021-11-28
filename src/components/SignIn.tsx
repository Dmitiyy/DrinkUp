import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import { useCookies } from 'react-cookie';
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Eclose } from "../assets/images/eclose.svg";
import { useHttp } from "../hooks/useHttp";

export const SignIn = () => {
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
    if (emailValue.length !== 0 && passwordValue.length !== 0) {
      setFDis(false);
    } else {setFDis(true)};
  }, [emailValue, passwordValue]);

  return (
    <div className='signUp'>
      <label htmlFor="email">E-mail</label>
      <input type="email" id='email' placeholder='E-mail'
      className={emailError ? 'input-error' : ''}
      onChange={(e) => {
        setEmailValue(e.target.value);
      }} />
      <label htmlFor="password">Password</label>
      <div className={passwordError ? 'input-error-p' : ''}>
        <input type={passwordType ? 'text' : 'password'} id='password' 
        placeholder='Password'
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
      <button className={disLoad || fDis ? 'btn-loading' : ''} onClick={async () => {
        const formData = {
          login: emailValue,
          password: passwordValue
        };

        if (!validate(formData.login)) {setEmailError(true)} 
        else {setEmailError(false)};
        if (formData.password.length < 8) {setPasswordError(true)}
        else {setPasswordError(false)};

        if (validate(formData.login) && formData.password.length >= 8) {
          setDisLoad(true);
          await getResults('identity/signin', formData);
          setDisLoad(false);
        }
      }}>{disLoad ? 'LOADING' : 'LOG IN'}</button>
      {error ? (<p className='log-error'>Error, try again</p>) : null}
    </div>
  )
}