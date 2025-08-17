
import { Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/shivrajtaware/" },
    { name: "GitHub", icon: Github, url: "https://github.com/shivraj110504" },
    { name: "Twitter", icon: Twitter, url: "https://x.com/ShivrajTaware04" },
    { name: "Youtube", icon: Youtube, url: "https://www.youtube.com/@shivrajtaware" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-portfolio-purple mb-4">Shivaraj S. Taware</h2>
          
          <div className="flex items-center space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-gray-300 hover:text-portfolio-blue transition-colors"
                aria-label={link.name}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mb-6">
            <a href="#home" className="hover:text-portfolio-blue transition-colors">Home</a>
            <a href="#about" className="hover:text-portfolio-blue transition-colors">About</a>
            <a href="#projects" className="hover:text-portfolio-blue transition-colors">Projects</a>
            <a href="#skills" className="hover:text-portfolio-blue transition-colors">Skills</a>
            <a href="#resume" className="hover:text-portfolio-blue transition-colors">Resume</a>
            <a href="#contact" className="hover:text-portfolio-blue transition-colors">Contact</a>
          </div>
          
          <div className="text-gray-400 text-sm text-center">
            <p>&copy; {currentYear} Shivaraj Taware. All rights reserved.</p>
            <p className="mt-1">Aspiring Software Engineer from Pune, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
