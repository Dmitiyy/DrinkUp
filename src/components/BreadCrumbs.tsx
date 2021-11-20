import { Fragment } from 'react';
import {Link} from 'react-router-dom';
import Arrow from '../assets/images/bread_arrow.png';

export interface ICrumbs {
  title: string;
  link: string;
  id: number;
}

export type TCrumbs = Array<ICrumbs>;

export const BreadCrumbs = ({data, active}: {data: TCrumbs, active: number}) => {
  return (
    <div className='community__bread'>
      <ul>
        {
          data.map((item, i) => {
            return (
              <Fragment key={item.id}>
                <Link to={item.link}>
                  <li className={i === active - 1 ? 'community__bread-active' : ''}>
                    <p>{item.title}</p>
                  </li>
                </Link>
                <li className={i === data.length - 1 ? 'community__bread-remove' : ''}>
                  <img src={Arrow} alt="arrow" />
                </li>
              </Fragment>
            )
          })
        }
      </ul>
    </div>
  )
}