import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentItems } from "../services/contentItemService";

// Category definitions with images and colors
const categoryDefinitions = [
  {
    id: "Design",
    title: "Design",
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: "Technology",
    title: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "Travel",
    title: "Travel",
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: "Self Help",
    title: "Self Help",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "Finance",
    title: "Finance",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: "Tutorials",
    title: "Tutorials",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-purple-500 to-violet-600"
  },
  {
    id: "Videos",
    title: "Videos",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-red-500 to-rose-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Categories = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});
  
  // Get content items from Redux
  const { items } = useSelector(state => state.content);
  
  // Fetch content items when component mounts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchContentItems(dispatch);
      setIsLoading(false);
    };
    
    loadData();
  }, [dispatch]);
  
  // Calculate category counts when items change
  useEffect(() => {
    if (items.length > 0) {
      // Count items in each category
      const counts = {};
      items.forEach(item => {
        if (item.category) {
          counts[item.category] = (counts[item.category] || 0) + 1;
        }
      });
      setCategoryCounts(counts);
    }
  }, [items]);
  
  // Create categories data with counts
  const categoriesData = categoryDefinitions.map(category => ({
    ...category,
    count: categoryCounts[category.id] || 0
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Browse Categories
        </motion.h1>
        <motion.p 
          className="text-lg text-surface-600 dark:text-surface-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our vast collection of curated content across various categories
        </motion.p>
      </div>

      {/* Filters (optional and expandable) */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button className="btn btn-outline flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span>Filter Categories</span>
        </button>
      </motion.div>

      {/* Categories Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
      >
        {categoriesData.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
          />
        ))}
      </motion.div>
        )}
    </div>
  );
};

export default Categories;