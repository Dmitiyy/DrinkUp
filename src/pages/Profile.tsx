import { useEffect, useState } from "react";
import { validate } from 'email-validator';
import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { Nav } from "../components/Nav";
import { ReactComponent as Edit } from "../assets/images/edit.svg";
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Logout } from "../assets/images/logout.svg";
import { Footer } from "../components/Footer";
import { useGetUser } from "../hooks/useGetUser";
import { UnRegisterModal } from "../components/UnRegisterModal";
import { useHttp } from "../hooks/useHttp";
import {ReactComponent as Loading} from '../assets/images/loading.svg';
import axios from "axios";
import { useCookies } from "react-cookie";
import {ReactComponent as ModalUpdated} from '../assets/images/updated.svg';
import {ReactComponent as Close} from '../assets/images/close.svg';
import { ReactComponent as Eclose } from "../assets/images/eclose.svg";
import { useNavigate } from "react-router";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Profile', link: '/user', id: 2},
] as TCrumbs;

export const Profile = () => {
  const [bioLength, setBioLength] = useState<number>(0);
  const [currentUser, isLogIn] = useGetUser();
  const [method, setMethod] = useState<string>('POST');
  const [response, loading, error, getResults] = useHttp({type: method});
  const [editNick, setEditNick] = useState<Boolean>(true);
  const [bio, setBio] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordType, setPasswordType] = useState<Boolean>(false);
  const [passwordCType, setPasswordCType] = useState<Boolean>(false);
  const [passwordC, setPasswordC] = useState<string>('');
  const [cookies, setC, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const [disSave, setDisSave] = useState<Boolean>(false);
  const [edited, setEdited] = useState<Boolean>(false);
  const [nameError, setNameError] = useState<Boolean>(false);
  const [bioError, setBioError] = useState<Boolean>(false);
  const [emailError, setEmailError] = useState<Boolean>(false);
  const [passwordError, setPasswordError] = useState<Boolean>(false);
  const [passwordCError, setPasswordCError] = useState<Boolean>(false);
  const [putLoading, setPutLoading] = useState<Boolean>(false);
  const [putError, setPutError] = useState<Boolean>(false);
  const [successful, setSuccessful] = useState<Boolean>(true);
  const [updated, setUpdated] = useState<Boolean>(false);

  const generateBioLength = (): void => {setBioLength(bio.length)};
  useEffect(() => {generateBioLength()}, [bio]);
  useEffect(() => {
    if (isLogIn) {
      const fetch = async () => {
        setMethod('POST');
        await getResults('user', currentUser)
      }
      fetch();
    };
  }, []);
  useEffect(() => {
    if (updated) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else if (!updated && isLogIn) {
      document.body.style.overflow = '';
    }
  }, [updated]);
  useEffect(() => {
    if (
      ((name.length !== 0 && name.length <= 30) ||
      bio.length <= 250 || validate(email) || (password.length !== 0 && passwordC.length !== 0))
      && edited
    ) {
      setDisSave(true);
    } else {setDisSave(false)};
  }, [name, bio, email, password, passwordC, edited]);
  useEffect(() => {
    if ((name.length === 0  || name.length > 30) && edited) {setNameError(true)}
    else {setNameError(false)};

    if (password.length === 0 && edited) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if ((bio.length > 250) && edited) {setBioError(true)}
    else {setBioError(false)}

    if (!validate(email) && edited) {setEmailError(true)}
    else {
      setEmailError(false);
    }
  }, [name, bio, password, edited]);

  const checkIsResponseExists = (name: string, func: Function) => {
    if (response) {func(response[name])};
  }

  useEffect(() => {checkIsResponseExists('bio', setBio)}, [response]);
  useEffect(() => {checkIsResponseExists('nickname', setName)}, [response]);
  useEffect(() => {checkIsResponseExists('email', setEmail)}, [response]);
  useEffect(() => {
    if (password.length >= 8) {setSuccessful(false)} 
    else {setSuccessful(true)}
  }, [password])
  
  return (
    <>
      <Nav community={false} />
      <BreadCrumbs data={crumbs} active={2} />
      <div className='profile'>
        <h2>Profile</h2>
        <div className={!isLogIn ? 'center-login profile__wrap' : 'profile__wrap'}>
          {
            isLogIn ? (
              <>
                {
                  loading ? (
                    <Loading className='cocktails-loading' style={{marginTop: '40px'}} />
                  ) : error ? (
                    <h3 className='cocktails-not-found'>Error, try again later</h3>
                  ) : (
                    <>
                      <form>
                        <div className='profile__wrap-name'>
                          <input type="text" placeholder='Your name' 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={editNick ? 'profile__nick-active' : ''}
                          readOnly={editNick ? true : false} />
                          <Edit onClick={() => {
                            setEditNick(!editNick)
                            setEdited(true);
                          }} />
                        </div>
                        {nameError ? (<p className='reg-error'>Your name must be no more than 30 characters</p>) : null}
                        <label htmlFor="bio">Bio</label>
                        <textarea id="bio" placeholder='Brief description'
                        value={bio} className={bioError ? 'input-error' : ''}
                        readOnly={editNick ? true : false}
                        onChange={(e) => setBio(e.target.value)} />
                        <div className='profile__bio'>
                          <p>{bioLength}/250</p>
                        </div>
                        {bioError ? (<p className='reg-error'>
                          Bio must not contain more than 250 characters
                        </p>) : null}
                        <label htmlFor="email">Your email</label>
                        <input type="email" id='email' value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        readOnly={editNick ? true : false}
                        className={emailError ? 'input-error' : ''} />
                        {emailError ? (<p className='reg-error'>Please, enter a valid email</p>) : null}
                        <label htmlFor="password">Password</label>
                        <div className={passwordError ? 'input-error-p' : ''}>
                          <input type={passwordType ? 'text' : 'password'} id='password' 
                          value={password} readOnly={editNick ? true : false}
                          onChange={(e) => setPassword(e.target.value)} />
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
                        {passwordError ? (<p className='reg-error'>Please, enter your password</p>) : null}
                        {
                          disSave ? (
                            <>
                              <button className={'profile-save'} style={{background: putLoading ? '#AFAFAF' : '#0C2D68'}}
                              onClick={async (event) => {
                                event.preventDefault();
      
                                if (!validate(email)) {setEmailError(true)}
                                else {setEmailError(false)};
      
                                if (password.length === 0) {setPasswordError(true);setPasswordCError(true)}
                                else {setPasswordError(false);setPasswordCError(false)}
      
                                if (bio.length > 250) {setBioError(true)}
                                else {setBioError(false)};

                                if (name.length > 30 || name.length === 0) {
                                  setNameError(true);
                                } else {setNameError(false)};
                                
                                if (validate(email) && password.length !== 0  && name.length <= 30 
                                && name.length !== 0 && bio.length <= 250) {
                                  const formData = {
                                    login: currentUser.login,
                                    password,
                                    nickname: name,
                                    mail: email,
                                    bio
                                  }
                                  try {
                                    setPutLoading(true);
                                    await axios.put('https://www.drinkup.somee.com/user', formData);
                                    setPutLoading(false);
                                    setPutError(false);
                                    setPassword('');
                                    setUpdated(true);
                                    setEdited(false);
                                    setEditNick(true);
                                  } catch (err) {
                                    setPutLoading(false);
                                    setPutError(true);
                                  }
                                }
                              }}>{putLoading ? 'Loading' : 'Save changes'}</button>
                              {putError ? (<p className='log-error'>Error, password mismatch</p>) : null}
                            </>
                          ) : null
                        }
                      </form>
                      {
                        successful ? (
                          <div className='profile-logoutWrap'>
                            <div className='profile-logout' onClick={() => {
                              removeCookie('user');
                              navigate('/');
                            }}>
                              <Logout />
                              <h3>Log out</h3>
                            </div>
                          </div>
                        ) : null
                      }
                    </>
                  )
                }
              </>
            ) : (
              <UnRegisterModal />
            )
          }
        </div>
      </div>
      <Footer />
      {
        updated ? (
          <div className='profile-updated'>
            <div className='profile-updated-modal'>
              <div><Close onClick={() => {
                setUpdated(false);
                document.body.style.overflow = '';
              }} /></div>
              <ModalUpdated />
              <h2>Your data was updated successfully!</h2>
            </div>
          </div>
        ) : null
      }
    </>
  )
}