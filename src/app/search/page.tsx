"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

interface ImageItem {
  id: number;
  url: string;
  prompt: string;
  category: string;
  mood: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<string>("");

  // Mock data for images
  const mockImages: ImageItem[] = [
    { id: 1, url: "/search1.jpg", prompt: "A futuristic cityscape at sunset", category: "Urban", mood: "Energetic" },
    { id: 2, url: "/search2.jpg", prompt: "Abstract geometric patterns with vibrant colors", category: "Abstract", mood: "Vibrant" },
    { id: 3, url: "/search3.jpg", prompt: "Serene mountain landscape with misty clouds", category: "Nature", mood: "Calm" },
    { id: 4, url: "/search4.jpg", prompt: "Cyberpunk street scene with neon signs", category: "Urban", mood: "Futuristic" },
    { id: 5, url: "/search5.jpg", prompt: "Minimalist composition with geometric shapes", category: "Abstract", mood: "Minimal" },
    { id: 6, url: "/search6.jpg", prompt: "Tropical beach with crystal clear water", category: "Nature", mood: "Relaxing" },
    { id: 7, url: "/search7.jpg", prompt: "Space station orbiting a distant planet", category: "Sci-Fi", mood: "Mysterious" },
    { id: 8, url: "/search8.jpg", prompt: "Vintage car in a rainy city street", category: "Urban", mood: "Nostalgic" },
  ];

  const categories = ["All", "Nature", "Urban", "Abstract", "Sci-Fi"];
  const moods = ["All", "Calm", "Energetic", "Vibrant", "Minimal", "Futuristic", "Relaxing", "Mysterious", "Nostalgic"];

  // Filter images based on search query and filters
  useEffect(() => {
    let results = mockImages;
    
    if (searchQuery) {
      results = results.filter(image => 
        image.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory && selectedCategory !== "All") {
      results = results.filter(image => 
        image.category === selectedCategory
      );
    }
    
    if (selectedMood && selectedMood !== "All") {
      results = results.filter(image => 
        image.mood === selectedMood
      );
    }
    
    setFilteredImages(results);
  }, [searchQuery, selectedCategory, selectedMood, mockImages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Add to recent searches (limit to 5)
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500">
          Search Gallery
        </h1>
        <p className="text-gray-400 text-center mb-8">Find the perfect AI-generated image</p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by prompt, style, or keywords..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-200"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Filter size={16} />
              Filters
            </button>
            
            {selectedCategory && selectedCategory !== "All" && (
              <div className="flex items-center gap-2 px-3 py-2 bg-cyan-900/30 border border-cyan-800 rounded-lg text-cyan-400">
                <span>{selectedCategory}</span>
                <button onClick={() => setSelectedCategory("")}>
                  <X size={16} />
                </button>
              </div>
            )}
            
            {selectedMood && selectedMood !== "All" && (
              <div className="flex items-center gap-2 px-3 py-2 bg-cyan-900/30 border border-cyan-800 rounded-lg text-cyan-400">
                <span>{selectedMood}</span>
                <button onClick={() => setSelectedMood("")}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-gray-300">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedCategory === category
                            ? "bg-cyan-600 text-white"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-gray-300">Mood</h3>
                  <div className="flex flex-wrap gap-2">
                    {moods.map(mood => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedMood === mood
                            ? "bg-cyan-600 text-white"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="font-medium mb-3 text-gray-300">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <span 
                    className="cursor-pointer hover:text-cyan-400"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </span>
                  <button 
                    onClick={() => removeRecentSearch(search)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Results Count */}
        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-gray-400">
              Found {filteredImages.length} result{filteredImages.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
        
        {/* Image Grid */}
        {filteredImages.length > 0 ? (
          <Masonry
            breakpointCols={{
              default: 4,
              1100: 3,
              700: 2,
              500: 1
            }}
            className="my-masonry-grid flex w-auto"
            columnClassName="my-masonry-grid_column"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="relative">
                  <div 
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm line-clamp-2">{image.prompt}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-700/50 rounded">{image.category}</span>
                      <span className="text-xs px-2 py-1 bg-gray-700/50 rounded">{image.mood}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No results found for &quot;{searchQuery}&quot;</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Search for AI-generated images</p>
            <p className="text-gray-500 mt-2">Enter a prompt, style, or keyword above</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}