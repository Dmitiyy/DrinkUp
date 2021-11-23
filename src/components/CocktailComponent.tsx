import { useAppSelector } from '../redux';

export const CocktailComponent = ({community}: {community: Boolean}) => {
  const currentCocktail = useAppSelector(state => state.user.selectedCocktail);

  return (
    <div className="cocktail">
      {
        Object.keys(currentCocktail).length === 0 ? (
          <h2>Please choose a cocktail</h2>
        ) : (
          <>
            <h2>{currentCocktail.name}</h2>
            <div className='cocktail__wrap'>
              <div>
                <img src={`${currentCocktail.img}`} alt="cocktail" />
                {
                  community ? (
                    <button className='cocktail-btn'>Add to favourites</button>
                  ) : null
                }
              </div>
              <div className='cocktail__wrap-information'>
                <h3>Brief description</h3>
                <p>{currentCocktail.description.length === 0 ? 'No description' : 
                currentCocktail.description}</p>
                <h3>Name and list of ingredients with Macros*</h3>
                <div className="cocktail__information-ingredients">
                  {
                    currentCocktail.ingredients.map((item, i) => {
                      return (
                        <div className='cocktail__ingredients-item' key={item.id + i + 'id'}>
                          <h3>{item.product.name} - {item.amount}ml</h3>
                          <div className='cocktail__ingredients-descr'>
                            <p>Fat: <span>{item.product.fats}g</span></p>
                            <p>Carbohydrate: <span>{item.product.carbs}g</span></p>
                            <p>Protein: <span>{item.product.proteins}g</span></p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <p className='cocktail__information-def'>
                  *all MACROS values are given for a given number of ingredients
                </p>
                <div className='cocktail__algorithm'>
                  <h3>Cooking algorithm</h3>
                  <p>{currentCocktail.recipe}</p>
                  {/* <ol>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</li>
                    <li>Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                    <li>Donec quam felis, ultricies nec, pellentesque eu, pretium quis.</li>
                  </ol> */}
                </div>
                <h3 className='cocktail__enjoy'>You did it! Enjoy your cocktail!</h3>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}