import {Formik, Field, Form, FormikProps} from 'formik';
import * as Yup from 'yup';
import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs"
import { Nav } from "../components/Nav"
import {ReactComponent as Arrow} from '../assets/images/select.svg';
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { useGetUser } from '../hooks/useGetUser';
import { useHttp } from '../hooks/useHttp';

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Community', link: '/community', id: 2},
  {title: 'New Cocktail', link: '/user/personal/new', id: 3},
] as TCrumbs;

interface IFormik {
  name: string;
  amount: string;
  fat: string;
  protein: string;
  carb: string;
}

export const NewCocktail = () => {
  const [bioLength, setBioLength] = useState<number>(0);
  const [algoLength, setAlgoLength] = useState<number>(0);
  const [bio, setBio] = useState<string>('');
  const [algo, setAlgo] = useState<string>('');
  const [openAmount, setOpenAmount] = useState<Boolean>(false);
  const [valueAmount, setValueAmount] = useState<string>('gr');
  const initialValues: IFormik = {
    name: '',
    amount: '',
    fat: '',
    protein: '',
    carb: '',
  };
  const formRef = useRef<FormikProps<IFormik>>(null);
  const [ingData, setIngData] = useState<Array<any>>([]);
  const [nameC, setNameC] = useState<string>('');
  const [response, loading, error, getResults] = useHttp({type: 'POST'});
  const [mainBtn, setMainBtn] = useState<Boolean>(false);

  const [nameCError, setNameCError] = useState<Boolean>(false);
  const [bioError, setBioError] = useState<Boolean>(false);
  const [algoError, setAlgoError] = useState<Boolean>(false);
  const [secondFormError, setSecondFormError] = useState<Boolean>(false);
  const [currentUser] = useGetUser();

  const generateBioLength = (func: Function, value: string): void => {func(value.length)};
  useEffect(() => {generateBioLength(setBioLength, bio)}, [bio]);
  useEffect(() => {generateBioLength(setAlgoLength, algo)}, [algo]);
  useEffect(() => {console.log(response);
  }, [response])
  useEffect(() => {
    if (
      nameC.length <= 30 && nameC.length !== 0 && 
      bioLength <= 250 && bioLength !== 0 && 
      algoLength <= 250 && algoLength !== 0 && 
      ingData.length !== 0
    ) {
      setMainBtn(true);
    } else {setMainBtn(false)};
  }, [bioLength, nameC, algoLength, ingData]);
  

  const FormikSchema = Yup.object().shape({
    name: Yup.string().required(),
    amount: Yup.string().required(),
    fat: Yup.string().required(),
    protein: Yup.string().required(),
    carb: Yup.string().required()
  });

  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={3} />
      <div className='newCocktail'>
        <h2>New Cocktail</h2>
        <div className='newCocktail__wrap'>
          <form>
            <label htmlFor="cocktail_name">Cocktail name</label>
            <input type="text" id='cocktail_name' value={nameC} 
            className={nameCError ? 'input-error' : ''} placeholder='Cocktail Name' name='name'
            onChange={(e) => setNameC(e.target.value)} />
            <label htmlFor="descr">Brief description</label>
            <textarea id="descr" className={bioError ? 'input-error' : ''} placeholder='Brief description' 
            onChange={(e: any) => setBio(e.target.value)} name='descr' value={bio} />
            <div className='newCocktail__descr-num'><p>{bioLength}/250</p></div>
            <label htmlFor="algo">Cooking algorithm</label>
            <textarea id="algo" placeholder='Cooking algorithm' value={algo} name='algorithm'
            className={algoError ? 'input-error' : ''}
            onChange={(e: any) => setAlgo(e.target.value)} />
            <div className='newCocktail__descr-num'><p>{algoLength}/250</p></div>
          </form>
          <div className='newCocktail__wrap-second'>
            <h3>Name and list of ingredients with Macros*</h3>
            <p>*all MACROS values are given for a given number of ingredients</p>
              <Formik
              innerRef={formRef}
              initialValues={initialValues}
              validationSchema={FormikSchema}
              onSubmit={({name, amount, fat, protein, carb}, actions) => {
                const data = {
                  product: {
                    name,
                    carbs: Number(carb),
                    fats: Number(fat),
                    proteins: Number(protein),
                  },
                  amount: Number(amount),
                }
                setIngData(prev => [...prev, data]);
                actions.setSubmitting(false);
                actions.resetForm({});
                setSecondFormError(false);
              }}>
                {
                  ({errors, touched}) => (
                    <Form className='newCocktail__second-form'>
                      <label htmlFor="ingre_name">Ingredient Name</label>
                      <Field type="text" placeholder='Ingredient Name' id='ingre_name' 
                      name='name' autoComplete="off" 
                      className={errors.name && touched.name ? 'input-error' : ''} />
                      <label htmlFor="amount">Amout of ingredient</label>
                      <div>
                        <Field type="text" id='amount' name='amount' 
                        placeholder='Amout of ingredient' autoComplete="off"
                        className={errors.amount && touched.amount ? 'input-error' : ''} />
                        <div className={
                          errors.amount && touched.amount ? 
                          'input-error-c newCocktail__select' : 'newCocktail__select'
                        }>
                          <div className='newCocktail__select-title' onClick={() => {
                            setOpenAmount(!openAmount);
                          }}>
                            <p>{valueAmount}</p>
                            <Arrow />
                          </div>
                          <div className={openAmount ? 'newCocktail__select-options newCocktail__select-open' : 'newCocktail__select-options'}>
                            <ul>
                              {
                                ['gr'].map((item, i) => {
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
                          <Field type="text" placeholder='Fat' id='fat' name='fat' autoComplete="off"
                          className={errors.fat && touched.fat ? 'input-error' : ''} />
                        </div>
                        <div className='newCocktail__ing'>
                          <label htmlFor="prot">Protein</label>
                          <Field type="text" placeholder='Protein' id='prot' name='protein' autoComplete="off"
                          className={errors.protein && touched.protein ? 'input-error' : ''} />
                        </div>
                        <div className='newCocktail__ing'>
                          <label htmlFor="carbo">Carbohydrate</label>
                          <Field type="text" placeholder='Carbohydrate' id='carbo' name='carb' autoComplete="off" className={errors.carb && touched.carb ? 'input-error' : ''} />
                        </div>
                      </div>
                      <button type='submit' className={
                        Object.keys(errors).length === 0 && Object.keys(touched).length !== 0
                        ? '' : 'btn-not-active'
                      }>ADD NEW INGREDIENT</button>
                      <div className='newCocktail__added'>
                        <h3 
                        style={{color: secondFormError ? '#d16060' : '#0C2D68'}}>
                        ADDED INGREDIENTS*</h3>
                        <p>*all MACROS values are given for a given number of ingredients</p>
                        {
                          ingData.map((item, i) => {
                            return (
                              <div className='newCocktail__added-item' key={i}>
                                <h4>{i + 1}. {item.product.name} - {item.amount}gr</h4>
                                <ul>
                                  <li>Fat: <span>{item.fats}g</span></li>
                                  <li>Carbohydrate: <span>{item.carbs}g</span></li>
                                  <li>Protein: <span>{item.proteins}g</span></li>
                                </ul>
                              </div>
                            )
                          })
                        }
                      </div>
                    </Form>
                  )
                }
              </Formik>
          </div>
        </div>
        <div className='newCocktail__btn-wrap'><button className={mainBtn ? '' : 'btn-not-active'} 
        onClick={() => {
          if (nameC.length > 30 || nameC.length === 0) {
            setNameCError(true);
          } else {setNameCError(false)};

          if (bioLength > 250 || bioLength === 0) {setBioError(true)}
          else {setBioError(false)};

          if (algoLength > 250 || algoLength === 0) {setAlgoError(true)}
          else {setAlgoError(false)};

          if (ingData.length === 0) {setSecondFormError(true)}
          else {setSecondFormError(false)};

          if (
            nameC.length <= 30 && nameC.length !== 0 && 
            bioLength <= 250 && bioLength !== 0 && 
            algoLength <= 250 && algoLength !== 0 && 
            ingData.length !== 0) {
            const data = {
              ...currentUser,
              cocktail: {
                name: nameC,
                alcoholic: true,
                recipe: algo,
                description: bio,
                glassType: 'Cocktail glass',
                img: 'https://www.pxfuel.com/en/free-photo-expqp',
                ingredients: [...ingData]
              }
            };
            getResults('user/personal/add', data);
            setNameC('');
            setBio('');
            setAlgo('');
            setIngData([]);
          }
        }}>{loading ? 'loading' : 'Add new Cocktail'}</button></div>
        {error ? (<h3 className='new-not-found'>Error, try again later</h3>) : null}
      </div>
      <Footer />
    </>
  )
}