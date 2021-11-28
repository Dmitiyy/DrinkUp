import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Search from '../assets/images/search.svg';
import Heart from '../assets/images/heart.svg';
import User from '../assets/images/user.svg';
import { useState, useEffect } from 'react';
import {ReactComponent as Close} from '../assets/images/close.svg';
import { useHttp } from '../hooks/useHttp';
import { useGetUser } from '../hooks/useGetUser';
import { TCocktail } from './Cocktails';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux';
import { setDataDefault } from '../redux/reducer';

export const Nav = ({community}: {community: Boolean}) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [response, loading, error, getResults] = useHttp({type: community ? 'POST' : 'GET'});
  const [currentUser, isLogIn] = useGetUser();
  const [filteredData, setFilteredData] = useState<Array<TCocktail>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    const fetch = async () => {
      await getResults(
      community ? 'community' : 'cocktails',
      currentUser
      )
    }
    fetch();
  }, []);

  return (
    <>
      <div className='home__nav'>
        <div className='home__nav-wrap'>
          <img src={Logo} alt="logo" className='home__nav-logo' onClick={() => {
            navigate('/');
          }}  />
          <div className='home__nav-search'>
            <input type="text" placeholder='Search' className={open ? 'serach-active' : ''}
            onFocus={() => {setOpen(true)}} onChange={(event) => {
              setQuery(event.target.value);
              if (!isLogIn && !community && !loading && !error) {
                const filter = response.filter((item: TCocktail) => {
                  return item.name.toLowerCase().includes(event.target.value.toLowerCase());
                });
                setFilteredData(filter);
              } else if (isLogIn && !loading && !error) {
                const filter = response.filter((item: TCocktail) => {
                  return item.name.toLowerCase().includes(event.target.value.toLowerCase());
                });
                setFilteredData(filter);
              }
            }} />
            <div className={open ? 'serach-active-p' : ''}>
              {
                open ? (<Close 
                onClick={() => setOpen(false)} />) : (<img src={Search} 
                onClick={() => setOpen(true)} alt='search' />)
              }
            </div>
            <div className='nav__modal' style={{display: open ? 'block' : 'none'}}
            onClick={() => {setOpen(true)}}>
              <div className='nav__modal-a'>
                {
                  loading ? (<h3>Loading</h3>) :
                  error  ? (<h3>Error, try again</h3>) :
                  filteredData.length === 0 || query.length === 0 ? (<h3>No cocktails found</h3>) : (
                    filteredData.map((item) => {
                      return (
                        <div className='nav__modal-wrap' key={item.id} onClick={() => {
                          dispatch(setDataDefault({ini: 'selectedCocktail', data: item}));
                        }}>
                          <Link to={community ? '/community/cocktail' : '/cocktails/search'}>
                            <div className='nav__modal-item'>
                              <img src={item.img} alt='cocktail' />
                              <div>
                                <h3>{item.name}</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  )
                }
              </div>
            </div>
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
      <div className='nav__search-modal' 
      onClick={() => setOpen(false)}
      style={{display: open ? 'block' : 'none'}}></div>
    </>
  )
}