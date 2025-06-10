
import { toast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Prepare the email data to be sent to your specified email
    const emailData = {
      to: "shivarajtaware7192@gmail.com", // This is your email where you'll receive notifications
      subject: `Portfolio Contact: ${formData.subject || 'New message from portfolio website'}`,
      body: `
Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}

This message was sent from your portfolio website contact form.
      `
    };

    console.log("Email would be sent with data:", emailData);
    
    // Send email using EmailJS
    try {
      // EmailJS configuration
      const serviceId = 'service_mzbgwwk'; // Your EmailJS service ID
      const templateId = 'template_ytx5ksb'; // Your EmailJS template ID
      const publicKey = 'Ye05y4VAIo2NP7XE5'; // Your EmailJS public key
      
      // Define template parameters - these must match your EmailJS template variables
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_message: formData.message,
        to_email: 'shivarajtaware7192@gmail.com',
        subject: formData.subject || 'New message from portfolio website'
      };
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('Email sent successfully:', response);
      
    } catch (error) {
      console.error('Error sending email via EmailJS:', error);
      throw error;
    }

    // Also send notification email to the administrator
    const adminEmailData = {
      to: "shivarajtaware7192@gmail.com",
      subject: "New Contact Form Submission",
      body: `
You have received a new contact form submission:

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}

Message:
${formData.message}

Date: ${new Date().toLocaleString()}
      `
    };
    
    console.log("Admin notification would be sent with data:", adminEmailData);

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
      duration: 5000,
    });

    return {
      success: true,
      message: "Email sent successfully"
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    
    toast({
      title: "Failed to send message",
      description: "Please try again or contact me directly via email.",
      variant: "destructive",
      duration: 5000,
    });

    return {
      success: false,
      message: "Failed to send email"
    };
  }
}
