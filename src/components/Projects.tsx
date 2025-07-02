
import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isScrollingUp]);

  const projects = [
    {
      title: "MediSpeed",
      description: "Siren Swift Traffic Control System (SSTCS), a solution to reduce delays for emergency vehicles. Our software tracks ambulance locations, manages traffic signals, and finds available hospital beds, ensuring faster response times and efficient patient care during emergencies.",
      techStack: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      githubLink: "#",
      demoLink: "#",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      direction: "left",
      status: "Currently under updation"
    },
    {
      title: "AlumniLink – Student-Alumni Collaboration Platform",
      description: "A full-stack platform enabling real-time doubt resolution, mentorship, resume sharing, and live chat between students and alumni.",
      techStack: ["React", "Node", "Supabase", "Tailwind CSS"],
      githubLink: "#",
      demoLink: "#",
      image: "https://alumnireach.com/wp-content/uploads/2024/06/Fundraising-Success-min.png",
      direction: "right",
    },
    {
      title: "Spam Detection",
      description: "Developed a Spam Detection system using Python and machine learning to classify messages as spam or not. Deployed on Streamlit, this tool helps users identify and block unwanted messages, enhancing mobile security.",
      techStack: ["Python", "Streamlit", "Machine Learning", "NLP"],
      githubLink: "https://github.com/shivraj110504/SpamDetection",
      demoLink: "https://spamdetectionbyshiv.streamlit.app/",
      image: "https://phuongnamvina.com/img_data/images/phong-chong-malware.jpg",
      direction: "right"
    },
    {
      title: "Portfolio Website",
      description: "A responsive personal portfolio website built to showcase my skills and projects in a clean, professional manner.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubLink: "https://github.com/shivraj110504/Portfolio-2.0",
      demoLink: "https://854a1d29.portfolio-2-0-eq2.pages.dev/",
      image: "https://cdn1.vectorstock.com/i/1000x1000/92/00/purple-portfolio-poster-with-colorful-brush-vector-21849200.jpg",
      direction: "left"
    },
  ];

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/30 p-8 rounded-2xl shadow-lg">
          <h2 className="section-heading center mb-12">Projects</h2>
          
          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-lg purple-glow transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : isScrollingUp
                      ? index % 2 === 0
                        ? 'opacity-0 translate-x-20' 
                        : 'opacity-0 -translate-x-20'
                      : index % 2 === 0
                        ? 'opacity-0 -translate-x-20' 
                        : 'opacity-0 translate-x-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  {project.status && (
                    <p className="text-amber-600 dark:text-amber-400 text-sm italic mb-2">{project.status}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 text-xs font-medium rounded backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      onClick={() => project.githubLink && window.open(project.githubLink, '_blank')}
                    >
                      <Github size={16} />
                      <span className="hidden sm:inline">GitHub</span>
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex items-center gap-2 purple-glow"
                      onClick={() => project.demoLink && window.open(project.demoLink, '_blank')}
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-700 dark:text-gray-400">More projects coming soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
