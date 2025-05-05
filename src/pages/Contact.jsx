import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, SendHorizonal } from "lucide-react";
import { toast } from "react-toastify";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Your message has been sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setIsSubmitting(false);
      }, 1500);
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  return (
    <div className="bg-surface-50 dark:bg-surface-950 py-12">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="max-w-4xl mx-auto" variants={childVariants}>
          <div className="text-center mb-12">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              variants={childVariants}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
              variants={childVariants}
            >
              Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact information to reach out.
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Information */}
            <motion.div
              className="lg:w-1/3 bg-white dark:bg-surface-900 rounded-xl shadow-sm p-6 h-fit"
              variants={childVariants}
            >
              <h2 className="text-xl font-semibold mb-6 text-surface-800 dark:text-surface-200">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-surface-800 dark:text-surface-200">Our Office</h3>
                    <p className="text-surface-600 dark:text-surface-400 mt-1">
                      123 Innovation Drive, Suite 400<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-surface-800 dark:text-surface-200">Phone</h3>
                    <p className="text-surface-600 dark:text-surface-400 mt-1">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-surface-600 dark:text-surface-400">
                      Monday - Friday, 9AM - 6PM PT
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-surface-800 dark:text-surface-200">Email</h3>
                    <p className="text-surface-600 dark:text-surface-400 mt-1">
                      info@cuelens.com
                    </p>
                    <p className="text-surface-600 dark:text-surface-400">
                      support@cuelens.com
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:w-2/3 bg-white dark:bg-surface-900 rounded-xl shadow-sm p-6"
              variants={childVariants}
            >
              <h2 className="text-xl font-semibold mb-6 text-surface-800 dark:text-surface-200">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-surface-50 dark:bg-surface-800 border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-surface-50 dark:bg-surface-800 border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                    placeholder="Your email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-surface-50 dark:bg-surface-800 border ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                    placeholder="Subject of your message"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-2 rounded-lg bg-surface-50 dark:bg-surface-800 border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors`}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <SendHorizonal className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;