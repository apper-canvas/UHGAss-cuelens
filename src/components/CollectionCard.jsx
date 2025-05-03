import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoreHorizontal, FolderOpen, Lock, Globe, Edit, Trash2, Copy, Share2 } from "lucide-react";
import { format } from "date-fns";

function CollectionCard({ collection, viewMode }) {
  const [showMenu, setShowMenu] = useState(false);

  // Format date for display
  const formattedDate = format(new Date(collection.updatedAt), "MMM d, yyyy");

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <div className="p-4 flex items-center gap-4">
          <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-surface-100 dark:bg-surface-700">
            {collection.thumbnails.length > 0 ? (
              <img 
                src={collection.thumbnails[0]} 
                alt={collection.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-surface-500" />
              </div>
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{collection.title}</h3>
              {collection.isPublic ? (
                <Globe className="w-3.5 h-3.5 text-surface-500" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-surface-500" />
              )}
            </div>
            <p className="text-surface-600 dark:text-surface-400 text-sm truncate">
              {collection.description}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-surface-500 hidden sm:block">
              <span>{collection.itemCount} items</span>
              <span className="mx-1.5">•</span>
              <span>Updated {formattedDate}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
              
              {/* Dropdown menu */}
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-1 z-10 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg py-1 border border-surface-200 dark:border-surface-700"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <Link to={`/collections/${collection.id}`} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <FolderOpen className="w-4 h-4" />
                    View Collection
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit Details
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <div className="h-px bg-surface-200 dark:bg-surface-700 my-1"></div>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete Collection
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Collection Thumbnails */}
      <div className="relative h-48 bg-surface-100 dark:bg-surface-700">
        {collection.thumbnails.length > 0 ? (
          <div className="relative w-full h-full">
            {/* Main Thumbnail */}
            <div className="absolute inset-0">
              <img 
                src={collection.thumbnails[0]} 
                alt={collection.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            {/* Additional Thumbnails */}
            <div className="absolute bottom-3 right-3 flex -space-x-2">
              {collection.thumbnails.slice(1, 3).map((thumbnail, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-md overflow-hidden border-2 border-white dark:border-surface-800 shadow-sm"
                >
                  <img 
                    src={thumbnail} 
                    alt={`Thumbnail ${index + 2}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {collection.thumbnails.length > 3 && (
                <div className="w-8 h-8 rounded-md bg-surface-800/80 backdrop-blur-sm border-2 border-white dark:border-surface-800 flex items-center justify-center text-xs font-medium text-white shadow-sm">
                  +{collection.thumbnails.length - 3}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderOpen className="w-16 h-16 text-surface-400" />
          </div>
        )}
        
        {/* Collection Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm text-white text-xs">
            {collection.isPublic ? (
              <>
                <Globe className="w-3 h-3" />
                <span>Public</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                <span>Private</span>
              </>
            )}
          </div>
        </div>
        
        {/* Action Menu */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {/* Dropdown menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-1 z-10 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg py-1 border border-surface-200 dark:border-surface-700"
                onMouseLeave={() => setShowMenu(false)}
              >
                <Link to={`/collections/${collection.id}`} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <FolderOpen className="w-4 h-4" />
                  View Collection
                </Link>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit Details
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <div className="h-px bg-surface-200 dark:bg-surface-700 my-1"></div>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete Collection
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Collection Information */}
      <div className="p-4">
        <Link to={`/collections/${collection.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-1">{collection.title}</h3>
        </Link>
        <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
          {collection.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-surface-500">
          <span>{collection.itemCount} items</span>
          <span>Updated {formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CollectionCard;