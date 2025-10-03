"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

interface Collection {
  id: number;
  name: string;
  description: string;
}

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching collections (in a real app, this would be an API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollections([
        { id: 1, name: "Featured Collection 1", description: "Explore our curated collection of stunning AI-generated images" },
        { id: 2, name: "Featured Collection 2", description: "Explore our curated collection of stunning AI-generated images" },
        { id: 3, name: "Featured Collection 3", description: "Explore our curated collection of stunning AI-generated images" }
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8">
          <Logo size="lg" />
        </div>
        
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">
          Where Every Pixel Tells a Story
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          {getGreeting()}, discover endless high-quality AI-generated aesthetic photos
        </p>
        
        <div className="mt-10">
          <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 hover:from-violet-700 hover:via-blue-600 hover:to-cyan-600 text-white">
            Generate Random
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {loading ? (
            // Loading skeletons
            [1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))
          ) : (
            collections.map((collection) => (
              <div 
                key={collection.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-cyan-400">{collection.name}</h3>
                <p className="mt-2 text-gray-300">{collection.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}