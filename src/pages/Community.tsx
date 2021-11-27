import { BreadCrumbs, TCrumbs } from '../components/BreadCrumbs';
import { Cocktails } from '../components/Cocktails';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { Registration } from '../components/Registration';
import { UnRegisterModal } from '../components/UnRegisterModal';
import { useGetUser } from '../hooks/useGetUser';

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Blog', link: '/community', id: 2},
] as TCrumbs;

export const Community = () => {
  const [currentUser, isLogIn] = useGetUser();

  return (
    <>
      <div className='community'>
        <Nav community={true} />
        <BreadCrumbs data={crumbs} active={2} />
        {
          !isLogIn ? (
            <>
              <h2 className='auth-community-title'>Community</h2>
              <div className='center-login profile__wrap'></div>
              <UnRegisterModal />
            </>
          ) : (
            <Cocktails name='Community' link='community' community={true} />
          )
        }
        <Footer />
      </div>
    </>
  )
}