import {Link} from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Search from '../assets/images/search.svg';
import Heart from '../assets/images/heart.svg';
import User from '../assets/images/user.svg';

export const Nav = () => {
  return (
    <div className='home__nav'>
      <div className='home__nav-wrap'>
        <img src={Logo} alt="logo" className='home__nav-logo' />
        <div className='home__nav-search'>
          <input type="text" placeholder='Search' />
          <div><img src={Search} alt='search' /></div>
        </div>
        <ul>
          <Link to='/user/personal'>
            <li>Personal Cocktails</li>
          </Link>
          <Link to='/community'>
            <li>Community</li>
          </Link>
        </ul>
        <div className='home__nav-icons'>
          <Link to='/user/liked'>
            <img src={Heart} alt='heart' />
          </Link>
          <Link to='/user'>
            <img src={User} alt='user' />
          </Link>
        </div>
      </div>
    </div>
  )
}