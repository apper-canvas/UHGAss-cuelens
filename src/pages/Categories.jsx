import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import CategoryCard from "../components/CategoryCard";

const categoriesData = [
  {
    id: 1,
    title: "Photography",
    count: 1248,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    title: "Design",
    count: 873,
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 3,
    title: "Illustration",
    count: 675,
    image: "https://images.unsplash.com/photo-1629196914220-f9f9e95338ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 4,
    title: "Technology",
    count: 1542,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 5,
    title: "Architecture",
    count: 435,
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-gray-500 to-slate-700"
  },
  {
    id: 6,
    title: "Nature",
    count: 928,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 7,
    title: "Food",
    count: 762,
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: 8,
    title: "Travel",
    count: 1053,
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: 9,
    title: "Fashion",
    count: 583,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-fuchsia-400 to-pink-500"
  },
  {
    id: 10,
    title: "Art",
    count: 835,
    image: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-red-500 to-rose-500"
  },
  {
    id: 11,
    title: "Music",
    count: 624,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-purple-500 to-violet-600"
  },
  {
    id: 12,
    title: "Sports",
    count: 486,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    color: "from-blue-600 to-cyan-400"
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
        {categoriesData.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;