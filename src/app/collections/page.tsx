import { Suspense } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { Copy, Heart, Download } from "lucide-react";
import { getCollections } from "@/lib/supabase";

// Loading skeleton
function CollectionsSkeleton() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-gray-800/50 rounded w-1/3 mb-12 animate-pulse mx-auto"></div>
        
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
          {[...Array(8)].map((_, index) => (
            <div key={index} className="mb-6 rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 animate-pulse">
              <div className="h-48 bg-gray-700/50"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
                <div className="mt-4 h-8 bg-gray-700/50 rounded"></div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

// Main component
async function CollectionsContent() {
  const { data: collections, error } = await getCollections();
  
  if (error) {
    console.error("Error fetching collections:", error);
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">Failed to load collections</p>
        <p className="text-gray-500 mt-2">Please check your Supabase connection</p>
      </div>
    );
  }

  if (!collections || collections.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No collections found</p>
        <p className="text-gray-500 mt-2">Check back later for new collections</p>
      </div>
    );
  }

  return (
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
              style={{ 
                backgroundImage: `url(${collection.cover_image || '/placeholders/collection-placeholder.jpg'})`,
                backgroundColor: '#1f2937'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
            
            <div className="absolute top-3 right-3 flex gap-2">
              <button className="p-2 rounded-full backdrop-blur-sm bg-gray-800/50 text-gray-300 hover:text-red-400 transition-all">
                <Heart size={16} />
              </button>
              <button className="p-2 rounded-full bg-gray-800/50 text-gray-300 hover:text-cyan-400 backdrop-blur-sm transition-all">
                <Download size={16} />
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-lg text-white">{collection.name}</h3>
              <p className="text-gray-300 text-sm">{collection.description}</p>
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
  );
}

export default function CollectionsPage() {
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
        
        <Suspense fallback={<CollectionsSkeleton />}>
          <CollectionsContent />
        </Suspense>
      </motion.div>
    </div>
  );
}