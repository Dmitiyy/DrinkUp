import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { CocktailComponent } from "../components/CocktailComponent";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

const crumbs = [
  {title: 'Home', link: '/', id: 1},
  {title: 'Cocktails', link: '/cocktails', id: 2},
  {title: 'Cosmopolitan', link: '/cocktails/search', id: 3},
] as TCrumbs;

export const CocktailElement = ({community}: {community: Boolean}) => {
  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={3} />
      <CocktailComponent community={community} />
      <Footer />
    </>
  )
}