import Photo from '../assets/images/item.png';

export const CocktailComponent = ({community}: {community: Boolean}) => {
  return (
    <div className="cocktail">
      <h2>Cosmopolitan</h2>
      <div className='cocktail__wrap'>
        <div>
          <img src={Photo} alt="cocktail" />
          {
            community ? (
              <button className='cocktail-btn'>Add to favourites</button>
            ) : null
          }
        </div>
        <div className='cocktail__wrap-information'>
          <h3>Brief description</h3>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
          <h3>Name and list of ingredients with Macros*</h3>
          <div className="cocktail__information-ingredients">
            <div className='cocktail__ingredients-item'>
              <h3>Coca-Cola - 150ml</h3>
              <div className='cocktail__ingredients-descr'>
                <p>Fat: <span>0g</span></p>
                <p>Carbohydrate: <span>10.6g</span></p>
                <p>Protein: <span>0g</span></p>
              </div>
            </div>
            <div className='cocktail__ingredients-item'>
              <h3>Dark Rum - 50ml</h3>
              <div className='cocktail__ingredients-descr'>
                <p>Fat: <span>0g</span></p>
                <p>Carbohydrate: <span>0g</span></p>
                <p>Protein: <span>0g</span></p>
              </div>
            </div>
            <div className='cocktail__ingredients-item'>
              <h3>Lemon juice - 20ml</h3>
              <div className='cocktail__ingredients-descr'>
                <p>Fat: <span>0g</span></p>
                <p>Carbohydrate: <span>1.3g</span></p>
                <p>Protein: <span>0g</span></p>
              </div>
            </div>
            <div className='cocktail__ingredients-item'>
              <h3>Ice - 30gr</h3>
              <div className='cocktail__ingredients-descr'>
                <p>Fat: <span>0g</span></p>
                <p>Carbohydrate: <span>0g</span></p>
                <p>Protein: <span>0g</span></p>
              </div>
            </div>
          </div>
          <p className='cocktail__information-def'>
            *all MACROS values are given for a given number of ingredients
          </p>
          <div className='cocktail__algorithm'>
            <h3>Cooking algorithm</h3>
            <ol>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</li>
              <li>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
              <li>Donec quam felis, ultricies nec, pellentesque eu, pretium quis.</li>
            </ol>
          </div>
          <h3 className='cocktail__enjoy'>You did it! Enjoy your cocktail!</h3>
        </div>
      </div>
    </div>
  )
}