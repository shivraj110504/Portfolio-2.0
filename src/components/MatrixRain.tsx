
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isVisible, setIsVisible] = useState(true);

  // Track if we're in the header section
  useEffect(() => {
    const handleScroll = () => {
      // Get the height of the header/hero section
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        // Show matrix only when in the header section 
        // (adding a small buffer for smooth transition)
        setIsVisible(window.scrollY < heroHeight - 100);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters (common programming symbols)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]()+-*/=&|^%$#@!~;:,.?';
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track the Y position of each drop
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }
    
    // Drawing the characters
    const draw = () => {
      // Semi-transparent background to create fading effect
      ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set the color and font
      ctx.fillStyle = isDarkMode ? '#a78bfa' : '#8b5cf6';
      ctx.font = `${fontSize}px monospace`;
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset some drops to the top after they've moved down
        // Reduced probability for slower movement
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        
        // Slow down the increment for drop movement (reduced speed)
        drops[i] += 0.5; // Reduced from 1 to 0.5 for slower movement
      }
    };
    
    // Animation loop with reduced frame rate for slower movement
    let animationId: number;
    let lastTime = 0;
    const fps = 30; // Reduced FPS for slower matrix rain
    const fpsInterval = 1000 / fps;
    
    const animate = (timestamp: number) => {
      if (!isVisible) return;
      
      const elapsed = timestamp - lastTime;
      
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        draw();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode, isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <canvas 
      ref={canvasRef} 
      id="matrixCanvas" 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-20 dark:opacity-40 pointer-events-none"
      style={{ position: 'fixed' }}
    ></canvas>
  );
};

export default MatrixRain;
