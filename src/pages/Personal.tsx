import { Link } from "react-router-dom";
import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { Nav } from "../components/Nav"
import { ReactComponent as Bin } from "../assets/images/bin.svg";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { Footer } from "../components/Footer";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Personal Cocktails', link: '/user/personal', id: 2},
] as TCrumbs;

export const Personal = () => {
  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={2} />
      <div className='personal'>
          <h2>Personal Cocktails</h2>
          <div className='personal__wrap'>
            {
              [0, 1, 2, 3,4 ].map(item => {
                return (
                  <div key={item} className='personal__wrap-item'>
                    <div className='personal__item-wrap'>
                      <div>
                        <div className='personal-circle'>
                          <Bin />
                        </div>
                      </div>
                      <h3>White Lady</h3>
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
        </div>
        <Footer />
    </>
  )
}