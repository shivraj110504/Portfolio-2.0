
import { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
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

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isScrollingUp]);

  const technicalSkills = [
    { name: "Java", level: 90 },
    { name: "Python", level: 85 },
    { name: "C++", level: 85 },
    { name: "HTML/CSS", level: 80 },
    { name: "JavaScript", level: 75 },
    { name: "React", level: 70 },
    { name: "Streamlit", level: 80 },
    { name: "DSA", level: 65 },
    { name: "OOP", level: 95 },
    { name: "Git", level: 75 },
    { name: "GitHub", level: 80 },
    { name: "SQL", level: 70 }
  ];
  
  const softSkills = [
    "Problem Solving",
    "Teamwork",
    "Communication",
    "Time Management",
    "Critical Thinking",
    "Adaptability",
    "Attention to Detail",
    "Quick Learning"
  ];

  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/30 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="section-heading center mb-12 hover:scale-105 transition-transform duration-300">Skills</h2>
          
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'}`}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 hover:text-portfolio-purple dark:hover:text-portfolio-purple transition-colors duration-300">Technical Skills</h3>
              
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-item hover:translate-y-[-3px] transition-transform duration-300"
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible 
                        ? 'translateX(0)' 
                        : isScrollingUp 
                          ? 'translateX(20px)' 
                          : 'translateX(-20px)',
                      transition: 'all 0.5s ease-out'
                    }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-800 dark:text-gray-200 hover:text-portfolio-purple dark:hover:text-portfolio-purple transition-colors duration-300">{skill.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-full h-2 hover:h-3 transition-all duration-300">
                      <div 
                        className="bg-portfolio-purple h-full rounded-full purple-glow hover:bg-portfolio-darkPurple transition-colors duration-300" 
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transition: 'width 1s ease-out',
                          transitionDelay: `${index * 100 + 300}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 hover:text-portfolio-purple dark:hover:text-portfolio-purple transition-colors duration-300">Soft Skills</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className="skill-item backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm flex items-center purple-glow hover:shadow-md hover:bg-white/60 dark:hover:bg-gray-700/70 hover:scale-105 transition-all duration-300"
                    style={{ 
                      transitionDelay: `${index * 100 + 400}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible 
                        ? 'scale(1)' 
                        : isScrollingUp 
                          ? 'scale(1.1)' 
                          : 'scale(0.9)',
                      transition: 'all 0.5s ease-out'
                    }}
                  >
                    <div className="mr-3 w-2 h-2 bg-portfolio-purple rounded-full"></div>
                    <span className="text-gray-800 dark:text-gray-200 hover:text-portfolio-purple dark:hover:text-portfolio-purple transition-colors duration-300">{skill}</span>
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

export default Skills;
