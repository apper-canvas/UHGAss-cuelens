import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, Plus, Bookmark, ExternalLink, Heart, MessageSquare, Share2, Loader } from "lucide-react";
import MainFeature from "../components/MainFeature";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../store/contentSlice";
import { fetchContentItems, createContentItem, toggleSaveContent, toggleLikeContent } from "../services/contentItemService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Sample categories
const CATEGORIES = [
  { id: "all", name: "All", color: "bg-surface-500" },
  { id: "Design", name: "Design", color: "bg-blue-500" },
  { id: "Self Help", name: "Self Help", color: "bg-green-500" },
  { id: "Finance", name: "Finance", color: "bg-yellow-500" },
  { id: "Tutorials", name: "Tutorials", color: "bg-purple-500" },
  { id: "Videos", name: "Videos", color: "bg-red-500" },
  { id: "Travel", name: "Travel", color: "bg-teal-500" },
  { id: "Technology", name: "Technology", color: "bg-indigo-500" },
];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  
  // Get content state from Redux
  const { 
    filteredItems, 
    selectedCategory, 
    isLoading, 
    error 
  } = useSelector(state => state.content);

  // Fetch content items when component mounts
  useEffect(() => {
    fetchContentItems(dispatch);
  }, [dispatch]);
  
  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
  };
  
  // Toggle save status for a content item
  const handleToggleSave = (item) => {
    if (!isAuthenticated) {
      toast.info('Please log in to save content');
      navigate('/login');
      return;
    }
    toggleSaveContent(item.Id, item.saved, dispatch);
  };

  // Toggle like for a content item
  const handleToggleLike = (item) => {
    if (!isAuthenticated) {
      toast.info('Please log in to like content');
      navigate('/login');
      return;
    }
    toggleLikeContent(item.Id, item.liked, item.likes, dispatch);
  };
  
  // Add new content from MainFeature component
  const addContent = (newContent) => {
    if (!isAuthenticated) {
      toast.info('Please log in to add content');
      navigate('/login');
      return;
    }
    
    createContentItem(newContent, dispatch)
      .then(result => {
        if (result) {
          setShowAddContentModal(false);
        }
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover and curate inspiring content
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Save, organize, and share your favorite content from across the web in one beautiful visual collection.
            </p>
            <button 
              onClick={() => setShowAddContentModal(true)}
              className="btn bg-white text-primary hover:bg-white/90 flex items-center gap-2"
            >
                <Plus className="w-5 h-5" />
              Add New Content
            </button>
          </div>
          
             
             

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
          <div className="absolute top-12 right-12 w-16 h-16 rounded-full bg-white/10"></div>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Browse Content</h2>
          <button className="btn btn-outline flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
                onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                  ? `${category.color} text-white`
                  : "bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-800 dark:text-surface-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <Loader className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-surface-600 dark:text-surface-400">Loading content...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg my-6">
          <h3 className="font-semibold mb-1">Error loading content</h3>
          <p>{error}</p>
          <button 
            onClick={() => fetchContentItems(dispatch)}
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Content Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && filteredItems.map(item => (
            <motion.div
              key={item.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card group hover:shadow-lg dark:hover:shadow-neu-dark transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title || "Content image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category badge */}
                {CATEGORIES.find(cat => cat.id === item.category) && (
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium text-white ${
                    CATEGORIES.find(cat => cat.id === item.category).color
                  }`}>
                    {CATEGORIES.find(cat => cat.id === item.category).name}
                  </span>
                )}
                
                {/* Action buttons overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleToggleLike(item)}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${item.is_liked ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => handleToggleSave(item)}
                      className={`p-2 rounded-full ${
                        item.is_saved 
                          ? "bg-primary text-white" 
                          : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      } transition-colors`}
                    >
                      <Bookmark className={`w-4 h-4 ${item.is_saved ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content details */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-surface-500 dark:text-surface-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {item.comments}
                    </span>
                  </div>
                  
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary flex items-center gap-1 hover:underline"
                  >
                    Visit
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-600 dark:text-surface-400">No content found in this category.</p>
            <button 
              onClick={() => setShowAddContentModal(true)}
              className="mt-4 btn btn-primary"
            >
              Add Content
            </button>
          </div>
        )}
      </section>
      
      {/* Add Content Modal */}
      {showAddContentModal && (
        <MainFeature 
          onClose={() => setShowAddContentModal(false)}
          onAddContent={addContent}
          categories={CATEGORIES.filter(cat => cat.id !== "all")}
        />
      )}
    </div>
  );
}

export default Home;