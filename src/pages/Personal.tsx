import { Link } from "react-router-dom";
import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { Nav } from "../components/Nav"
import { ReactComponent as Bin } from "../assets/images/bin.svg";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { Footer } from "../components/Footer";
import { useGetUser } from "../hooks/useGetUser";
import { UnRegisterModal } from "../components/UnRegisterModal";
import { useHttp } from "../hooks/useHttp";
import {ReactComponent as Loading} from '../assets/images/loading.svg';
import { useEffect, useState } from "react";
import { TCocktail } from "../components/Cocktails";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux";
import { setDataDefault } from "../redux/reducer";
import {ReactComponent as Close} from '../assets/images/close.svg';

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Personal Cocktails', link: '/user/personal', id: 2},
] as TCrumbs;

export const Personal = () => {
  const [currentUser, isLogIn] = useGetUser();
  const [response, loading, error, getResults] = useHttp({type: 'POST'});
  const [data, setData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<Boolean>(false);
  const cocktail = useAppSelector(state => state.user.selectedCocktail);

  useEffect(() => {
    const fetch = async () => {
      await getResults('user/personal', currentUser)
    }
    fetch();
  }, []);
  useEffect(() => {
    if (response) {setData(response)};
  }, [response]);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else if (!open && isLogIn) {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      <Nav community={false} />
      <BreadCrumbs data={crumbs} active={2} />
      <div className='personal'>
          <h2>Personal Cocktails</h2>
          {
            isLogIn ? (
              <>
                {
                  loading ? (
                    <div className='liked-loading-center'>
                      <Loading className='cocktails-loading' style={{marginTop: '40px'}} />
                    </div>
                  ) : (
                    <div className='personal__wrap'>
                      {
                        data.map((item: TCocktail) => {
                          return (
                            <div key={item.id} 
                            style={{background: `url(${item.img})`}} className='personal__wrap-item'
                            onClick={() => {
                              dispatch(setDataDefault({ini: 'selectedCocktail', data: item}));
                            }}>
                              <div className='personal__item-wrap'>
                                <div>
                                  <div className='personal-circle' onClick={() => {
                                    setOpen(true);
                                  }}>
                                    <Bin />
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
                      <Link to='/user/personal/new'>
                        <div className='personal__item-new'>
                          <Plus />
                          <p>Add Cocktail</p>
                        </div>
                      </Link>
                    </div>
                  )
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
      <div className='personal__modal' style={{display: open ? 'flex' : 'none'}}>
        <div className='personal__modal-wrap'>
          <div className='close'><Close onClick={() => {setOpen(false)}} /></div>
          <h2>Are you sure that you want to delete your cocktail?</h2>
          <div className='btns'>
            <button onClick={() => {
              try {
                fetch('https://www.drinkup.somee.com/user/personal', {
                  method: 'DELETE',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({...currentUser, cocktail: {...cocktail}})
                })
                const newData = data.filter((elem: TCocktail) => {
                  return elem.id !== cocktail.id;
                });
                setData(newData);
                setOpen(false);
              } catch (err) {console.log(err)}
            }}>Delete</button>
            <button onClick={() => {setOpen(false)}}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}