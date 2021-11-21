import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { Nav } from "../components/Nav"
import { ReactComponent as Like } from "../assets/images/like.svg";
import { Footer } from "../components/Footer";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Favourite Cocktails', link: '/user/liked', id: 2},
] as TCrumbs;

export const Liked = () => {
  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={2} />
      <div className='liked'>
        <h2>Favourite Cocktails</h2>
        <div className='liked__wrap'>
          {
            [0, 1, 2, 3, 4,5 , 6,7 ].map(item => {
              return (
                <div key={item} className='liked__wrap-item'>
                  <div className='liked__item-wrap'>
                    <div>
                      <div className='liked-circle'>
                        <Like />
                      </div>
                    </div>
                    <h3>White Lady</h3>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}