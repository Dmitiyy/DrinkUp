import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHttp } from '../hooks/useHttp';
import {AppDispatch} from '../redux/index'
import {ReactComponent as CocktailIcon} from '../assets/images/cocktail_icon.svg';
import {ReactComponent as Old} from '../assets/images/old.svg';
import {ReactComponent as Margarita} from '../assets/images/margarita.svg';
import {ReactComponent as Collins} from '../assets/images/tom_collins.svg';
import {ReactComponent as Loading} from '../assets/images/loading.svg';
import { setDataDefault } from '../redux/reducer';
import {useGetUser} from '../hooks/useGetUser';

export type TCocktail = {
  alcoholic: Boolean,
  carbs: number,
  description: string,
  fats: number,
  glassType: string,
  id: number,
  img: string,
  ingredients: Array<any>,
  name: string,
  proteins: number,
  recipe: string
}

const filterCocktailBtns = [
  {
    name: 'Alcoholic',
    value: true,
    id: 1
  },
  {
    name: 'Non-alcoholic',
    value: false,
    id: 2
  },
];

const filterGlassBtns = [
  {
    name: 'Cocktail',
    img: CocktailIcon,
    value: 'cocktail',
    id: 1
  },
  {
    name: 'Old Fashioned',
    img: Old,
    value: 'old',
    id: 2
  },
  {
    name: 'Margarita',
    img: Margarita,
    value: 'margarita',
    id: 3
  },
  {
    name: 'Collins',
    img: Collins,
    value: 'collins',
    id: 4
  },
];

export const Cocktails = ({name, link, community}: {name: string, link: string, community: Boolean}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeCocktailBtn, setActiveCocktailBtn] = useState<number>(0);
  const [activeGlassBtn, setActiveGlassBtn] = useState<number>(0);
  const [selectedFilterCocktail, setSelectedFilterCocktail] = useState<boolean>(false);
  const [selectedFilterGlass, setSelectedFilterGlass] = useState<boolean>(false);
  const [toggleGlass, setToggleGlass] = useState<Boolean>(false);
  const [glassClassName, setGlassClassName] = useState<string>('home__cocktails-btnItem');
  const [toggleCocktail, setToggleCocktail] = useState<Boolean>(false);
  const [cocktailClassName, setCocktailClassName] = useState<string>('home__cocktails-btn');
  const [response, loading, error, getResults] = useHttp({type: community ? 'POST' : 'GET'});
  const startOfUrl = community ? 'community' : 'cocktails';
  const [currentUser] = useGetUser();
  const postUserData = community ? currentUser : {};

  useEffect(() => {
    const fetch = async () => {
      await getResults(startOfUrl, postUserData)
    }
    fetch();
  }, []);

  return (
    <>
      <div className='home__cocktails' style={{
        minHeight: community ? '570px' : ''
      }}>
        <div className='home__cocktails-container'>
          <h2>{name}</h2>
          <div className="home__cocktails-wrap">
            <div className='home__cocktails-filter'>
              <h3>Filters</h3>
              <div className='home__cocktails-filterWrap'>
                <div className='home__cocktails-filterItem'>
                  <h4>Cocktail type</h4>
                  <div className='home__cocktails-filterBtns'>
                    {
                      filterCocktailBtns.map((item, i) => {
                        return (
                          <button className={activeCocktailBtn === i && selectedFilterCocktail
                          ? cocktailClassName : 'home__cocktails-btn'} 
                          key={item.id}
                          onClick={async () => {
                            setActiveCocktailBtn(i);
                            if (activeCocktailBtn === i && toggleCocktail) {
                              setToggleCocktail(false);
                              setSelectedFilterCocktail(false);
                              setCocktailClassName('home__cocktails-btn');

                              if (selectedFilterGlass) {
                                await getResults(
                                  `${startOfUrl}/filter?glass=${filterGlassBtns[activeGlassBtn].name}`,  
                                  postUserData
                                )
                              } else {
                                await getResults(startOfUrl, postUserData);
                              }
                            } else {
                              setToggleCocktail(true);
                              setSelectedFilterCocktail(true);
                              setCocktailClassName('home__cocktails-btn cocktail-btn-active');

                              if (selectedFilterGlass) {
                                await getResults(`${startOfUrl}/filter?glass=${filterGlassBtns[activeGlassBtn].name}&alcoholic=${item.value}`, postUserData);
                              } else {
                                await getResults(`${startOfUrl}/filter?alcoholic=${item.value}`, postUserData);
                              }
                            }
                          }}>{item.name}</button>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='home__cocktails-filterItem'>
                  <h4>Glass type</h4>
                  <div className='home__cocktails-filterBtns'>
                    {
                      filterGlassBtns.map((item, i) => {
                        return (
                          <div className={activeGlassBtn === i && selectedFilterGlass ? glassClassName : 'home__cocktails-btnItem'} 
                          key={item.id} onClick={async () => {
                            setActiveGlassBtn(i);
                            if (activeGlassBtn === i && toggleGlass) {
                              setToggleGlass(false);
                              setSelectedFilterGlass(false);
                              setGlassClassName('home__cocktails-btnItem');
                              if (selectedFilterCocktail) {
                                await getResults(`${startOfUrl}/filter?alcoholic=${
                                  filterCocktailBtns[activeCocktailBtn].value
                                }`, postUserData);
                              } else {
                                await getResults(`${startOfUrl}`, postUserData);
                              }
                            } else {
                              setSelectedFilterGlass(true);
                              setToggleGlass(true);
                              setGlassClassName('home__cocktails-btnItem cocktail-btn-glass');
              
                              if (selectedFilterCocktail) {
                                await getResults(`${startOfUrl}/filter?glass=${item.name}&alcoholic=${
                                  filterCocktailBtns[activeCocktailBtn].value
                                }`, postUserData);
                              } else {
                                await getResults(`${startOfUrl}/filter?glass=${item.name}`, postUserData);
                              }
                            }
                          }}>
                            <item.img />
                            <button className='home__cocktails-btn'>{item.name}</button>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              loading ? (
                <Loading className='cocktails-loading' />
              ) : error || !response ? (
                <h3 className='cocktails-not-found'>Error, try again later</h3>
              ) : response.length === 0 ? (
                <h3 className='cocktails-not-found'>No cocktails found</h3>
              ) : (
                <div className='home__cocktails-list'>
                  {
                    response.map((item: TCocktail) => {
                      return (
                        <div className="home__cocktails-listItem" key={item.id}
                        style={{background: `url(${item.img})`}} onClick={() => {
                          dispatch(setDataDefault({ini: 'selectedCocktail', data: item}));
                        }}>
                          <Link to={`/${link}/${link === 'community' ? 'cocktail' : 'search'}`}>
                            <div className='home__cocktails-itemBg'>
                              <h3>{item.name}</h3>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
                </div> 
              ) 
            }
          </div>
        </div>
      </div>
    </>
  )
}