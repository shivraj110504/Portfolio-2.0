
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MatrixRain from "@/components/MatrixRain";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      <MatrixRain />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
