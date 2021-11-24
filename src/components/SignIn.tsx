import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import { useCookies } from 'react-cookie';
import { ReactComponent as Password } from "../assets/images/password.svg";
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

  useEffect(() => {
    if (response) {
      setCookie('user', JSON.stringify(response), {
        maxAge: (60 * 60 * 24) * 5
      });
      navigate('/');
      document.body.style.overflow = '';
    }
  }, [response]);

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
          <Password onClick={() => {setPasswordType(!passwordType)}} />
        </div>
      </div>
      <button className={loading ? 'btn-loading' : ''} onClick={() => {
        const formData = {
          login: emailValue,
          password: passwordValue
        };

        if (!validate(formData.login)) {setEmailError(true)} 
        else {setEmailError(false)};
        if (formData.password.length < 8) {setPasswordError(true)}
        else {setPasswordError(false)};

        if (validate(formData.login) && formData.password.length > 8) {
          getResults('identity/signin', formData);
        }
      }}>{loading ? 'LOADING' : 'LOG IN'}</button>
      {error ? (<p className='log-error'>Error, try again</p>) : null}
    </div>
  )
}