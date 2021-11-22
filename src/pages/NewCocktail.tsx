import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs"
import { Nav } from "../components/Nav"
import {ReactComponent as Arrow} from '../assets/images/select.svg';
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Community', link: '/community', id: 2},
  {title: 'New Cocktail', link: '/user/personal/new', id: 3},
] as TCrumbs;

export const NewCocktail = () => {
  const [bioLength, setBioLength] = useState<number>(0);
  const [algoLength, setAlgoLength] = useState<number>(0);
  const [bio, setBio] = useState<string>('');
  const [algo, setAlgo] = useState<string>('');
  const [openAmount, setOpenAmount] = useState<Boolean>(false);
  const [valueAmount, setValueAmount] = useState<string>('ml');

  const generateBioLength = (func: Function, value: string): void => {func(value.length)};
  useEffect(() => {generateBioLength(setBioLength, bio)}, [bio]);
  useEffect(() => {generateBioLength(setAlgoLength, algo)}, [algo]);

  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={3} />
      <div className='newCocktail'>
        <h2>New Cocktail</h2>
        <div className='newCocktail__wrap'>
          <form>
            <label htmlFor="cocktail_name">Cocktail name</label>
            <input type="text" id='cocktail_name' placeholder='Cocktail Name' />
            <label htmlFor="descr">Brief description</label>
            <textarea id="descr" placeholder='Brief description' 
            onChange={(e) => setBio(e.target.value)} />
            <div className='newCocktail__descr-num'><p>{bioLength}/250</p></div>
            <label htmlFor="algo">Cooking algorithm</label>
            <textarea id="algo" placeholder='Cooking algorithm' 
            onChange={(e) => setAlgo(e.target.value)} />
            <div className='newCocktail__descr-num'><p>{algoLength}/250</p></div>
          </form>
          <div className='newCocktail__wrap-second'>
            <h3>Name and list of ingredients with Macros*</h3>
            <p>*all MACROS values are given for a given number of ingredients</p>
            <form className='newCocktail__second-form'>
              <label htmlFor="ingre_name">Ingredient Name</label>
              <input type="text" placeholder='Ingredient Name' id='ingre_name' />
              <label htmlFor="amount">Amout of ingredient</label>
              <div>
                <input type="text" id='amount' placeholder='Amout of ingredient' />
                <div className='newCocktail__select'>
                  <div className='newCocktail__select-title' onClick={() => {
                    setOpenAmount(!openAmount);
                  }}>
                    <p>{valueAmount}</p>
                    <Arrow />
                  </div>
                  <div className={openAmount ? 'newCocktail__select-options newCocktail__select-open' : 'newCocktail__select-options'}>
                    <ul>
                      {
                        ['ml', 'ml2', 'ml3'].map((item, i) => {
                          return (
                            <li key={'id' + i} onClick={() => {
                              setValueAmount(item);
                              setOpenAmount(false);
                            }}>{item}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className='newCocktail__ing'>
                  <label htmlFor="fat">Fat</label>
                  <input type="text" placeholder='Fat' id='fat' />
                </div>
                <div className='newCocktail__ing'>
                  <label htmlFor="prot">Protein</label>
                  <input type="text" placeholder='Protein' id='prot' />
                </div>
                <div className='newCocktail__ing'>
                  <label htmlFor="carbo">Carbohydrate</label>
                  <input type="text" placeholder='Carbohydrate' id='carbo' />
                </div>
              </div>
              <button>ADD NEW INGREDIENT</button>
            </form>
            <div className='newCocktail__added'>
              <h3>ADDED INGREDIENTS*</h3>
              <p>*all MACROS values are given for a given number of ingredients</p>
              <div className='newCocktail__added-item'>
                <h4>1. Coca-Cola - 150ml</h4>
                <ul>
                  <li>Fat: <span>0g</span></li>
                  <li>Carbohydrate: <span>10.6g</span></li>
                  <li>Protein: <span>0g</span></li>
                </ul>
              </div>
              <div className='newCocktail__added-item'>
                <h4>2. Dark Rum - 50ml</h4>
                <ul>
                  <li>Fat: <span>0g</span></li>
                  <li>Carbohydrate: <span>10.6g</span></li>
                  <li>Protein: <span>0g</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='newCocktail__btn-wrap'><button>Add new Cocktail</button></div>
      </div>
      <Footer />
    </>
  )
}