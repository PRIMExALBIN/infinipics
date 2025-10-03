"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { Copy, Heart, Download } from "lucide-react";

export default function CollectionsPage() {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  
  // Mock data for collections
  const collections = [
    { id: 1, name: "Cyberpunk Dreams", count: 24, image: "/collection1.jpg" },
    { id: 2, name: "Nature Reimagined", count: 18, image: "/collection2.jpg" },
    { id: 3, name: "Abstract Wonders", count: 32, image: "/collection3.jpg" },
    { id: 4, name: "Urban Landscapes", count: 15, image: "/collection4.jpg" },
    { id: 5, name: "Fantasy Realms", count: 27, image: "/collection5.jpg" },
    { id: 6, name: "Minimalist Moments", count: 19, image: "/collection6.jpg" },
  ];

  const toggleLike = (id: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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
          Curated Collections
        </h1>
        <p className="text-gray-400 text-center mb-12">Explore our handpicked collections of stunning AI-generated imagery</p>
        
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
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="relative">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${collection.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                
                <div className="absolute top-3 right-3 flex gap-2">
                  <button 
                    onClick={() => toggleLike(collection.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${likedImages.has(collection.id) ? 'bg-red-500/80 text-white' : 'bg-gray-800/50 text-gray-300 hover:text-red-400'}`}
                  >
                    <Heart size={16} fill={likedImages.has(collection.id) ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-800/50 text-gray-300 hover:text-cyan-400 backdrop-blur-sm transition-all">
                    <Download size={16} />
                  </button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-lg text-white">{collection.name}</h3>
                  <p className="text-gray-300 text-sm">{collection.count} images</p>
                </div>
              </div>
              
              <div className="p-4">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-gray-300">
                  <Copy size={16} />
                  <span>View Collection</span>
                </button>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
    </div>
  );
}