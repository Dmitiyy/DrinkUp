import {Link} from 'react-router-dom';
import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { Nav } from "../components/Nav"
import { ReactComponent as Like } from "../assets/images/like.svg";
import { Footer } from "../components/Footer";
import { useGetUser } from "../hooks/useGetUser";
import { UnRegisterModal } from "../components/UnRegisterModal";
import { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import {ReactComponent as Loading} from '../assets/images/loading.svg';
import { TCocktail } from "../components/Cocktails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { setDataDefault } from "../redux/reducer";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Favourite Cocktails', link: '/user/liked', id: 2},
] as TCrumbs;

export const Liked = () => {
  const [currentUser, isLogIn] = useGetUser();
  const [response, loading, error, getResults] = useHttp({type: 'POST'});
  const dispatch = useDispatch<AppDispatch>();
  const [delLoading, setDelLoading] = useState<Boolean>(false);
  const [data, setData] = useState([]);

  useEffect(() => {getResults('user/liked', currentUser)}, []);
  useEffect(() => {
    if (response) {setData(response)};
  }, [response]);

  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={2} />
      <div className='liked'>
        <h2>Favourite Cocktails</h2>
        {
          isLogIn ? (
            <>
              {
                loading ? (
                  <div className='liked-loading-center'>
                    <Loading className='cocktails-loading' style={{marginTop: '40px'}} />
                  </div>
                ) : response ? (
                  <div className='liked__wrap'>
                    {
                      data.map((item: TCocktail) => {
                        return (
                          <div key={item.id} className='liked__wrap-item'
                          style={{background: `url(${item.img})`}} onClick={() => {
                            dispatch(setDataDefault({ini: 'selectedCocktail', data: item}));
                          }}>
                            <div className='liked__item-wrap'>
                              <div>
                                <div className='liked-circle' onClick={() => {
                                  try {
                                    setDelLoading(true);
                                    fetch('https://www.drinkup.somee.com/user/liked', {
                                      method: 'DELETE',
                                      headers: {'Content-Type': 'application/json'},
                                      body: JSON.stringify({...currentUser, cocktail: {...item}})
                                    })
                                    setDelLoading(false);
                                    const newData = data.filter((elem: TCocktail) => {
                                      return elem.id !== item.id;
                                    });
                                    setData(newData);
                                  } catch (err) {setDelLoading(false)}
                                }}>
                                  <Like />
                                </div>
                              </div>
                              <Link to='/community/cocktail'>
                                <h3>{item.name}</h3>
                              </Link>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : null
              }
            </>
          ) : (
            <>
              <div className='center-login profile__wrap'></div>
              <UnRegisterModal /> 
            </>
          )
        }
      </div>
      <Footer />
    </>
  )
}