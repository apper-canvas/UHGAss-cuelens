import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Plus, FolderPlus, Grid, List, Search, MoreHorizontal, Archive, FileSymlink } from "lucide-react";
import CollectionCard from "../components/CollectionCard";

// Sample collection data
const COLLECTIONS = [
  {
    id: 1,
    title: "UI Design Inspiration",
    description: "Modern interface designs and patterns for web and mobile apps",
    thumbnails: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    itemCount: 24,
    isPublic: true,
    updatedAt: "2023-11-15T14:48:00.000Z"
  },
  {
    id: 2,
    title: "Financial Knowledge",
    description: "Resources on personal finance, investing, and wealth-building strategies",
    thumbnails: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    itemCount: 18,
    isPublic: false,
    updatedAt: "2023-12-03T09:22:00.000Z"
  },
  {
    id: 3,
    title: "Mental Wellness",
    description: "Content focused on mindfulness, mental health, and personal growth",
    thumbnails: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509909756405-be0199881695?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545205528-2613fd5af32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    itemCount: 32,
    isPublic: true,
    updatedAt: "2024-01-18T16:35:00.000Z"
  },
  {
    id: 4,
    title: "Frontend Development",
    description: "Articles, tutorials and resources about React, Vue, CSS and more",
    thumbnails: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546146830-2cca9512c68e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    itemCount: 47,
    isPublic: true,
    updatedAt: "2024-02-05T11:14:00.000Z"
  },
  {
    id: 5,
    title: "Travel Bucket List",
    description: "Dream destinations and travel guides for future adventures",
    thumbnails: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    itemCount: 29,
    isPublic: false,
    updatedAt: "2024-03-01T08:42:00.000Z"
  },
  {
    id: 6,
    title: "AI & Technology Trends",
    description: "Latest developments in artificial intelligence and emerging tech",
    thumbnails: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    itemCount: 15,
    isPublic: true,
    updatedAt: "2024-03-15T14:30:00.000Z"
  }
];

// Filter types for collections
const FILTERS = [
  { id: "all", name: "All Collections" },
  { id: "public", name: "Public" },
  { id: "private", name: "Private" },
  { id: "recent", name: "Recently Updated" }
];

function Collections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter collections based on selected filter and search term
  const filteredCollections = COLLECTIONS.filter(collection => {
    // Filter by visibility
    if (selectedFilter === "public" && !collection.isPublic) return false;
    if (selectedFilter === "private" && collection.isPublic) return false;
    if (selectedFilter === "recent") {
      // Consider collections updated in the last 30 days as recent
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      if (new Date(collection.updatedAt) < thirtyDaysAgo) return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return collection.title.toLowerCase().includes(searchLower) || 
             collection.description.toLowerCase().includes(searchLower);
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8 md:p-10">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Your Collections
            </h1>
            <p className="text-surface-600 dark:text-surface-400 text-lg mb-6">
              Organize your saved content into collections for easy access and sharing.
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <FolderPlus className="w-5 h-5" />
              Create New Collection
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex p-1 bg-surface-100 dark:bg-surface-800 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-surface-700 text-primary shadow-sm"
                    : "text-surface-600 dark:text-surface-400 hover:bg-white dark:hover:bg-surface-700"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-surface-700 text-primary shadow-sm"
                    : "text-surface-600 dark:text-surface-400 hover:bg-white dark:hover:bg-surface-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button className="btn btn-outline flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter.id
                  ? "bg-primary text-white"
                  : "bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-800 dark:text-surface-200"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </section>

      {/* Collections Grid/List */}
      <section className="mb-12">
        {filteredCollections.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredCollections.map(collection => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                viewMode={viewMode} 
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-surface-800 rounded-2xl shadow-card"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
              <Archive className="w-8 h-8 text-surface-500 dark:text-surface-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No collections found</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? `No collections matching "${searchTerm}" were found.` 
                : "You don't have any collections that match the selected filter."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
                className="btn btn-outline flex items-center justify-center gap-2"
              >
                <FileSymlink className="w-4 h-4" />
                Clear Filters
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Collection
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Create Collection Modal would go here */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-md"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Create New Collection</h2>
              <div className="mb-4">
                <label htmlFor="collection-name" className="label">Collection Name</label>
                <input
                  type="text"
                  id="collection-name"
                  placeholder="My Awesome Collection"
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="collection-description" className="label">Description</label>
                <textarea
                  id="collection-description"
                  placeholder="What's this collection about?"
                  rows="3"
                  className="input"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="label">Visibility</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="visibility" value="private" className="text-primary" defaultChecked />
                    <span>Private</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="visibility" value="public" className="text-primary" />
                    <span>Public</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Create Collection
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Collections;