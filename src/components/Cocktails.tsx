import {Link} from 'react-router-dom';
import {ReactComponent as CocktailIcon} from '../assets/images/cocktail_icon.svg';
import {ReactComponent as Old} from '../assets/images/old.svg';
import {ReactComponent as Margarita} from '../assets/images/margarita.svg';
import {ReactComponent as Collins} from '../assets/images/tom_collins.svg';
// import { useHttp } from '../hooks/useHttp';
// import { useEffect } from 'react';

export const Cocktails = ({name, link}: {name: string, link: string}) => {
  // const [response, loading, error, getResults] = useHttp({
  //   url: 'cocktails',
  //   data: null,
  //   type: 'GET'
  // });

  // useEffect(() => {getResults()}, []);
  // useEffect(() => {console.log(response)}, [response]);
  // useEffect(() => {console.log(loading)}, [loading]);
  // useEffect(() => {console.log(error)}, [error]);

  return (
    <>
      <div className='home__cocktails'>
        <div className='home__cocktails-container'>
          <h2>{name}</h2>
          <div className="home__cocktails-wrap">
            <div className='home__cocktails-filter'>
              <h3>Filters</h3>
              <div className='home__cocktails-filterWrap'>
                <div className='home__cocktails-filterItem'>
                  <h4>Cocktail type</h4>
                  <div className='home__cocktails-filterBtns'>
                    <button className='home__cocktails-btn'>Alcoholic</button>
                    <button className='home__cocktails-btn'>Non-alcoholic</button>
                  </div>
                </div>
                <div className='home__cocktails-filterItem'>
                  <h4>Glass type</h4>
                  <div className='home__cocktails-filterBtns'>
                    <div className='home__cocktails-btnItem'>
                      <CocktailIcon />
                      <button className='home__cocktails-btn'>Cocktail</button>
                    </div>
                    <div className='home__cocktails-btnItem'>
                      <Old />
                      <button className='home__cocktails-btn'>Old Fashioned</button>
                    </div>
                    <div className='home__cocktails-btnItem'>
                      <Margarita />
                      <button className='home__cocktails-btn'>Margarita</button>
                    </div>
                    <div className='home__cocktails-btnItem'>
                      <Collins />
                      <button className='home__cocktails-btn'>Collins</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='home__cocktails-list'>
              {
                [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map(item => {
                  return (
                    <div className="home__cocktails-listItem" key={item}>
                      <Link to={`/${link}/${link === 'community' ? 'cocktail' : 'search'}`}>
                        <div className='home__cocktails-itemBg'>
                          <h3>White Lady</h3>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}