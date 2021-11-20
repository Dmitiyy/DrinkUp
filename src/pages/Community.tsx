import { BreadCrumbs, TCrumbs } from '../components/BreadCrumbs';
import { Cocktails } from '../components/Cocktails';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Blog', link: '/community', id: 2},
] as TCrumbs;

export const Community = () => {
  return (
    <>
      <div className='community'>
        <Nav />
        <BreadCrumbs data={crumbs} active={2} />
        <Cocktails name='Community' />
        <Footer />
      </div>
    </>
  )
}