import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MapPin, Phone, Mail, Send, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error on input change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-lg text-surface-600 dark:text-surface-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have questions or feedback? We'd love to hear from you!
        </motion.p>
      </div>

      {/* Contact Information and Form */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-2xl font-semibold mb-6 text-surface-900 dark:text-white"
              variants={fadeIn}
            >
              Get in Touch
            </motion.h2>
            
            <motion.div className="space-y-6" variants={staggerContainer}>
              <motion.div className="flex items-start gap-4" variants={fadeIn}>
                <div className="bg-primary/10 rounded-full p-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Our Location</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    123 Innovation Avenue<br />
                    Tech District, TX 75001<br />
                    United States
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start gap-4" variants={fadeIn}>
                <div className="bg-primary/10 rounded-full p-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email Us</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    info@cuelens.com<br />
                    support@cuelens.com
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start gap-4" variants={fadeIn}>
                <div className="bg-primary/10 rounded-full p-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Call Us</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    +1 (555) 123-4567<br />
                    Mon-Fri: 9AM - 6PM EST
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 p-3 rounded-full transition-colors">
                  <Twitter className="w-5 h-5 text-surface-700 dark:text-surface-300" />
                </a>
                <a href="#" className="bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 p-3 rounded-full transition-colors">
                  <Facebook className="w-5 h-5 text-surface-700 dark:text-surface-300" />
                </a>
                <a href="#" className="bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 p-3 rounded-full transition-colors">
                  <Linkedin className="w-5 h-5 text-surface-700 dark:text-surface-300" />
                </a>
                <a href="#" className="bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 p-3 rounded-full transition-colors">
                  <Instagram className="w-5 h-5 text-surface-700 dark:text-surface-300" />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-surface-900 dark:text-white">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-surface-700 dark:text-surface-300">
                  Your Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-surface-200 dark:border-surface-700 focus:ring-primary/50"
                  } dark:bg-surface-700 focus:outline-none focus:ring-2 transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-surface-700 dark:text-surface-300">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-surface-200 dark:border-surface-700 focus:ring-primary/50"
                  } dark:bg-surface-700 focus:outline-none focus:ring-2 transition-all`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 text-surface-700 dark:text-surface-300">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.subject 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-surface-200 dark:border-surface-700 focus:ring-primary/50"
                  } dark:bg-surface-700 focus:outline-none focus:ring-2 transition-all`}
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-surface-700 dark:text-surface-300">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.message 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-surface-200 dark:border-surface-700 focus:ring-primary/50"
                  } dark:bg-surface-700 focus:outline-none focus:ring-2 transition-all`}
                  placeholder="Please write your message here..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;