import About from "./page/about/About"
import Contact from "./page/contact/Contact"
import Home from "./page/home/Home"
import Skills from "./page/skills/Skills"
import SectionLoader from "@/src/components/page/loader/SectionLoader"

const HomePage = () => {
  return (
        <section id="Page">

     <div className="conteiner">
      <div className="Page">
      </div>
      <Home/>
      <About/>
      <Skills/>
      <SectionLoader/>
      <Contact/>
     </div>
        </section>

  )
}

export default HomePage