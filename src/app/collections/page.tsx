"use client";

import { useState, useEffect } from "react";

interface Collection {
  id: string;
  name: string;
  description: string;
  cover_image: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setCollections([
        { id: "1", name: "Cyberpunk Dreams", description: "Futuristic urban landscapes", cover_image: "" },
        { id: "2", name: "Nature Reimagined", description: "Surreal natural scenes", cover_image: "" },
        { id: "3", name: "Abstract Wonders", description: "Geometric compositions", cover_image: "" },
        { id: "4", name: "Urban Landscapes", description: "Cityscapes and architecture", cover_image: "" },
        { id: "5", name: "Fantasy Realms", description: "Otherworldly environments", cover_image: "" },
        { id: "6", name: "Minimalist Moments", description: "Simple, clean compositions", cover_image: "" },
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          Curated Collections
        </h1>
        <p className="text-gray-400 text-center mb-12">Explore our handpicked collections</p>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div 
                key={collection.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-cyan-400">{collection.name}</h3>
                <p className="mt-2 text-gray-300">{collection.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
