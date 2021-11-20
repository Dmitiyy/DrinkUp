import Cocktail from '../assets/images/cocktail.png';

export const Header = () => {
  return (
    <div className='home__header'>
      <div className='home__header-wrap'>
        <img src={Cocktail} alt="cocktail" />
        <div>
          <p>The right cocktail for you will make your evening even better!</p>
        </div>
      </div>
    </div>
  )
}