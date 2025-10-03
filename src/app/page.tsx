import { Suspense } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { getCollections } from "@/lib/supabase";

// Loading skeleton for collections
function CollectionsSkeleton() {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
      {[1, 2, 3].map((item) => (
        <div 
          key={item}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-pulse"
        >
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// Collections component that fetches data
async function Collections() {
  const { data: collections, error } = await getCollections();
  
  if (error) {
    console.error("Error fetching collections:", error);
    return (
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {[1, 2, 3].map((item) => (
          <div 
            key={item}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-cyan-400">Featured Collection {item}</h3>
            <p className="mt-2 text-gray-300">Explore our curated collection of stunning AI-generated images</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
      {collections && collections.length > 0 ? (
        collections.slice(0, 3).map((collection) => (
          <div 
            key={collection.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-cyan-400">{collection.name}</h3>
            <p className="mt-2 text-gray-300">{collection.description || "Explore our curated collection of stunning AI-generated images"}</p>
          </div>
        ))
      ) : (
        [1, 2, 3].map((item) => (
          <div 
            key={item}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-cyan-400">Featured Collection {item}</h3>
            <p className="mt-2 text-gray-300">Explore our curated collection of stunning AI-generated images</p>
          </div>
        ))
      )}
    </div>
  );
}

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10" />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size="lg" />
        </motion.div>
        
        <motion.h1 
          className="mt-6 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Where Every Pixel Tells a Story
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {getGreeting()}, discover endless high-quality AI-generated aesthetic photos
        </motion.p>
        
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 hover:from-violet-700 hover:via-blue-600 hover:to-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300">
            Generate Random
          </Button>
        </motion.div>
        
        <Suspense fallback={<CollectionsSkeleton />}>
          <Collections />
        </Suspense>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}