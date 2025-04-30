import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, Image, Check, AlertCircle } from "lucide-react";

function MainFeature({ onClose, onAddContent, categories }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    thumbnailUrl: "",
    categoryId: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Validate URL format
    if (name === "url") {
      try {
        new URL(value);
        setIsUrlValid(true);
      } catch (e) {
        setIsUrlValid(value === "" || isValidUrl(value));
      }
    }
    
    // Validate image URL
    if (name === "thumbnailUrl") {
      if (value === "") {
        setIsImageValid(true);
      } else {
        setIsImageValid(isValidImageUrl(value));
      }
    }
  };
  
  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Image URL validation helper (basic check)
  const isValidImageUrl = (url) => {
    return isValidUrl(url) && 
      (url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null || 
       url.includes("unsplash.com") || 
       url.includes("pixabay.com") || 
       url.includes("burst.shopify.com"));
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category";
    }
    
    if (formData.thumbnailUrl && !isValidImageUrl(formData.thumbnailUrl)) {
      newErrors.thumbnailUrl = "Please enter a valid image URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // If no thumbnail provided, use a default based on category
      const finalData = { ...formData };
      if (!finalData.thumbnailUrl) {
        const categoryName = categories.find(c => c.id === finalData.categoryId)?.name.toLowerCase() || "design";
        finalData.thumbnailUrl = `https://source.unsplash.com/random/800x600/?${categoryName}`;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAddContent(finalData);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error("Error adding content:", error);
      setErrors({ submit: "Failed to add content. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <X className="w-5 h-5 text-surface-500" />
          </button>
          
          {/* Modal content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Add New Content</h2>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Save and organize content from around the web
              </p>
            </div>
            
            {isSuccess ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Content Added!</h3>
                <p className="text-surface-600 dark:text-surface-400">
                  Your content has been successfully added to your collection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* URL input */}
                <div className="mb-4">
                  <label htmlFor="url" className="label">
                    Content URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://example.com/article"
                      className={`input pl-10 ${errors.url ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    
                    {!isUrlValid && formData.url && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.url && (
                    <p className="mt-1 text-sm text-red-500">{errors.url}</p>
                  )}
                </div>
                
                {/* Title input */}
                <div className="mb-4">
                  <label htmlFor="title" className="label">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a descriptive title"
                    className={`input ${errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                
                {/* Description input */}
                <div className="mb-4">
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add a brief description (optional)"
                    rows="3"
                    className="input resize-none"
                  ></textarea>
                </div>
                
                {/* Thumbnail URL input */}
                <div className="mb-4">
                  <label htmlFor="thumbnailUrl" className="label">
                    Thumbnail URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="thumbnailUrl"
                      name="thumbnailUrl"
                      value={formData.thumbnailUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg (optional)"
                      className={`input pl-10 ${errors.thumbnailUrl ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    
                    {!isImageValid && formData.thumbnailUrl && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.thumbnailUrl ? (
                    <p className="mt-1 text-sm text-red-500">{errors.thumbnailUrl}</p>
                  ) : (
                    <p className="mt-1 text-xs text-surface-500">
                      Leave empty to generate a thumbnail automatically
                    </p>
                  )}
                </div>
                
                {/* Category selection */}
                <div className="mb-6">
                  <label className="label">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map(category => (
                      <button
                        type="button"
                        key={category.id}
                        onClick={() => setFormData(prev => ({ ...prev, categoryId: category.id }))}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          formData.categoryId === category.id
                            ? `border-${category.color.replace('bg-', '')} bg-${category.color.replace('bg-', '')}/10`
                            : "border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.categoryId && (
                    <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
                  )}
                </div>
                
                {/* Submit error */}
                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                    {errors.submit}
                  </div>
                )}
                
                {/* Form actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-outline flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 relative overflow-hidden"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Content"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default MainFeature;