import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/services/emailService";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/shivrajtaware/",
  },
  { name: "GitHub", icon: Github, url: "https://github.com/shivraj110504" },
  { name: "Twitter", icon: Twitter, url: "https://x.com/ShivrajTaware04" },
  {
    name: "Youtube",
    icon: Youtube,
    url: "https://www.youtube.com/@shivrajtaware",
  },
];

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Create form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          if (isScrollingUp) {
            setIsVisible(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isScrollingUp]);

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      // Make sure all required fields are passed explicitly
      await sendContactEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Error notification is handled in the emailService
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/30 p-8 rounded-2xl shadow-lg">
          <h2 className="section-heading center mb-12">Get in Touch</h2>

          <div ref={contactRef} className="flex justify-center">
            {/* Contact Form */}
            {/* <div 
              className={`backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 rounded-xl shadow-lg p-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : isScrollingUp ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'
              }`}
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Send Me a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full purple-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div> */}

            {/* Contact Info */}
            <div
              className={`backdrop-blur-sm bg-white/40 dark:bg-gray-800/50 rounded-xl shadow-lg p-8 transition-all duration-1000 flex flex-col items-center text-center max-w-lg w-full ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : isScrollingUp
                  ? "opacity-0 -translate-x-20"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Contact Information
              </h3>

              <div className="space-y-6 w-full max-w-sm">
                {[
                  {
                    icon: <Mail size={24} />,
                    title: "Email",
                    content: "tawareshivaraj7867@gmail.com",
                  },
                  {
                    icon: <Phone size={24} />,
                    title: "Phone",
                    content: "+91 9322407510",
                  },
                  {
                    icon: <MapPin size={24} />,
                    title: "Location",
                    content: "Pune, Maharashtra, India",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-700`}
                    style={{ transitionDelay: `${(index + 2) * 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-portfolio-purple/20 flex items-center justify-center text-portfolio-purple">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex justify-center gap-6">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolio-purple hover:text-portfolio-purple/80 transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
