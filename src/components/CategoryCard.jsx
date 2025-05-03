import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const CategoryCard = ({ category }) => {
  const { title, count, image, color } = category;

  return (
    <motion.div
      className="card group cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
      variants={itemVariants}
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/80 text-sm mt-1">{count.toLocaleString()} items</p>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white dark:bg-surface-800">
        <div className="flex justify-between items-center">
          <p className="text-surface-600 dark:text-surface-400 text-sm">
            Last updated: 2 days ago
          </p>
          <div className="h-8 w-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <svg 
              className="w-4 h-4 text-surface-500 dark:text-surface-400 group-hover:text-primary transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;