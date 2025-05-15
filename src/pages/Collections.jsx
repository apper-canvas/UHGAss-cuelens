import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, Plus, FolderPlus, Grid, List, Search, MoreHorizontal, Archive, FileSymlink } from "lucide-react";
import CollectionCard from "../components/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchTerm } from "../store/collectionSlice";
import { fetchCollections, createCollection } from "../services/collectionService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Filter types for collections
const FILTERS = [
  { id: "all", name: "All Collections" },
  { id: "public", name: "Public" },
  { id: "private", name: "Private" },
  { id: "recent", name: "Recently Updated" }
];

function Collections() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    title: "",
    description: "",
    isPublic: false
  });
  
  // Get collections state from Redux
  const { 
    filteredCollections, 
    selectedFilter, 
    searchTerm, 
    isLoading,
    error 
  } = useSelector(state => state.collections);
  
  // Fetch collections when component mounts
  useEffect(() => {
    fetchCollections(dispatch);
  }, [dispatch]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Create new collection
  const handleCreateCollection = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to create collections');
      navigate('/login');
      return;
    }

    if (!newCollection.title.trim()) {
      toast.error('Collection title is required');
      return;
    }

    const result = await createCollection({
      title: newCollection.title,
      description: newCollection.description,
      isPublic: newCollection.isPublic,
      thumbnails: []
    }, dispatch);

    if (result) {
      setShowCreateModal(false);
      setNewCollection({
        title: "",
        description: "",
        isPublic: false
      });
    }
  };

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
              {isAuthenticated ? (
                <span>Create New Collection</span>
              ) : (
                <span>Sign in to Create Collections</span>
              )}
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
              onChange={handleSearchChange}
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
                onClick={() => dispatch(setFilter(filter.id))}
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
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-surface-600 dark:text-surface-400">Loading collections...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg my-6">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <section className="mb-12">
        {filteredCollections.length > 0 ? (
        {!isLoading && filteredCollections.length > 0 ? (
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
        ) : (!isLoading && filteredCollections.length === 0) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 my-4 bg-white dark:bg-surface-800 rounded-2xl shadow-card"
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
                  dispatch(setSearchTerm(""));
                  dispatch(setFilter("all"));
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
        ) : null}
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
                  value={newCollection.title}
                  onChange={(e) => setNewCollection({...newCollection, title: e.target.value})}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="collection-description" className="label">Description</label>
                <textarea
                  id="collection-description"
                  placeholder="What's this collection about?"
                  rows="3"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                  className="input"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="label">Visibility</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="visibility" value="private" className="text-primary" 
                      checked={!newCollection.isPublic} onChange={() => setNewCollection({...newCollection, isPublic: false})} />
                    <span>Private</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="visibility" value="public" className="text-primary"
                      checked={newCollection.isPublic} onChange={() => setNewCollection({...newCollection, isPublic: true})} />
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
                  onClick={handleCreateCollection}
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