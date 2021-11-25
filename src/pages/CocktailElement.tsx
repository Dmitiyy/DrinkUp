import { BreadCrumbs, TCrumbs } from "../components/BreadCrumbs";
import { CocktailComponent } from "../components/CocktailComponent";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useAppSelector } from "../redux";


export const CocktailElement = ({community}: {community: Boolean}) => {
  const name = useAppSelector(state => state.user.selectedCocktail.name);
  
  const bCrumbs = community ? [
    {title: 'Home', link: '/', id: 1},
    {title: 'Blog', link: '/community', id: 2},
    {title: name, link: '/community/cocktail', id: 3},
  ] : [
    {title: 'Home', link: '/', id: 1},
    {title: name, link: '/cocktails/search', id: 2},
  ]

  const crumbs = bCrumbs as TCrumbs;

  return (
    <>
      <Nav />
      <BreadCrumbs data={crumbs} active={community ? 3 : 2} />
      <CocktailComponent community={community} />
      <Footer />
    </>
  )
}