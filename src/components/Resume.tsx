
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Resume = () => {
  const resumeViewUrl = "https://drive.google.com/file/d/14tDAK_cGIMtQ7MdtgFxo6nw2Ug1By_Ty/view?usp=sharing";
  const resumeDownloadUrl = "https://drive.google.com/file/d/14tDAK_cGIMtQ7MdtgFxo6nw2Ug1By_Ty/view?usp=sharing";
  const resumeRef = useRef<HTMLDivElement>(null);
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

    if (resumeRef.current) {
      observer.observe(resumeRef.current);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (resumeRef.current) {
        observer.unobserve(resumeRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isScrollingUp]);

  const handleDownload = () => {
    try {
      window.open(resumeDownloadUrl, '_blank');
      
      toast({
        title: "Download started",
        description: "Your resume download has started.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again or use the view option.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <section id="resume" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/30 p-8 rounded-2xl shadow-lg">
          <h2 className="section-heading center mb-12">Resume</h2>
          
          <div 
            ref={resumeRef}
            className={`backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 rounded-xl shadow-lg p-8 max-w-3xl mx-auto text-center purple-glow transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : isScrollingUp ? 'opacity-0 scale-95' : 'opacity-0 scale-105'
            }`}
          >
            <FileText size={72} className="mx-auto text-portfolio-purple mb-6" />
            
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">My Resume</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              View or download my complete resume to learn more about my education, experience, and skills.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className={`flex items-center gap-2 purple-glow transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
                onClick={() => window.open(resumeViewUrl, '_blank')}
              >
                <FileText size={18} />
                View Resume
              </Button>
              
              <Button 
                variant="outline" 
                className={`flex items-center gap-2 bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '500ms' }}
                onClick={handleDownload}
              >
                <Download size={18} />
                Download PDF
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className={`backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 rounded-xl shadow-md p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className="text-xl font-bold mb-4 text-portfolio-purple">Education</h3>
              
              <div className="space-y-6">
                <div className="border-l-2 border-portfolio-purple pl-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Information Technology</h4>
                  <p className="text-portfolio-purple font-medium">SAOE Pune</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expected Graduation: 2027</p>
                </div>

                 <div className="border-l-2 border-portfolio-purple pl-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">HSC (12th)</h4>
                  <p className="text-portfolio-purple font-medium">Sharad Pawar Highschool, Dharashiv</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed in 2022</p>
                </div>

                 <div className="border-l-2 border-portfolio-purple pl-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">SSC (10th)</h4>
                  <p className="text-portfolio-purple font-medium">S. Bhosale High School, Dharashiv</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed in 2020</p>
                </div>
              </div>
            </div>
            
            <div 
              className={`backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 rounded-xl shadow-md p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <h3 className="text-xl font-bold mb-4 text-portfolio-purple">Certifications</h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Java Programming Basics",
                    provider: "HackerRank",
                    year: "2024"
                  },
                  {
                    title: "Fundamentals of Generative AI",
                    provider: "Microsoft",
                    year: "2024"
                  },
                  {
                    title: "Web Development Essentials",
                    provider: "Udemy",
                    year: "2023"
                  }
                ].map((cert, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${(index + 4) * 150}ms` }}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{cert.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.provider} | {cert.year}</p>
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

export default Resume;
