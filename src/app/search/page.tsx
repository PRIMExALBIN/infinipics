"use client";

import { useState, useEffect } from "react";

interface ImageItem {
  id: string;
  prompt: string;
  category: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setImages([
        { id: "1", prompt: "A futuristic cityscape at sunset", category: "Urban" },
        { id: "2", prompt: "Abstract geometric patterns", category: "Abstract" },
        { id: "3", prompt: "Serene mountain landscape", category: "Nature" },
        { id: "4", prompt: "Cyberpunk street scene", category: "Urban" },
        { id: "5", prompt: "Minimalist composition", category: "Abstract" },
        { id: "6", prompt: "Tropical beach", category: "Nature" },
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger an API call
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          Search Gallery
        </h1>
        <p className="text-gray-400 text-center mb-8">Find the perfect AI-generated image</p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by prompt, style, or keywords..."
              className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="h-32 bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div 
                key={image.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
              >
                <div className="h-32 bg-gray-700 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-400">Image Preview</span>
                </div>
                <p className="text-white text-sm">{image.prompt}</p>
                <p className="text-gray-400 text-xs mt-1">{image.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
