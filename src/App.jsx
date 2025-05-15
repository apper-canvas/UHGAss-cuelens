import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, Search, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./store/userSlice";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

// Import authentication pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Callback from "./pages/Callback";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.user);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setIsInitialized(true);
        // CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes(
            '/callback') || currentPath.includes('/error');
        if (user) {
            // User is authenticated
            if (redirectPath) {
                navigate(redirectPath);
            } else if (!isAuthPage) {
                if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
                    navigate(currentPath);
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
            // Store user information in Redux
            dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
            // User is not authenticated
            if (!isAuthPage) {
                navigate(
                    currentPath.includes('/signup')
                     ? `/signup?redirect=${currentPath}`
                     : currentPath.includes('/login')
                     ? `/login?redirect=${currentPath}`
                     : '/login');
            } else if (redirectPath) {
                if (
                    ![
                        'error',
                        'signup',
                        'login',
                        'callback'
                    ].some((path) => currentPath.includes(path)))
                    navigate(`/login?redirect=${redirectPath}`);
                else {
                    navigate(currentPath);
                }
            } else if (isAuthPage) {
                navigate(currentPath);
            } else {
                navigate('/login');
            }
            dispatch(clearUser());
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
  }, [dispatch, navigate]);
  
  // Authentication context
  const authContext = {
    isAuthenticated,
    user,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  // Don't render until initialization is complete
  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-surface-600 dark:text-surface-400">Initializing application...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                CueLens
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-surface-800 dark:text-surface-100 font-medium hover:text-primary dark:hover:text-primary transition-colors">
                Discover
              </a>
              <a href="/collections" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">
                Collections
              </a>
              <a href="/categories" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">
                Categories
              </a>
            </nav>
          </div>
          
          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex relative">
              <input 
                type="text" 
                placeholder="Search content..." 
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-surface-100 dark:bg-surface-800 border-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            </div>
            
            <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              <Bell className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-surface-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            
            <div className="hidden md:block h-8 w-px bg-surface-200 dark:bg-surface-700 mx-1"></div>
            
            {isAuthenticated ? (
              <button 
                onClick={authContext.logout}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                <User className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              <a href="/login" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                <User className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                <span className="text-sm font-medium">Login</span>
              </a>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-surface-800 dark:text-surface-200" />
              ) : (
                <Menu className="w-6 h-6 text-surface-800 dark:text-surface-200" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-surface-200 dark:border-surface-800"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search content..." 
                    className="pl-10 pr-4 py-2 w-full rounded-full bg-surface-100 dark:bg-surface-800 border-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                </div>
                
                <nav className="flex flex-col gap-2">
                  <a href="/" className="px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                    Discover
                  </a>
                  <a href="/collections" className="px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 transition-colors">
                    Collections
                  </a>
                  <a href="/categories" className="px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 transition-colors">
                    Categories
                  </a>
                  <a href="/account" className="px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 transition-colors">
                    Account
                  </a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
                  {isAuthenticated ? (
                    <button 
                      onClick={authContext.logout}
                      className="px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <a href="/login" className="px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 transition-colors">
                      Login
                    </a>
                  )}
      <main className="flex-1">
        <AuthContext.Provider value={authContext}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContext.Provider>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="text-sm font-semibold">CueLens</span>
            </div>
            
            <div className="flex gap-6 text-sm text-surface-600 dark:text-surface-400">
              <a href="/about" className="hover:text-primary dark:hover:text-primary transition-colors">About</a>
              <a href="/privacy" className="hover:text-primary dark:hover:text-primary transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-primary dark:hover:text-primary transition-colors">Terms</a>
              <a href="/contact" className="hover:text-primary dark:hover:text-primary transition-colors">Contact</a>
            </div>
            
            <div className="text-sm text-surface-500 dark:text-surface-500">
              &copy; {new Date().getFullYear()} CueLens. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

// Create auth context for global access
export const AuthContext = createContext(null);