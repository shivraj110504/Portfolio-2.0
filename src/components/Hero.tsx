import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const Hero = () => {
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const textToType = "Building the future with code...";
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // For header text typing animation
  const [headerText, setHeaderText] = useState('');
  const [headerTypingIndex, setHeaderTypingIndex] = useState(0);
  const headerTextToType = "Shivaraj Subhash Taware";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  // Typing animation effect for the terminal
  useEffect(() => {
    if (typingIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + textToType[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typingIndex]);
  
  // Typing animation for the header text
  useEffect(() => {
    if (headerTypingIndex < headerTextToType.length) {
      const timeout = setTimeout(() => {
        setHeaderText(prev => prev + headerTextToType[headerTypingIndex]);
        setHeaderTypingIndex(headerTypingIndex + 1);
      }, 120);
      
      return () => clearTimeout(timeout);
    }
  }, [headerTypingIndex]);

  // Handle hover animation for profile image
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex flex-col justify-center pt-16 pb-10 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Theme toggle button removed */}

        <div className={`flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex flex-col order-2 md:order-1 md:w-3/5 animate-fade-in">
            <p className="text-portfolio-purple font-medium mb-2 text-shadow-sm hover:text-portfolio-darkPurple transition-colors duration-300">Hello, I'm</p>
            <div className="mb-4 overflow-visible w-full">
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-400 typing-text shadow-text hover:scale-[1.01] transition-transform duration-300">
                {headerText}<span className="animate-pulse">|</span>
              </h1>
            </div>
            <div className="mb-6">
              <p className="text-xl font-medium text-gray-900 dark:text-gray-200 text-shadow-sm backdrop-blur-sm bg-white/10 dark:bg-black/10 p-2 rounded-md hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300">
                IT Undergraduate @SAOE Pune | Future Software Engineer | Skilled in Java, C++ & OOP | DSA Learner 
              </p>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-8 backdrop-blur-sm bg-white/10 dark:bg-black/10 p-2 rounded-md text-shadow-sm hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300">
              Passionate about solving complex problems with clean, efficient code and continuously expanding my technical knowledge.
            </p>
            
            {/* Terminal typing effect */}
            <div className="mb-8 p-4 bg-gray-900/90 dark:bg-gray-800/90 rounded-lg w-full max-w-lg purple-glow hover:shadow-lg hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2 hover:opacity-80 transition-opacity"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 hover:opacity-80 transition-opacity"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity"></div>
              </div>
              <div className="font-mono text-green-400">
                <span className="text-white">$ </span>{typedText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2 px-6 py-2 bg-portfolio-purple hover:bg-portfolio-darkPurple transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-portfolio-purple/50 purple-glow">
                <a href="#resume" className="flex items-center">
                  View Resume
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-2 border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10 transform hover:scale-105 transition-all duration-300"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
          
          <div 
            className={`order-1 md:order-2 md:w-2/5 transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-[100px]'
            }`} 
            style={{animationDelay: "0.3s"}}
          >
            <div 
              className={`profile-image-container rounded-full w-60 h-60 md:w-80 md:h-80 mx-auto backdrop-blur-lg p-1 bg-white/30 dark:bg-black/30 shadow-xl transition-all duration-500 purple-glow ${
                isHovered 
                  ? 'scale-105 shadow-portfolio-purple/80 rotate-3' 
                  : ''
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="/assets/5f2407b5-a7f1-47e3-98f2-bdbce4cb07cf.jpg" 
                  alt="Shivaraj Taware" 
                  className="rounded-full w-full h-full object-cover object-center object-[center_top_-15px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - updated with slower animation */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-slow-bounce hover:animate-none hover:translate-y-1 transition-all duration-300">
          <div className="w-1 h-10 rounded-full bg-portfolio-purple/50 relative">
            <div className="absolute w-1 h-4 bg-portfolio-purple rounded-full animate-[slideDown_3s_ease-in-out_infinite]"></div>
          </div>
          <span className="text-sm mt-2 text-gray-700 dark:text-gray-300 font-medium hover:text-portfolio-purple dark:hover:text-portfolio-purple transition-colors duration-300">Scroll Down</span>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
