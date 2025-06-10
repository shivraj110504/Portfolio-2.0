
import { useEffect, useRef, useState } from 'react';
import { Code, BookOpen, Rocket, Database } from 'lucide-react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Only hide elements when scrolling up
          if (isScrollingUp) {
            setIsVisible(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isScrollingUp]);

  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/30 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="section-heading center mb-12 hover:scale-105 transition-transform duration-300">About Me</h2>
          
          <div ref={aboutRef} className="flex flex-col md:flex-row gap-10">
            <div className={`md:w-1/3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'}`}>
              <div className="rounded-lg overflow-hidden purple-glow hover:shadow-lg hover:scale-105 transition-all duration-300">
                <img 
                  src="/assets/5f2407b5-a7f1-47e3-98f2-bdbce4cb07cf.png" 
                  alt="Shivaraj Taware" 
                  className="w-full h-auto object-cover object-[center_top_-15px]"
                />
              </div>
            </div>
            
            <div className={`md:w-2/3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`} style={{ transitionDelay: '150ms' }}>
              <p className="text-lg mb-6 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                I'm Shivraj Taware, an aspiring developer with a strong passion for problem-solving and software development. 
                I've completed Object-Oriented Programming (OOP) in Java and am currently learning Data Structures and 
                Algorithms (DSA) through a 250-day challenge to prepare for tech placements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    icon: <Code size={24} />,
                    title: "OOP Expertise",
                    desc: "My OOP experience in Java has equipped me with key programming concepts like classes, objects, inheritance, and polymorphism, allowing me to write clean, efficient code."
                  },
                  {
                    icon: <BookOpen size={24} />,
                    title: "Frontend Skills",
                    desc: "I have a solid understanding of frontend technologies like HTML, CSS, and JavaScript, and I am always improving my skills through hands-on projects."
                  },
                  {
                    icon: <Database size={24} />,
                    title: "DSA Focus",
                    desc: "My current focus is on mastering DSA in Java, which will help me enhance my problem-solving skills and be better prepared for technical interviews."
                  },
                  {
                    icon: <Rocket size={24} />,
                    title: "Continuous Learning",
                    desc: "With a focus on continuous learning, I am working hard to build a strong foundation in development and look forward to applying my knowledge in challenging tech roles."
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start transition-all duration-700 hover:translate-y-[-5px] hover:shadow-md p-3 rounded-lg ${
                      isVisible ? 'opacity-100 translate-y-0' : isScrollingUp ? 'opacity-0 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                    style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                  >
                    <div className="bg-portfolio-blue/80 backdrop-blur-sm p-3 rounded-lg text-white mr-4 shadow-md purple-glow hover:bg-portfolio-blue transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:text-portfolio-purple dark:hover:text-portfolio-purple transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
