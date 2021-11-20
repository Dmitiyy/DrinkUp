import { Cocktails } from "../components/Cocktails"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Nav } from "../components/Nav"

export const HomePage = () => {
  return (
    <div className='home'>
      <Nav />
      <Header />
      <Cocktails />
      <Footer />
    </div>
  ) 
}