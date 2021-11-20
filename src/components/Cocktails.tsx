import {ReactComponent as CocktailIcon} from '../assets/images/cocktail_icon.svg';
import {ReactComponent as Old} from '../assets/images/old.svg';
import {ReactComponent as Margarita} from '../assets/images/margarita.svg';
import {ReactComponent as Collins} from '../assets/images/tom_collins.svg';

export const Cocktails = () => {
  return (
    <>
      <div className='home__cocktails'>
        <div className='home__cocktails-container'>
          <h2>Cocktails</h2>
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
                      <div className='home__cocktails-itemBg'>
                        <h3>White Lady</h3>
                      </div>
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