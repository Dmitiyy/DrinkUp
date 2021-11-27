import { Cocktails } from "../components/Cocktails"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Nav } from "../components/Nav"

export const HomePage = () => {
  return (
    <div className='home'>
      <Nav community={false} />
      <Header />
      <Cocktails name='Cocktails' link='cocktails' community={false} />
      <Footer />
    </div>
  ) 
}