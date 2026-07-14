import Nav from './components/Nav'
import ProgressoScroll from './components/ProgressoScroll'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Team from './components/Team'
import Faq from './components/Faq'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ProgressoScroll />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Team />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
