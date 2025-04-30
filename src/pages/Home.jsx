import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, Plus, Bookmark, ExternalLink, Heart, MessageSquare, Share2 } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Sample categories
const CATEGORIES = [
  { id: "all", name: "All", color: "bg-surface-500" },
  { id: "design", name: "Design", color: "bg-blue-500" },
  { id: "selfhelp", name: "Self Help", color: "bg-green-500" },
  { id: "finance", name: "Finance", color: "bg-yellow-500" },
  { id: "tutorials", name: "Tutorials", color: "bg-purple-500" },
  { id: "videos", name: "Videos", color: "bg-red-500" },
  { id: "travel", name: "Travel", color: "bg-teal-500" },
  { id: "technology", name: "Technology", color: "bg-indigo-500" },
];

// Sample content items
const INITIAL_CONTENT = [
  {
    id: 1,
    title: "10 Essential UI Design Principles",
    description: "Learn the fundamental principles that guide effective user interface design",
    url: "https://example.com/ui-design",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "design",
    likes: 124,
    comments: 18,
    saved: false
  },
  {
    id: 2,
    title: "Building Wealth: Investment Strategies for Beginners",
    description: "A comprehensive guide to starting your investment journey",
    url: "https://example.com/investment-guide",
    thumbnailUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "finance",
    likes: 89,
    comments: 32,
    saved: false
  },
  {
    id: 3,
    title: "Mindfulness Meditation Techniques",
    description: "Simple meditation practices to reduce stress and improve focus",
    url: "https://example.com/mindfulness",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "selfhelp",
    likes: 215,
    comments: 42,
    saved: false
  },
  {
    id: 4,
    title: "Advanced React Hooks Tutorial",
    description: "Master the use of React Hooks with practical examples",
    url: "https://example.com/react-hooks",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "tutorials",
    likes: 178,
    comments: 56,
    saved: false
  },
  {
    id: 5,
    title: "Hidden Gems of Southeast Asia",
    description: "Discover lesser-known travel destinations in Southeast Asia",
    url: "https://example.com/southeast-asia",
    thumbnailUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "travel",
    likes: 302,
    comments: 87,
    saved: false
  },
  {
    id: 6,
    title: "The Future of AI in Healthcare",
    description: "How artificial intelligence is transforming medical diagnosis and treatment",
    url: "https://example.com/ai-healthcare",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "technology",
    likes: 156,
    comments: 29,
    saved: false
  },
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  
  // Filter content based on selected category
  const filteredContent = selectedCategory === "all" 
    ? content 
    : content.filter(item => item.categoryId === selectedCategory);
  
  // Toggle save status for a content item
  const toggleSave = (id) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, saved: !item.saved } : item
    ));
  };
  
  // Toggle like for a content item
  const toggleLike = (id) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, likes: item.likes + (item.liked ? -1 : 1), liked: !item.liked } : item
    ));
  };
  
  // Add new content from MainFeature component
  const addContent = (newContent) => {
    setContent([
      {
        id: content.length + 1,
        ...newContent,
        likes: 0,
        comments: 0,
        saved: false,
        liked: false
      },
      ...content
    ]);
    setShowAddContentModal(false);
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
              onClick={() => setSelectedCategory(category.id)}
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
      
      {/* Content Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card group hover:shadow-lg dark:hover:shadow-neu-dark transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category badge */}
                {CATEGORIES.find(cat => cat.id === item.categoryId) && (
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium text-white ${
                    CATEGORIES.find(cat => cat.id === item.categoryId).color
                  }`}>
                    {CATEGORIES.find(cat => cat.id === item.categoryId).name}
                  </span>
                )}
                
                {/* Action buttons overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleLike(item.id)}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${item.liked ? "fill-red-500 text-red-500" : "text-white"}`} />
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
                      onClick={() => toggleSave(item.id)}
                      className={`p-2 rounded-full ${
                        item.saved 
                          ? "bg-primary text-white" 
                          : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      } transition-colors`}
                    >
                      <Bookmark className={`w-4 h-4 ${item.saved ? "fill-white" : ""}`} />
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
        
        {filteredContent.length === 0 && (
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