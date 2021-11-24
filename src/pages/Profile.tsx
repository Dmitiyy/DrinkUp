import { useEffect, useState } from "react";
import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { Nav } from "../components/Nav";
import { ReactComponent as Edit } from "../assets/images/edit.svg";
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Logout } from "../assets/images/logout.svg";
import { Footer } from "../components/Footer";
import { useGetUser } from "../hooks/useGetUser";
import { Registration } from "../components/Registration";
import { UnRegisterModal } from "../components/UnRegisterModal";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Profile', link: '/user', id: 2},
] as TCrumbs;

export const Profile = () => {
  const [bioLength, setBioLength] = useState<number>(0);
  const [bio, setBio] = useState<string>('');
  const [currentUser, isLogIn] = useGetUser();

  const generateBioLength = (): void => {setBioLength(bio.length)};
  useEffect(() => {generateBioLength()}, [bio]);

  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={2} />
      <div className='profile'>
        <h2>Profile</h2>
        <div className={!isLogIn ? 'center-login profile__wrap' : 'profile__wrap'}>
          {
            isLogIn ? (
              <>
                <form>
                  <div className='profile__wrap-name'>
                    <input type="text" placeholder='Your name' />
                    <Edit />
                  </div>
                  <label htmlFor="bio">Bio</label>
                  <textarea id="bio" placeholder='Brief description' 
                  onChange={(e) => setBio(e.target.value)} />
                  <div className='profile__bio'>
                    <p>{bioLength}/250</p>
                  </div>
                  <label htmlFor="email">Your email</label>
                  <input type="email" id='email' />
                  <label htmlFor="password">Password</label>
                  <div>
                    <input type="text" id='password' />
                    <div>
                      <Password />
                    </div>
                  </div>
                  <label htmlFor="passwordC">Confirm Password</label>
                  <div>
                    <input type="text" id='passwordC' />
                    <div>
                      <Password />
                    </div>
                  </div>
                  <button className='profile-save'>Save changes</button>
                </form>
                <div className='profile-logoutWrap'>
                  <div className='profile-logout'>
                    <Logout />
                    <h3>Log out</h3>
                  </div>
                </div>
              </>
            ) : (
              <UnRegisterModal />
            )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}